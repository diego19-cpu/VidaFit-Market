// ======================================================
// API DEL BLOG
// ======================================================

const API_URL = "https://localhost:7244/api/Blogs";


// ======================================================
// CUANDO LA PÁGINA TERMINE DE CARGAR
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("✅ blog.js cargado correctamente");


    const formulario =
        document.getElementById("formBlog");


    const botonLimpiar =
        document.getElementById("btnLimpiar");


    // Verificar formulario
    if (!formulario) {

        console.error(
            "❌ No se encontró el formulario formBlog"
        );

        return;

    }


    // Colocar la fecha actual
    colocarFechaActual();


    // ================================================
    // GUARDAR O ACTUALIZAR
    // ================================================

    formulario.addEventListener(
        "submit",
        function (event) {

            // Evitar recarga de página
            event.preventDefault();


            console.log(
                "✅ Formulario de Blog enviado"
            );


            const idBlog =
                document.getElementById(
                    "idBlog"
                ).value;


            // Si no tiene ID, crear
            if (idBlog === "") {

                guardarPublicacion();

            }

            // Si tiene ID, actualizar
            else {

                actualizarPublicacion();

            }

        }
    );


    // ================================================
    // BOTÓN LIMPIAR
    // ================================================

    if (botonLimpiar) {

        botonLimpiar.addEventListener(
            "click",
            function () {

                limpiarFormulario();

            }
        );

    }


    // ================================================
    // CARGAR PUBLICACIONES
    // ================================================

    cargarPublicaciones();

});


// ======================================================
// 1. LISTAR PUBLICACIONES
// ======================================================

async function cargarPublicaciones() {

    const tabla =
        document.getElementById(
            "tablaBlogs"
        );


    if (!tabla) {

        console.error(
            "❌ No existe tablaBlogs"
        );

        return;

    }


    try {

        console.log(
            "🔄 Consultando publicaciones..."
        );


        tabla.innerHTML = `

            <tr>

                <td colspan="6">

                    Consultando publicaciones...

                </td>

            </tr>

        `;


        // Consultar API
        const response =
            await fetch(API_URL);


        console.log(
            "Código GET:",
            response.status
        );


        // Verificar respuesta
        if (!response.ok) {

            throw new Error(

                "Error HTTP " +
                response.status

            );

        }


        // Convertir a JSON
        const publicaciones =
            await response.json();


        console.log(
            "✅ Publicaciones recibidas:",
            publicaciones
        );


        // Limpiar tabla
        tabla.innerHTML = "";


        // Verificar si está vacía
        if (
            !publicaciones ||
            publicaciones.length === 0
        ) {

            tabla.innerHTML = `

                <tr>

                    <td colspan="6">

                        No hay publicaciones registradas.

                    </td>

                </tr>

            `;

            return;

        }


        // Recorrer publicaciones
        publicaciones.forEach(
            function (publicacion) {


                const contenidoCorto =
                    acortarTexto(
                        publicacion.contenido,
                        80
                    );


                const fecha =
                    formatearFecha(
                        publicacion.fechaPublicacion
                    );


                tabla.innerHTML += `

                    <tr>

                        <td>

                            ${publicacion.idBlog}

                        </td>


                        <td>

                            ${publicacion.idAdmin ?? ""}

                        </td>


                        <td>

                            ${escaparHTML(
                                publicacion.titulo ?? ""
                            )}

                        </td>


                        <td>

                            ${escaparHTML(
                                contenidoCorto
                            )}

                        </td>


                        <td>

                            ${fecha}

                        </td>


                        <td>


                            <button
                                type="button"
                                onclick="buscarPublicacion(${publicacion.idBlog})">

                                Editar

                            </button>


                            <button
                                type="button"
                                onclick="eliminarPublicacion(${publicacion.idBlog})">

                                Eliminar

                            </button>


                        </td>


                    </tr>

                `;

            }
        );

    }

    catch (error) {

        console.error(
            "❌ ERROR AL CARGAR BLOG:",
            error
        );


        tabla.innerHTML = `

            <tr>

                <td colspan="6">

                    No se pudieron cargar las publicaciones.

                    <br>

                    ${error.message}

                </td>

            </tr>

        `;

    }

}


// ======================================================
// 2. BUSCAR PUBLICACIÓN PARA EDITAR
// ======================================================

