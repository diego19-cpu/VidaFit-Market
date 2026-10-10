document.addEventListener("DOMContentLoaded", function () {

    cargarMisPedidos();

});


// ======================================================
// RUTAS API
// ======================================================

const API_PEDIDOS =
    "https://localhost:7244/api/Pedidos";


const API_DETALLES =
    "https://localhost:7244/api/DetallePedido";


const API_PRODUCTOS =
    "https://localhost:7244/api/Productos";
const API_DEVOLUCIONES =
    "https://localhost:7244/api/Devoluciones";

// ======================================================
// VARIABLES
// ======================================================

let pedidos = [];

let detalles = [];

let productos = [];



// ======================================================
// CARGAR PEDIDOS DEL USUARIO LOGUEADO
// ======================================================

function cargarMisPedidos() {


    const idUsuario =
        localStorage.getItem("idUsuario");



    if (!idUsuario) {

        alert(
            "Debe iniciar sesión para ver sus pedidos."
        );

        window.location.href =
            "login.html";

        return;

    }



    fetch(
        `${API_PEDIDOS}/usuario/${idUsuario}`
    )

    .then(function(response){


        if (!response.ok) {

            throw new Error(
                "No se pudieron cargar los pedidos"
            );

        }


        return response.json();


    })


    .then(function(data){


        pedidos = data;


        mostrarPedidos(
            pedidos
        );


        cargarDetalles();

        cargarProductos();


    })


    .catch(function(error){


        console.error(
            error
        );


        document.getElementById(
            "tablaMisPedidos"
        ).innerHTML = `

        <tr>

            <td colspan="5">

                No tiene pedidos registrados.

            </td>

        </tr>

        `;


    });


}



// ======================================================
// MOSTRAR PEDIDOS
// ======================================================

function mostrarPedidos(listaPedidos){


    const tabla =
        document.getElementById(
            "tablaMisPedidos"
        );


    tabla.innerHTML = "";



    if(listaPedidos.length === 0){


        tabla.innerHTML = `

        <tr>

            <td colspan="5">

                No tiene pedidos registrados.

            </td>

        </tr>

        `;


        return;

    }



    listaPedidos.forEach(function(pedido){


        tabla.innerHTML += `

        <tr>


            <td>

                Pedido #${pedido.idPedido}

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
                onclick="verDetalle(${pedido.idPedido})">

                    Ver detalle

                </button>
${

    pedido.estado
        ?.trim()
        .toLowerCase() === "entregado"

        ? `

            <button
                type="button"
                onclick="abrirDevolucion(${pedido.idPedido})">

                Solicitar devolución

            </button>

        `

        : ""

}

            </td>


        </tr>

        `;


    });


}



// ======================================================
// CARGAR DETALLES
// ======================================================

function cargarDetalles(){


    fetch(API_DETALLES)

    .then(response => response.json())

    .then(data => {

        detalles = data;

    })

    .catch(error => {

        console.error(error);

    });


}



// ======================================================
// CARGAR PRODUCTOS
// ======================================================

function cargarProductos(){


    fetch(API_PRODUCTOS)

    .then(response => response.json())

    .then(data => {

        productos = data;

    })

    .catch(error => {

        console.error(error);

    });


}



// ======================================================
// VER DETALLE
// ======================================================

function verDetalle(idPedido){


    const lista = detalles.filter(function(detalle){


        return Number(detalle.idPedido)
        ===
        Number(idPedido);


    });



    const tabla =
        document.getElementById(
            "tablaDetalle"
        );



    tabla.innerHTML = "";



    let total = 0;



    lista.forEach(function(detalle){



        const producto =
            productos.find(function(producto){


                return Number(producto.idProducto)
                ===
                Number(detalle.idProducto);


            });



        total += Number(detalle.subtotal);



        tabla.innerHTML += `

        <tr>


            <td>

                ${
                    producto
                    ?
                    producto.nombre
                    :
                    "Producto"
                }

            </td>


            <td>

                ${
                    producto
                    ?
                    producto.categoria
                    :
                    "-"
                }

            </td>


            <td>

                ${
                    formatearPrecio(
                        producto.precio
                    )
                }

            </td>


            <td>

                ${detalle.cantidad}

            </td>


            <td>

                ${
                    formatearPrecio(
                        detalle.subtotal
                    )
                }

            </td>


        </tr>

        `;


    });



    document.getElementById(
        "totalDetalle"
    ).textContent =
        formatearPrecio(total);



    document.getElementById(
        "seccionDetalle"
    ).style.display =
        "block";



}



// ======================================================
// CERRAR DETALLE
// ======================================================

function cerrarDetalle(){


    document.getElementById(
        "seccionDetalle"
    ).style.display =
        "none";


    document.getElementById(
        "tablaDetalle"
    ).innerHTML = "";


}



