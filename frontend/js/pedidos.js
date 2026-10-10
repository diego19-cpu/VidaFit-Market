document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formPedido");

    const botonLimpiar =
        document.getElementById("btnLimpiar");


    // Primero cargar usuarios
    // y después cargar pedidos

    cargarUsuarios()
        .then(() => {

            cargarPedidos();

        });


    // ACTUALIZAR ESTADO

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const idPedido =
                document.getElementById(
                    "idPedido"
                ).value;


            if (idPedido === "") {

                alert(
                    "Primero seleccione un pedido"
                );

                return;

            }


            actualizarPedido();

        }
    );


    // BOTÓN LIMPIAR

    botonLimpiar.addEventListener(
        "click",
        function () {

            limpiarFormulario();

        }
    );

});


// ======================================================
// RUTAS REALES SEGÚN SWAGGER
// ======================================================

const API_URL =
    "https://localhost:7244/api/Pedidos";


const API_USUARIOS =
    "https://localhost:7244/api/Usuarios";


// Guardar nombres de usuarios

let usuariosPorId = {};


// ======================================================
// 1. CARGAR USUARIOS
// ======================================================

function cargarUsuarios() {

    return fetch(API_USUARIOS)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar usuarios"
                );

            }

            return response.json();

        })

        .then(usuarios => {

            usuariosPorId = {};


            usuarios.forEach(usuario => {

                usuariosPorId[
                    usuario.idUsuario
                ] =

                    `${usuario.nombre} ${usuario.apellido}`;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar usuarios:",
                error
            );

        });

}


// ======================================================
// 2. LISTAR PEDIDOS
// ======================================================

function cargarPedidos() {

    const tabla =
        document.getElementById(
            "tablaPedidos"
        );


    tabla.innerHTML = `

        <tr>

            <td colspan="6">

                Consultando pedidos...

            </td>

        </tr>

    `;


    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar pedidos"
                );

            }

            return response.json();

        })

        .then(pedidos => {

            tabla.innerHTML = "";


            if (pedidos.length === 0) {

                tabla.innerHTML = `

                    <tr>

                        <td colspan="6">

                            No hay pedidos registrados.

                        </td>

                    </tr>

                `;

                return;

            }


            pedidos.forEach(pedido => {


                const usuario =

                    usuariosPorId[
                        pedido.idUsuario
                    ]

                    ||

                    `Usuario ID ${pedido.idUsuario}`;


                tabla.innerHTML += `

                    <tr>


                        <td>

                            ${pedido.idPedido}

                        </td>


                        <td>

                            ${usuario}

                        </td>


                        <td>

                            ${formatearPrecio(
                                pedido.total
                            )}

                        </td>


                        <td>

                            ${pedido.estado}

                        </td>


                        <td>

                            ${formatearFecha(
                                pedido.fecha
                            )}

                        </td>


                        <td>


                            <button
                                type="button"
                                onclick="buscarPedido(${pedido.idPedido})">

                                Cambiar estado

                            </button>


                        </td>


                    </tr>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar pedidos:",
                error
            );


            tabla.innerHTML = `

                <tr>

                    <td colspan="6">

                        No se pudieron cargar los pedidos.

                    </td>

                </tr>

            `;

        });

}


// ======================================================
// 3. BUSCAR PEDIDO POR ID
// ======================================================

function buscarPedido(id) {

    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "No se pudo buscar el pedido"
                );

            }

            return response.json();

        })

        .then(pedido => {


            // ID PEDIDO

            document.getElementById(
                "idPedido"
            ).value =
                pedido.idPedido;


            // ID USUARIO

            document.getElementById(
                "idUsuario"
            ).value =
                pedido.idUsuario;


            // NOMBRE DEL USUARIO

            const nombreUsuario =

                usuariosPorId[
                    pedido.idUsuario
                ]

                ||

                `Usuario ID ${pedido.idUsuario}`;


            document.getElementById(
                "usuarioPedido"
            ).value =
                nombreUsuario;


            // TOTAL

            document.getElementById(
                "total"
            ).value =
                pedido.total;


            // FECHA

            document.getElementById(
                "fecha"
            ).value =
                convertirFechaParaInput(
                    pedido.fecha
                );


            // ESTADO

            document.getElementById(
                "estado"
            ).value =
                pedido.estado;


            // CAMBIAR TÍTULO

            document.getElementById(
                "tituloFormulario"
            ).textContent =

                `Actualizar pedido #${pedido.idPedido}`;


            // CAMBIAR BOTÓN

            document.getElementById(
                "btnGuardar"
            ).textContent =
                "Actualizar estado";


            // SUBIR AL FORMULARIO

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        })

        .catch(error => {

            console.error(
                "Error al buscar pedido:",
                error
            );


            alert(
                "No se pudo cargar el pedido"
            );

        });

}


// ======================================================
// 4. ACTUALIZAR PEDIDO
// ======================================================

function actualizarPedido() {

    const id =
        document.getElementById(
            "idPedido"
        ).value;


    const pedido =
        obtenerDatosFormulario();


    pedido.idPedido =
        parseInt(id);


    console.log(
        "Pedido que se actualizará:",
        pedido
    );


    fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(pedido)

    })

    .then(async response => {

        const texto =
            await response.text();


        if (!response.ok) {

            console.error(
                "Error del backend:",
                response.status,
                texto
            );


            throw new Error(
                texto ||
                "No se pudo actualizar el pedido"
            );

        }


        alert(
            "Estado del pedido actualizado correctamente"
        );


        limpiarFormulario();


        cargarPedidos();

    })

    .catch(error => {

        console.error(
            "Error al actualizar pedido:",
            error
        );


        alert(

            "Error al actualizar el pedido.\n\n" +

            error.message

        );

    });

}


