// ======================================================
// API DE USUARIOS
// ======================================================

const API_URL = "https://localhost:7244/api/Usuarios";


// ======================================================
// CUANDO LA PÁGINA TERMINE DE CARGAR
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("✅ usuarios.js cargado correctamente");

    const formulario = document.getElementById("formUsuario");
    const botonLimpiar = document.getElementById("btnLimpiar");


    // Verificar que el formulario exista
    if (!formulario) {

        console.error("❌ No se encontró el formulario con id='formUsuario'");

        return;
    }


    // --------------------------------------------------
    // GUARDAR O ACTUALIZAR
    // --------------------------------------------------

    formulario.addEventListener("submit", function (event) {

        // Evitar que la página se recargue
        event.preventDefault();

        console.log("✅ Formulario enviado");

        const idUsuario =
            document.getElementById("idUsuario").value;


        // Si no tiene ID, crear nuevo usuario
        if (idUsuario === "") {

            guardarUsuario();

        }

        // Si tiene ID, actualizar
        else {

            actualizarUsuario();

        }

    });


    // --------------------------------------------------
    // BOTÓN LIMPIAR
    // --------------------------------------------------

    if (botonLimpiar) {

        botonLimpiar.addEventListener("click", function () {

            limpiarFormulario();

        });

    }


    // --------------------------------------------------
    // CARGAR LA LISTA
    // --------------------------------------------------

    cargarUsuarios();

});


// ======================================================
// 1. LISTAR TODOS LOS USUARIOS
// ======================================================

