document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formMascota");

    const botonLimpiar =
        document.getElementById("btnLimpiar");


    // Primero cargar usuarios y después mascotas

    cargarUsuarioSesion();

cargarMascotas();

    // GUARDAR O ACTUALIZAR

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();


        const idMascota =
            document.getElementById("idMascota").value;


        if (idMascota === "") {

            guardarMascota();

        } else {

            actualizarMascota();

        }

    });


    // BOTÓN LIMPIAR

    botonLimpiar.addEventListener("click", function () {

        limpiarFormulario();

    });

});


// ======================================================
// RUTAS REALES SEGÚN SWAGGER
// ======================================================

const API_URL =
    "https://localhost:7244/api/Mascotas";


const API_USUARIOS =
    "https://localhost:7244/api/Usuarios";


// Guardar nombres de los usuarios

let usuariosPorId = {};
function cargarUsuarioSesion(){

    const idUsuario =
        localStorage.getItem("idUsuario");


    const nombre =
        localStorage.getItem("nombreSesion");

// Guardar nombre del usuario
    usuariosPorId[idUsuario] = nombre;

    document.getElementById(
        "idUsuario"
    ).innerHTML = `

        <option value="${idUsuario}" selected>

            ${nombre}

        </option>

    `;

}

// ======================================================
// 1. CARGAR USUARIOS PARA EL SELECT
// ======================================================

function cargarUsuarios() {

    const selectUsuario =
        document.getElementById("idUsuario");


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

            selectUsuario.innerHTML = `

                <option value="">

                    Seleccione el propietario

                </option>

            `;


            usuariosPorId = {};


            usuarios.forEach(usuario => {


                // Guardar nombre para mostrarlo en la tabla

                usuariosPorId[usuario.idUsuario] =

                    `${usuario.nombre} ${usuario.apellido}`;


                // Crear opción del selector

                selectUsuario.innerHTML += `

                    <option value="${usuario.idUsuario}">

                        ${usuario.nombre}
                        ${usuario.apellido}
                        - ID ${usuario.idUsuario}

                    </option>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar usuarios:",
                error
            );


            selectUsuario.innerHTML = `

                <option value="">

                    No se pudieron cargar los usuarios

                </option>

            `;

        });

}


// ======================================================
// 2. LISTAR MASCOTAS
// ======================================================

function cargarMascotas() {

    const tabla =
        document.getElementById("tablaMascotas");


    tabla.innerHTML = `

        <tr>

            <td colspan="8">

                Consultando mascotas...

            </td>

        </tr>

    `;


    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar mascotas"
                );

            }

            return response.json();

        })

        .then(data => {


    const idUsuarioSesion =
        localStorage.getItem("idUsuario");


    const rol =
    localStorage.getItem("rol");


let mascotas = data;


if (rol !== "Administrador") {

    mascotas = data.filter(
        mascota =>
            mascota.idUsuario == idUsuarioSesion
    );

}

            tabla.innerHTML = "";


            if (mascotas.length === 0) {

                tabla.innerHTML = `

                    <tr>

                        <td colspan="8">

                            No hay mascotas registradas.

                        </td>

                    </tr>

                `;

                return;

            }


            mascotas.forEach(mascota => {


                const propietario =

                    usuariosPorId[mascota.idUsuario]

                    ||

                    `Usuario ID ${mascota.idUsuario}`;


                tabla.innerHTML += `

                    <tr>


                        <td>

                            ${mascota.idMascota}

                        </td>


                        <td>

                            ${propietario}

                        </td>


                        <td>

                            ${mascota.nombre}

                        </td>


                        <td>

                            ${mascota.raza}

                        </td>


                        <td>

                            ${mascota.edad} años

                        </td>


                        <td>

                            ${formatearPeso(mascota.peso)}

                        </td>


                        <td>

                            ${mascota.necesidad}

                        </td>


                        <td>


                            <button
                                onclick="buscarMascota(${mascota.idMascota})">

                                Editar

                            </button>


                            <button
                                onclick="eliminarMascota(${mascota.idMascota})">

                                Eliminar

                            </button>


                        </td>


                    </tr>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Error al cargar mascotas:",
                error
            );


            tabla.innerHTML = `

                <tr>

                    <td colspan="8">

                        No se pudieron cargar las mascotas.

                    </td>

                </tr>

            `;

        });

}


// ======================================================
// 3. BUSCAR MASCOTA POR ID
// ======================================================