async function buscarPublicacion(id) {

    try {

        console.log(
            "🔍 Buscando publicación:",
            id
        );


        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        console.log(
            "Código búsqueda:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "No se pudo buscar la publicación"
            );

        }


        const publicacion =
            await response.json();


        console.log(
            "✅ Publicación encontrada:",
            publicacion
        );


        // ID Blog
        document.getElementById(
            "idBlog"
        ).value =
            publicacion.idBlog;


        // ID Administrador
        document.getElementById(
            "idAdmin"
        ).value =
            publicacion.idAdmin ?? "";


        // Título
        document.getElementById(
            "titulo"
        ).value =
            publicacion.titulo ?? "";


        // Contenido
        document.getElementById(
            "contenido"
        ).value =
            publicacion.contenido ?? "";


        // Fecha
        document.getElementById(
            "fechaPublicacion"
        ).value =
            convertirFechaParaInput(
                publicacion.fechaPublicacion
            );


        // Cambiar título
        document.getElementById(
            "tituloFormulario"
        ).textContent =
            "Editar publicación";


        // Cambiar botón
        document.getElementById(
            "btnGuardar"
        ).textContent =
            "Actualizar publicación";


        // Subir hacia el formulario
        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(
            "❌ ERROR AL BUSCAR:",
            error
        );


        alert(

            "No se pudo cargar la publicación.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 3. GUARDAR PUBLICACIÓN
// ======================================================

async function guardarPublicacion() {

    try {

        console.log(
            "💾 Guardando publicación..."
        );


        const publicacion =
            obtenerDatosFormulario();


        console.log(
            "Datos enviados:",
            publicacion
        );


        const response =
            await fetch(
                API_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            publicacion
                        )

                }
            );


        console.log(
            "Código POST:",
            response.status
        );


        const texto =
            await response.text();


        console.log(
            "Respuesta API:",
            texto
        );


        if (!response.ok) {

            throw new Error(

                texto ||

                "No se pudo guardar la publicación"

            );

        }


        alert(
            "✅ Publicación guardada correctamente"
        );


        limpiarFormulario();


        await cargarPublicaciones();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL GUARDAR:",
            error
        );


        alert(

            "Error al guardar la publicación.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 4. ACTUALIZAR PUBLICACIÓN
// ======================================================

async function actualizarPublicacion() {

    try {

        const id =
            document.getElementById(
                "idBlog"
            ).value;


        if (id === "") {

            alert(
                "No se encontró el ID de la publicación"
            );

            return;

        }


        const publicacion =
            obtenerDatosFormulario();


        // Agregar ID correcto
        publicacion.idBlog =
            parseInt(id);


        console.log(
            "✏️ Actualizando publicación:",
            publicacion
        );


        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            publicacion
                        )

                }
            );


        console.log(
            "Código PUT:",
            response.status
        );


        const texto =
            await response.text();


        console.log(
            "Respuesta PUT:",
            texto
        );


        if (!response.ok) {

            throw new Error(

                texto ||

                "No se pudo actualizar la publicación"

            );

        }


        alert(
            "✅ Publicación actualizada correctamente"
        );


        limpiarFormulario();


        await cargarPublicaciones();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL ACTUALIZAR:",
            error
        );


        alert(

            "Error al actualizar la publicación.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 5. ELIMINAR PUBLICACIÓN
// ======================================================

async function eliminarPublicacion(id) {

    const confirmar =
        confirm(

            "¿Seguro que deseas eliminar esta publicación?"

        );


    if (!confirmar) {

        return;

    }


    try {

        console.log(
            "🗑️ Eliminando publicación:",
            id
        );


        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "DELETE"

                }
            );


        console.log(
            "Código DELETE:",
            response.status
        );


        const texto =
            await response.text();


        console.log(
            "Respuesta DELETE:",
            texto
        );


        if (!response.ok) {

            throw new Error(

                texto ||

                "No se pudo eliminar la publicación"

            );

        }


        alert(
            "✅ Publicación eliminada correctamente"
        );


        limpiarFormulario();


        await cargarPublicaciones();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL ELIMINAR:",
            error
        );


        alert(

            "Error al eliminar la publicación.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 6. OBTENER DATOS DEL FORMULARIO
// ======================================================

function obtenerDatosFormulario() {

    const idBlog =
        document.getElementById(
            "idBlog"
        ).value;


    const idAdmin =
        document.getElementById(
            "idAdmin"
        ).value;


    const titulo =
        document.getElementById(
            "titulo"
        ).value.trim();


    const contenido =
        document.getElementById(
            "contenido"
        ).value.trim();


    const fechaPublicacion =
        document.getElementById(
            "fechaPublicacion"
        ).value;


    // OBJETO IGUAL AL QUE FUNCIONÓ EN SWAGGER
    const publicacion = {

        idBlog:

            idBlog === ""

                ? 0

                : parseInt(idBlog),


        idAdmin:

            parseInt(idAdmin),


        titulo:

            titulo,


        contenido:

            contenido,
categoria: document.getElementById("categoria").value,

        fechaPublicacion:

            fechaPublicacion

    };


    return publicacion;

}


// ======================================================
// 7. LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    const formulario =
        document.getElementById(
            "formBlog"
        );


    if (formulario) {

        formulario.reset();

    }


    // Limpiar ID
    document.getElementById(
        "idBlog"
    ).value = "";


    // Restaurar administrador
    document.getElementById(
        "idAdmin"
    ).value = "1";


    // Restaurar fecha actual
    colocarFechaActual();


    // Restaurar título
    document.getElementById(
        "tituloFormulario"
    ).textContent =
        "Registrar publicación";


    // Restaurar botón
    document.getElementById(
        "btnGuardar"
    ).textContent =
        "Guardar publicación";


    console.log(
        "🧹 Formulario de Blog limpiado"
    );

}


// ======================================================
// 8. COLOCAR FECHA ACTUAL
// ======================================================

function colocarFechaActual() {

    const campoFecha =
        document.getElementById(
            "fechaPublicacion"
        );


    if (!campoFecha) {

        return;

    }


    const hoy =
        new Date();


    const anio =
        hoy.getFullYear();


    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");


    campoFecha.value =
        `${anio}-${mes}-${dia}`;

}


// ======================================================
// 9. CONVERTIR FECHA PARA INPUT
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
// 10. FORMATEAR FECHA PARA LA TABLA
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
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// ======================================================
// 11. ACORTAR CONTENIDO
// ======================================================

function acortarTexto(texto, limite) {

    if (!texto) {

        return "";

    }


    if (texto.length <= limite) {

        return texto;

    }


    return (
        texto.substring(0, limite) +
        "..."
    );

}


// ======================================================
// 12. EVITAR QUE HTML ESCRITO SE EJECUTE
// ======================================================

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        texto ?? "";


    return elemento.innerHTML;

}