// ======================================================
// TOMAR DATOS DEL FORMULARIO
// ======================================================

function obtenerDatosFormulario() {

    const idPedido =
        document.getElementById(
            "idPedido"
        ).value;


    const idUsuario =
        document.getElementById(
            "idUsuario"
        ).value;


    const total =
        document.getElementById(
            "total"
        ).value;


    const estado =
        document.getElementById(
            "estado"
        ).value;


    const fecha =
        document.getElementById(
            "fecha"
        ).value;


    return {

        idPedido:

            idPedido === ""

                ? 0

                : parseInt(idPedido),


        idUsuario:

            parseInt(idUsuario),


        total:

            parseFloat(total),


        estado:

            estado,


        fecha:

            fecha

    };

}


// ======================================================
// LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    document.getElementById(
        "idPedido"
    ).value = "";


    document.getElementById(
        "idUsuario"
    ).value = "";


    document.getElementById(
        "formPedido"
    ).reset();


    document.getElementById(
        "tituloFormulario"
    ).textContent =

        "Seleccione un pedido para actualizar";


    document.getElementById(
        "btnGuardar"
    ).textContent =

        "Actualizar estado";

}


// ======================================================
// FORMATEAR PRECIO
// ======================================================

function formatearPrecio(precio) {

    return new Intl.NumberFormat(
        "es-CO",
        {

            style: "currency",

            currency: "COP",

            minimumFractionDigits: 0

        }

    ).format(

        Number(precio || 0)

    );

}


// ======================================================
// CONVERTIR FECHA PARA INPUT
// ======================================================

function convertirFechaParaInput(fecha) {

    if (!fecha) {

        return "";

    }


    return fecha
        .toString()
        .split("T")[0];

}


// ======================================================
// MOSTRAR FECHA EN LA TABLA
// ======================================================

function formatearFecha(fecha) {

    if (!fecha) {

        return "";

    }


    const fechaLimpia =
        convertirFechaParaInput(fecha);


    const partes =
        fechaLimpia.split("-");


    if (partes.length !== 3) {

        return fechaLimpia;

    }


    return (

        partes[2]

        +

        "/"

        +

        partes[1]

        +

        "/"

        +

        partes[0]

    );

}