async function cargarUsuarios() {

    const tabla = document.getElementById("tablaUsuarios");


    if (!tabla) {

        console.error("❌ No existe tablaUsuarios");

        return;
    }


    try {

        console.log("🔄 Consultando usuarios...");


        tabla.innerHTML = `

            <tr>

                <td colspan="6">
                    Consultando usuarios...
                </td>

            </tr>

        `;


        const response = await fetch(API_URL);


        console.log(
            "Código de consulta:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Error HTTP " + response.status
            );

        }


        const usuarios = await response.json();


        console.log(
            "✅ Usuarios recibidos:",
            usuarios
        );


        tabla.innerHTML = "";


        // Si no existen usuarios
        if (!usuarios || usuarios.length === 0) {

            tabla.innerHTML = `

                <tr>

                    <td colspan="6">
                        No hay usuarios registrados.
                    </td>

                </tr>

            `;

            return;
        }


        // Mostrar usuarios
        usuarios.forEach(function (usuario) {

            tabla.innerHTML += `

                <tr>

                    <td>
                        ${usuario.idUsuario}
                    </td>

                    <td>
                        ${usuario.nombre ?? ""}
                    </td>

                    <td>
                        ${usuario.apellido ?? ""}
                    </td>

                    <td>
                        ${usuario.correo ?? ""}
                    </td>

                    <td>
                        ${usuario.telefono ?? ""}
                    </td>

                    <td>

                        <button
                            type="button"
                            onclick="buscarUsuario(${usuario.idUsuario})">

                            Editar

                        </button>


                        <button
                            type="button"
                            onclick="eliminarUsuario(${usuario.idUsuario})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(
            "❌ ERROR AL CARGAR USUARIOS:",
            error
        );


        tabla.innerHTML = `

            <tr>

                <td colspan="6">

                    No se pudieron cargar los usuarios.

                    <br>

                    ${error.message}

                </td>

            </tr>

        `;

    }

}


// ======================================================
// 2. BUSCAR UN USUARIO PARA EDITAR
// ======================================================

async function buscarUsuario(id) {

    try {

        console.log(
            "🔍 Buscando usuario:",
            id
        );


        const response =
            await fetch(`${API_URL}/${id}`);


        console.log(
            "Código búsqueda:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "No se pudo buscar el usuario"
            );

        }


        const usuario =
            await response.json();


        console.log(
            "✅ Usuario encontrado:",
            usuario
        );


        // Llevar los datos al formulario
        document.getElementById(
            "idUsuario"
        ).value = usuario.idUsuario;


        document.getElementById(
            "nombre"
        ).value = usuario.nombre ?? "";


        document.getElementById(
            "apellido"
        ).value = usuario.apellido ?? "";


        document.getElementById(
            "correo"
        ).value = usuario.correo ?? "";


        document.getElementById(
            "telefono"
        ).value = usuario.telefono ?? "";


        document.getElementById(
            "contrasena"
        ).value = usuario["contraseña"] ?? "";


        // Cambiar título
        const titulo =
            document.getElementById("tituloFormulario");

        if (titulo) {

            titulo.textContent = "Editar usuario";

        }


        // Cambiar texto del botón
        document.getElementById(
            "btnGuardar"
        ).textContent = "Actualizar usuario";


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
            "No se pudo cargar el usuario.\n\n" +
            error.message
        );

    }

}


// ======================================================
// 3. GUARDAR UN NUEVO USUARIO
// ======================================================

async function guardarUsuario() {

    try {

        console.log(
            "💾 Guardando usuario..."
        );


        const usuario =
            obtenerDatosFormulario();


        console.log(
            "Datos enviados:",
            usuario
        );


        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(usuario)

            });


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
                "No se pudo guardar el usuario"
            );

        }


        alert(
            "✅ Usuario guardado correctamente"
        );


        limpiarFormulario();


        await cargarUsuarios();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL GUARDAR:",
            error
        );


        alert(

            "Error al guardar el usuario.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 4. ACTUALIZAR USUARIO
// ======================================================

async function actualizarUsuario() {

    try {

        const id =
            document.getElementById(
                "idUsuario"
            ).value;


        if (id === "") {

            alert(
                "No se encontró el ID del usuario"
            );

            return;
        }


        const usuario =
            obtenerDatosFormulario();


        usuario.idUsuario =
            parseInt(id);


        console.log(
            "✏️ Actualizando usuario:",
            usuario
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
                        JSON.stringify(usuario)

                }
            );


        console.log(
            "Código PUT:",
            response.status
        );


        const texto =
            await response.text();


        console.log(
            "Respuesta actualización:",
            texto
        );


        if (!response.ok) {

            throw new Error(
                texto ||
                "No se pudo actualizar el usuario"
            );

        }


        alert(
            "✅ Usuario actualizado correctamente"
        );


        limpiarFormulario();


        await cargarUsuarios();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL ACTUALIZAR:",
            error
        );


        alert(

            "Error al actualizar el usuario.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 5. ELIMINAR USUARIO
// ======================================================

async function eliminarUsuario(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este usuario?"
        );


    if (!confirmar) {

        return;
    }


    try {

        console.log(
            "🗑️ Eliminando usuario:",
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
            "Respuesta eliminación:",
            texto
        );


        if (!response.ok) {

            throw new Error(
                texto ||
                "No se pudo eliminar el usuario"
            );

        }


        alert(
            "✅ Usuario eliminado correctamente"
        );


        limpiarFormulario();


        await cargarUsuarios();

    }

    catch (error) {

        console.error(
            "❌ ERROR AL ELIMINAR:",
            error
        );


        alert(

            "Error al eliminar el usuario.\n\n" +

            error.message

        );

    }

}


// ======================================================
// 6. OBTENER DATOS DEL FORMULARIO
// ======================================================

function obtenerDatosFormulario() {

    const idUsuario =
        document.getElementById(
            "idUsuario"
        ).value;


    const nombre =
        document.getElementById(
            "nombre"
        ).value.trim();


    const apellido =
        document.getElementById(
            "apellido"
        ).value.trim();


    const correo =
        document.getElementById(
            "correo"
        ).value.trim();


    const telefono =
        document.getElementById(
            "telefono"
        ).value.trim();


    const contrasena =
        document.getElementById(
            "contrasena"
        ).value;


    // OBJETO IGUAL AL QUE FUNCIONÓ EN SWAGGER
    const usuario = {

        idUsuario:
            idUsuario === ""
                ? 0
                : parseInt(idUsuario),

        nombre: nombre,

        apellido: apellido,

        correo: correo,

        "contraseña": contrasena,

        telefono: telefono,

        mascota: [],

        pedidos: [],

        recomendacions: []

    };


    return usuario;

}


// ======================================================
// 7. LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    const formulario =
        document.getElementById(
            "formUsuario"
        );


    if (formulario) {

        formulario.reset();

    }


    // Limpiar ID oculto
    document.getElementById(
        "idUsuario"
    ).value = "";


    // Restaurar título
    const titulo =
        document.getElementById(
            "tituloFormulario"
        );


    if (titulo) {

        titulo.textContent =
            "Registrar usuario";

    }


    // Restaurar botón
    document.getElementById(
        "btnGuardar"
    ).textContent =
        "Guardar usuario";


    console.log(
        "🧹 Formulario limpiado"
    );

}