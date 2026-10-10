document.addEventListener("DOMContentLoaded", () => {

    cargarProductos();

    const formulario =
        document.getElementById("formProducto");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const idProducto =
            document.getElementById("idProducto").value;

        if (idProducto === "") {

            guardarProducto();

        } else {

            actualizarProducto();

        }

    });

});


// Ruta real según Swagger
const API_URL =
    "https://localhost:7244/api/Productos";


// ======================================================
// 1. LISTAR PRODUCTOS
// ======================================================

function cargarProductos() {

    const tabla =
        document.getElementById("tablaProductos");

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar productos"
                );

            }

            return response.json();

        })

        .then(productos => {

            tabla.innerHTML = "";

            if (productos.length === 0) {

                tabla.innerHTML = `

                    <tr>

                        <td colspan="11">

                            No hay productos registrados.

                        </td>

                    </tr>

                `;

                return;

            }


            productos.forEach(producto => {


                const estado =
                    obtenerEstadoStock(producto.stock);


                tabla.innerHTML += `

                    <tr>

                        <td>
                            ${producto.idProducto}
                        </td>

                        <td>
                            ${producto.idAdmin}
                        </td>

                        <td>
                            ${producto.nombre}
                        </td>

                        <td>
                            ${producto.categoria}
                        </td>

                        <td>
                            ${formatearPrecio(producto.precio)}
                        </td>

                        <td>
                            ${producto.stock}
                        </td>

                        <td>
                            ${estado}
                        </td>

                        <td>
                            ${producto.tipoUsuario}
                        </td>

                        <td>
                            ${acortarTexto(
                                producto.descripcion,
                                60
                            )}
                        </td>

                        <td>
                            ${acortarTexto(
                                producto.beneficio,
                                60
                            )}
                        </td>

                        <td>

                            <button
                                onclick="buscarProducto(${producto.idProducto})">

                                Editar

                            </button>


                            <button
                                onclick="eliminarProducto(${producto.idProducto})">

                                Eliminar

                            </button>

                        </td>

                    </tr>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar productos:",
                error
            );


            tabla.innerHTML = `

                <tr>

                    <td colspan="11">

                        No se pudieron cargar los productos.

                    </td>

                </tr>

            `;

        });

}


// ======================================================
// 2. BUSCAR PRODUCTO POR ID
// ======================================================

function buscarProducto(id) {

    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "No se pudo buscar el producto"
                );

            }

            return response.json();

        })

        .then(producto => {


            document.getElementById(
                "idProducto"
            ).value =
                producto.idProducto;


            document.getElementById(
                "idAdmin"
            ).value =
                producto.idAdmin;


            document.getElementById(
                "nombre"
            ).value =
                producto.nombre;


            document.getElementById(
                "categoria"
            ).value =
                producto.categoria;


            document.getElementById(
                "precio"
            ).value =
                producto.precio;


            document.getElementById(
                "stock"
            ).value =
                producto.stock;


            document.getElementById(
                "descripcion"
            ).value =
                producto.descripcion;


            document.getElementById(
                "beneficio"
            ).value =
                producto.beneficio;


            document.getElementById(
                "tipoUsuario"
            ).value =
                producto.tipoUsuario;


            document.getElementById(
                "btnGuardar"
            ).textContent =
                "Actualizar producto";


            const tituloFormulario =
                document.getElementById(
                    "tituloFormulario"
                );


            if (tituloFormulario) {

                tituloFormulario.textContent =
                    "Editar producto";

            }


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        })

        .catch(error => {

            console.error(
                "Error al buscar producto:",
                error
            );


            alert(
                "No se pudo cargar el producto"
            );

        });

}


// ======================================================
// 3. GUARDAR PRODUCTO
// ======================================================

function guardarProducto() {

    const producto =
        obtenerDatosFormulario();


    console.log(
        "Producto que se enviará:",
        producto
    );


    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(producto)

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
                "No se pudo guardar el producto"
            );

        }


        alert(
            "Producto guardado correctamente"
        );


        limpiarFormulario();


        cargarProductos();

    })

    .catch(error => {

        console.error(
            "Error al guardar producto:",
            error
        );


        alert(

            "Error al guardar el producto.\n\n" +

            error.message

        );

    });

}


// ======================================================
// 4. ACTUALIZAR PRODUCTO
// ======================================================

function actualizarProducto() {

    const id =
        document.getElementById(
            "idProducto"
        ).value;


    const producto =
        obtenerDatosFormulario();


    producto.idProducto =
        parseInt(id);


    fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(producto)

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
                "No se pudo actualizar el producto"
            );

        }


        alert(
            "Producto actualizado correctamente"
        );


        limpiarFormulario();


        cargarProductos();

    })

    .catch(error => {

        console.error(
            "Error al actualizar producto:",
            error
        );


        alert(

            "Error al actualizar el producto.\n\n" +

            error.message

        );

    });

}


// ======================================================
// 5. ELIMINAR PRODUCTO
// ======================================================

function eliminarProducto(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este producto?"
        );


    if (!confirmar) {

        return;

    }


    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

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
                "No se pudo eliminar el producto"
            );

        }


        alert(
            "Producto eliminado correctamente"
        );


        cargarProductos();

    })

    .catch(error => {

        console.error(
            "Error al eliminar producto:",
            error
        );


        alert(

            "Error al eliminar el producto.\n\n" +

            error.message

        );

    });

}


// ======================================================
// TOMAR DATOS DEL FORMULARIO
// ======================================================

function obtenerDatosFormulario() {

    const idProducto =
        document.getElementById(
            "idProducto"
        ).value;


    const idAdmin =
        document.getElementById(
            "idAdmin"
        ).value;


    const nombre =
        document.getElementById(
            "nombre"
        ).value;


    const categoria =
        document.getElementById(
            "categoria"
        ).value;


    const precio =
        document.getElementById(
            "precio"
        ).value;


    const stock =
        document.getElementById(
            "stock"
        ).value;


    const descripcion =
        document.getElementById(
            "descripcion"
        ).value;


    const beneficio =
        document.getElementById(
            "beneficio"
        ).value;


    const tipoUsuario =
        document.getElementById(
            "tipoUsuario"
        ).value;


    return {

        idProducto:

            idProducto === ""

                ? 0

                : parseInt(idProducto),


        idAdmin:

            parseInt(idAdmin),


        nombre:

            nombre,


        categoria:

            categoria,


        precio:

            parseFloat(precio),


        stock:

            parseInt(stock),


        descripcion:

            descripcion,


        beneficio:

            beneficio,


        tipoUsuario:

            tipoUsuario,


        detallePedidos: [],


        recomendacions: []

    };

}


// ======================================================
// LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    document.getElementById(
        "idProducto"
    ).value = "";


    document.getElementById(
        "formProducto"
    ).reset();


    document.getElementById(
        "idAdmin"
    ).value = "1";


    document.getElementById(
        "btnGuardar"
    ).textContent =
        "Guardar producto";


    const tituloFormulario =
        document.getElementById(
            "tituloFormulario"
        );


    if (tituloFormulario) {

        tituloFormulario.textContent =
            "Registrar producto";

    }

}


// ======================================================
// ESTADO DEL INVENTARIO
// ======================================================

function obtenerEstadoStock(stock) {

    const cantidad =
        Number(stock);


    if (cantidad <= 0) {

        return "Agotado";

    }


    if (cantidad <= 5) {

        return "Stock bajo";

    }


    return "Disponible";

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
// ACORTAR TEXTO
// ======================================================

function acortarTexto(texto, limite) {

    if (!texto) {

        return "";

    }


    if (texto.length <= limite) {

        return texto;

    }


    return (

        texto.substring(
            0,
            limite
        )

        +

        "..."

    );

}