// ======================================================
// LIMPIAR
// ======================================================

function limpiarConsulta(){


    cargarMisPedidos();


    cerrarDetalle();


}



// ======================================================
// FORMATO PRECIO
// ======================================================

function formatearPrecio(precio){


    return new Intl.NumberFormat(
        "es-CO",
        {

            style:"currency",

            currency:"COP",

            minimumFractionDigits:0

        }

    ).format(
        Number(precio || 0)
    );


}



// ======================================================
// FORMATO FECHA
// ======================================================

function formatearFecha(fecha){


    if(!fecha){

        return "";

    }


    return fecha.substring(0,10);


}

// ======================================================
// SOLICITAR DEVOLUCIÓN
// ======================================================

async function abrirDevolucion(idPedido) {
const idUsuario =
    Number(
        localStorage.getItem("idUsuario")
    );


    if (!idUsuario) {

        alert(
            "Seleccione un usuario."
        );

        return;

    }


    try {

        // Consultar únicamente productos disponibles
        // para devolución

        const respuestaDisponibles =
            await fetch(

                `${API_DEVOLUCIONES}/disponibles/${idUsuario}`

            );


        if (!respuestaDisponibles.ok) {

            throw new Error(
                "No se pudieron consultar los productos disponibles."
            );

        }


        const disponibles =
            await respuestaDisponibles.json();


        // Obtener solo los productos del pedido
        // seleccionado

        const productosPedido =
            disponibles.filter(function (item) {

                return (

                    Number(item.idPedido)

                    ===

                    Number(idPedido)

                );

            });


        if (productosPedido.length === 0) {

            alert(
                "Este pedido no tiene productos disponibles para devolución."
            );

            return;

        }


        // Crear lista sencilla para seleccionar producto

        const listaProductos =
            productosPedido
                .map(function (item, indice) {

                    return (

                        (indice + 1)

                        + ". "

                        + item.nombreProducto

                        + " - disponibles: "

                        + item.cantidadDisponible

                    );

                })
                .join("\n");


        const seleccion =
            prompt(

                "Seleccione el producto que desea devolver:\n\n"

                + listaProductos

            );


        if (seleccion === null) {

            return;

        }


        const indiceSeleccionado =
            Number(seleccion) - 1;


        if (

            !Number.isInteger(indiceSeleccionado)

            ||

            indiceSeleccionado < 0

            ||

            indiceSeleccionado >= productosPedido.length

        ) {

            alert(
                "La opción seleccionada no es válida."
            );

            return;

        }


        const productoSeleccionado =
            productosPedido[indiceSeleccionado];


        const cantidadTexto =
            prompt(

                "Cantidad que desea devolver. Máximo: "

                + productoSeleccionado.cantidadDisponible,

                "1"

            );


        if (cantidadTexto === null) {

            return;

        }


        const cantidad =
            Number(cantidadTexto);


        if (

            !Number.isInteger(cantidad)

            ||

            cantidad <= 0

            ||

            cantidad >
                Number(
                    productoSeleccionado.cantidadDisponible
                )

        ) {

            alert(
                "La cantidad ingresada no es válida."
            );

            return;

        }


        const motivo =
            prompt(
                "Escriba el motivo de la devolución:"
            );


        if (motivo === null) {

            return;

        }


        if (motivo.trim() === "") {

            alert(
                "El motivo es obligatorio."
            );

            return;

        }


        const comentario =
            prompt(
                "Comentario adicional — opcional:",
                ""
            );


        if (comentario === null) {

            return;

        }


        // Enviar la solicitud al backend

        const respuesta =
            await fetch(
                API_DEVOLUCIONES,
                {
                    method:
                        "POST",

                    headers:
                    {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            {
                                idDetalle:
                                    productoSeleccionado.idDetalle,

                                idUsuario:
                                    idUsuario,

                                cantidad:
                                    cantidad,

                                motivo:
                                    motivo.trim(),

                                comentario:
                                    comentario.trim()
                            }
                        )
                }
            );


        const textoRespuesta =
            await respuesta.text();


        let resultado;


        try {

            resultado =
                textoRespuesta

                    ? JSON.parse(textoRespuesta)

                    : {};

        }

        catch {

            resultado =
                textoRespuesta;

        }


        if (!respuesta.ok) {

            const mensajeError =

                typeof resultado === "string"

                    ? resultado

                    : resultado.mensaje
                      || "No se pudo crear la devolución";


            throw new Error(
                mensajeError
            );

        }


        alert(
            resultado.mensaje
            || "Solicitud de devolución creada correctamente."
        );

    }

    catch (error) {

        console.error(
            "Error al solicitar devolución:",
            error
        );


        alert(
            error.message
        );

    }

}