function buscarMascota(id) {

    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "No se pudo buscar la mascota"
                );

            }

            return response.json();

        })

        .then(mascota => {


            document.getElementById(
                "idMascota"
            ).value =
                mascota.idMascota;


            document.getElementById(
                "idUsuario"
            ).value =
                mascota.idUsuario;


            document.getElementById(
                "nombre"
            ).value =
                mascota.nombre;


            document.getElementById(
                "raza"
            ).value =
                mascota.raza;


            document.getElementById(
                "edad"
            ).value =
                mascota.edad;


            document.getElementById(
                "peso"
            ).value =
                mascota.peso;


            document.getElementById(
                "necesidad"
            ).value =
                mascota.necesidad;


            // Cambiar título

            document.getElementById(
                "tituloFormulario"
            ).textContent =
                "Editar perro";


            // Cambiar botón

            document.getElementById(
                "btnGuardar"
            ).textContent =
                "Actualizar perro";


            // Subir al formulario

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        })

        .catch(error => {

            console.error(
                "Error al buscar mascota:",
                error
            );


            alert(
                "No se pudo cargar la mascota"
            );

        });

}


// ======================================================
// 4. GUARDAR MASCOTA
// ======================================================

function guardarMascota() {

    const mascota =
        obtenerDatosFormulario();


    console.log(
        "Mascota que se enviará:",
        mascota
    );


    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(mascota)

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
                "No se pudo guardar la mascota"
            );

        }


        alert(
            "Mascota guardada correctamente"
        );


        limpiarFormulario();


        cargarMascotas();

    })

    .catch(error => {

        console.error(
            "Error al guardar mascota:",
            error
        );


        alert(

            "Error al guardar el perro.\n\n" +

            error.message

        );

    });

}


// ======================================================
// 5. ACTUALIZAR MASCOTA
// ======================================================

function actualizarMascota() {

    const id =
        document.getElementById(
            "idMascota"
        ).value;


    const mascota =
        obtenerDatosFormulario();


    mascota.idMascota =
        parseInt(id);


    fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(mascota)

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
                "No se pudo actualizar la mascota"
            );

        }


        alert(
            "Mascota actualizada correctamente"
        );


        limpiarFormulario();


        cargarMascotas();

    })

    .catch(error => {

        console.error(
            "Error al actualizar mascota:",
            error
        );


        alert(

            "Error al actualizar el perro.\n\n" +

            error.message

        );

    });

}


// ======================================================
// 6. ELIMINAR MASCOTA
// ======================================================

function eliminarMascota(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este perro?"
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
                "No se pudo eliminar la mascota"
            );

        }


        alert(
            "Perro eliminado correctamente"
        );


        cargarMascotas();

    })

    .catch(error => {

        console.error(
            "Error al eliminar mascota:",
            error
        );


        alert(

            "Error al eliminar el perro.\n\n" +

            error.message

        );

    });

}


// ======================================================
// TOMAR DATOS DEL FORMULARIO
// ======================================================

function obtenerDatosFormulario() {

    const idMascota =
        document.getElementById(
            "idMascota"
        ).value;


    const idUsuario =
        document.getElementById(
            "idUsuario"
        ).value;


    const nombre =
        document.getElementById(
            "nombre"
        ).value.trim();


    const raza =
        document.getElementById(
            "raza"
        ).value.trim();


    const edad =
        document.getElementById(
            "edad"
        ).value;


    const peso =
        document.getElementById(
            "peso"
        ).value;


    const necesidad =
        document.getElementById(
            "necesidad"
        ).value;


    return {

        idMascota:

            idMascota === ""

                ? 0

                : parseInt(idMascota),


        idUsuario:

            parseInt(idUsuario),


        nombre:

            nombre,


        raza:

            raza,


        edad:

            parseInt(edad),


        peso:

            parseFloat(peso),


        necesidad:

            necesidad,


        recomendacions:

            []

    };

}


// ======================================================
// LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {

    document.getElementById(
        "idMascota"
    ).value = "";


    document.getElementById(
        "formMascota"
    ).reset();


    document.getElementById(
        "btnGuardar"
    ).textContent =
        "Guardar perro";


    document.getElementById(
        "tituloFormulario"
    ).textContent =
        "Registrar perro";

}


// ======================================================
// FORMATEAR PESO
// ======================================================

function formatearPeso(peso) {

    const valor =
        Number(peso || 0);


    return (
        valor.toFixed(2)
        +
        " kg"
    );

}