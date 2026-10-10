const API_DEVOLUCIONES =
    "https://localhost:7244/api/Devoluciones";


document.addEventListener(
    "DOMContentLoaded",
    function () {

        verificarAdministrador();

    }
);


// ======================================================
// 1. VERIFICAR ROL
// ======================================================

function verificarAdministrador() {

    const rol =
        localStorage.getItem("rol");


    if (rol !== "Administrador") {

        alert(
            "Esta página es exclusiva para administradores."
        );

        window.location.href =
            "index.html";

        return;

    }


    cargarDevoluciones();

}



// ======================================================
// 2. CONSULTAR DEVOLUCIONES
// ======================================================

async function cargarDevoluciones() {

    const tabla =
        document.getElementById(
            "tablaDevoluciones"
        );


    tabla.innerHTML = `

        <tr>

            <td colspan="9">

                Consultando devoluciones...

            </td>

        </tr>

    `;


    try {

        const respuesta =
            await fetch(
                API_DEVOLUCIONES
            );


        if (!respuesta.ok) {

            throw new Error(
                "No fue posible consultar las devoluciones."
            );

        }


        const devoluciones =
            await respuesta.json();


        mostrarDevoluciones(
            devoluciones
        );


    } catch (error) {

        console.error(error);


        tabla.innerHTML = `

            <tr>

                <td colspan="9">

                    No fue posible cargar las devoluciones.

                </td>

            </tr>

        `;

    }

}



// ======================================================
// 3. MOSTRAR DEVOLUCIONES EN LA TABLA
// ======================================================

function mostrarDevoluciones(devoluciones) {

    const tabla =
        document.getElementById(
            "tablaDevoluciones"
        );


    tabla.innerHTML = "";


    if (
        !Array.isArray(devoluciones) ||
        devoluciones.length === 0
    ) {

        tabla.innerHTML = `

            <tr>

                <td colspan="9">

                    No hay solicitudes de devolución.

                </td>

            </tr>

        `;

        return;

    }


    devoluciones.forEach(
        function (devolucion) {

            const idDevolucion =
                devolucion.idDevolucion ??
                devolucion.IdDevolucion;


            const idPedido =
                devolucion.idPedido ??
                devolucion.IdPedido ??
                "—";


            const producto =
                devolucion.producto ??
                devolucion.nombreProducto ??
                devolucion.NombreProducto ??
                "—";


            const cantidad =
                devolucion.cantidad ??
                devolucion.Cantidad ??
                "—";


            const motivo =
                devolucion.motivo ??
                devolucion.Motivo ??
                "—";


            const comentario =
                devolucion.comentario ??
                devolucion.Comentario ??
                "Sin comentario";


            const estado =
                devolucion.estado ??
                devolucion.Estado ??
                "—";


            const fechaOriginal =
                devolucion.fechaSolicitud ??
                devolucion.FechaSolicitud;


            const fecha =
                fechaOriginal
                    ? new Date(
                        fechaOriginal
                    ).toLocaleString()
                    : "—";


            let acciones = "Gestionada";


            if (
                estado
                    .trim()
                    .toLowerCase() ===
                "pendiente"
            ) {

                acciones = `

                    <button
                        type="button"
                        onclick="
                            cambiarEstado(
                                ${idDevolucion},
                                'Aprobada'
                            )
                        "
                    >

                        Aprobar

                    </button>


                    <button
                        type="button"
                        onclick="
                            cambiarEstado(
                                ${idDevolucion},
                                'Rechazada'
                            )
                        "
                    >

                        Rechazar

                    </button>

                `;

            }


            tabla.innerHTML += `

                <tr>

                    <td>
                        ${idDevolucion}
                    </td>

                    <td>
                        ${idPedido}
                    </td>

                    <td>
                        ${producto}
                    </td>

                    <td>
                        ${cantidad}
                    </td>

                    <td>
                        ${motivo}
                    </td>

                    <td>
                        ${comentario}
                    </td>

                    <td>
                        ${estado}
                    </td>

                    <td>
                        ${fecha}
                    </td>

                    <td>
                        ${acciones}
                    </td>

                </tr>

            `;

        }
    );

}



// ======================================================
// 4. APROBAR O RECHAZAR
// ======================================================

async function cambiarEstado(
    idDevolucion,
    nuevoEstado
) {

    const confirmar =
        confirm(
            `¿Deseas marcar esta devolución como ${nuevoEstado}?`
        );


    if (!confirmar) {

        return;

    }


    const observacion =
        prompt(
            "Escribe una observación para el cliente:"
        );


    if (observacion === null) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                `${API_DEVOLUCIONES}/${idDevolucion}/estado`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify(
                        {

                            estado:
                                nuevoEstado,

                            observacionAdministrador:
                                observacion.trim()

                        }
                    )

                }
            );


        if (!respuesta.ok) {

            const mensaje =
                await obtenerMensajeError(
                    respuesta
                );

            throw new Error(mensaje);

        }


        alert(
            `La devolución fue marcada como ${nuevoEstado}.`
        );


        cargarDevoluciones();


    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "No fue posible actualizar la devolución."
        );

    }

}



// ======================================================
// 5. LEER MENSAJE DE ERROR DEL BACKEND
// ======================================================

async function obtenerMensajeError(respuesta) {

    try {

        const datos =
            await respuesta.json();


        return (
            datos.mensaje ||
            datos.message ||
            datos.title ||
            "Ocurrió un error al actualizar."
        );


    } catch {

        return (
            await respuesta.text()
        ) || "Ocurrió un error al actualizar.";

    }

}