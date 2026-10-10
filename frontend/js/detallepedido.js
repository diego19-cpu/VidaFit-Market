document.addEventListener("DOMContentLoaded", () => {

    cargarPedidos();

    cargarProductos();

    const formulario =
        document.getElementById("formDetallePedido");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const idPedido =
            document.getElementById("idPedido").value;

        if (idPedido === "") {

            alert("Seleccione un pedido");

            return;

        }

        cargarDetallesPedido(idPedido);

    });

});


// ======================================================
// RUTAS REALES SEGÚN SWAGGER
// ======================================================

const API_DETALLES =
    "https://localhost:7244/api/DetallePedido";

const API_PEDIDOS =
    "https://localhost:7244/api/Pedidos";

const API_PRODUCTOS =
    "https://localhost:7244/api/Productos";


// ======================================================
// VARIABLES PARA GUARDAR PRODUCTOS
// ======================================================

let productosPorId = {};


// ======================================================
// 1. CARGAR PEDIDOS EN EL SELECT
// ======================================================

function cargarPedidos() {

    const selectPedido =
        document.getElementById("idPedido");


    fetch(API_PEDIDOS)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar pedidos"
                );

            }

            return response.json();

        })

        .then(pedidos => {

            selectPedido.innerHTML = `

                <option value="">

                    Seleccione un pedido

                </option>

            `;


            pedidos.forEach(pedido => {

                selectPedido.innerHTML += `

                    <option value="${pedido.idPedido}">

                        Pedido #${pedido.idPedido}
                        - ${pedido.estado}
                        - ${formatearPrecio(pedido.total)}

                    </option>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar pedidos:",
                error
            );


            selectPedido.innerHTML = `

                <option value="">

                    No se pudieron cargar los pedidos

                </option>

            `;

        });

}


// ======================================================
// 2. CARGAR PRODUCTOS
// ======================================================

function cargarProductos() {

    fetch(API_PRODUCTOS)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar productos"
                );

            }

            return response.json();

        })

        .then(productos => {

            productosPorId = {};


            productos.forEach(producto => {

                productosPorId[
                    producto.idProducto
                ] = producto;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar productos:",
                error
            );

        });

}


// ======================================================
// 3. CARGAR DETALLES DEL PEDIDO
// ======================================================

function cargarDetallesPedido(idPedido) {

    const tabla =
        document.getElementById(
            "tablaDetalles"
        );


    tabla.innerHTML = `

        <tr>

            <td colspan="6">

                Consultando detalle del pedido...

            </td>

        </tr>

    `;


    fetch(API_DETALLES)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar detalles"
                );

            }

            return response.json();

        })

        .then(detalles => {


            // FILTRAR SOLO EL PEDIDO SELECCIONADO

            const detallesPedido =
                detalles.filter(detalle =>

                    Number(detalle.idPedido)
                    ===
                    Number(idPedido)

                );


            tabla.innerHTML = "";


            // SI NO HAY DETALLES

            if (detallesPedido.length === 0) {

                tabla.innerHTML = `

                    <tr>

                        <td colspan="6">

                            Este pedido no tiene productos registrados.

                        </td>

                    </tr>

                `;


                document.getElementById(
                    "totalPedido"
                ).textContent =

                    "Total de los detalles: $0";


                return;

            }


            let total = 0;


            detallesPedido.forEach(detalle => {


                const producto =
                    productosPorId[
                        detalle.idProducto
                    ];


                const nombreProducto =

                    producto

                        ? producto.nombre

                        : "Producto ID " +
                          detalle.idProducto;


                const categoria =

                    producto

                        ? producto.categoria

                        : "";


                const precio =

                    producto

                        ? producto.precio

                        : 0;


                total +=
                    Number(
                        detalle.subtotal
                    );


                tabla.innerHTML += `

                    <tr>


                        <td>

                            ${detalle.idDetalle}

                        </td>


                        <td>

                            ${nombreProducto}

                        </td>


                        <td>

                            ${categoria}

                        </td>


                        <td>

                            ${formatearPrecio(precio)}

                        </td>


                        <td>

                            ${detalle.cantidad}

                        </td>


                        <td>

                            ${formatearPrecio(
                                detalle.subtotal
                            )}

                        </td>


                    </tr>

                `;

            });


            document.getElementById(
                "totalPedido"
            ).textContent =

                "Total de los detalles: "

                +

                formatearPrecio(total);

        })

        .catch(error => {

            console.error(
                "Error al cargar detalle:",
                error
            );


            tabla.innerHTML = `

                <tr>

                    <td colspan="6">

                        No se pudo cargar el detalle del pedido.

                    </td>

                </tr>

            `;

        });

}


// ======================================================
// LIMPIAR
// ======================================================

function limpiarFormulario() {

    document.getElementById(
        "formDetallePedido"
    ).reset();


    document.getElementById(
        "tablaDetalles"
    ).innerHTML = `

        <tr>

            <td colspan="6">

                Seleccione un pedido para ver sus productos.

            </td>

        </tr>

    `;


    document.getElementById(
        "totalPedido"
    ).textContent =

        "Total de los detalles: $0";

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