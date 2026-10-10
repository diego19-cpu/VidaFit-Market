document.addEventListener("DOMContentLoaded", function () {

    const formulario =
        document.getElementById("formRegistro");


    if (formulario) {

        formulario.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                registrarUsuario();

            }
        );

    }

});


// ======================================================
// RUTA DE LA API
// ======================================================

const API_USUARIOS =
    "https://localhost:7244/api/Usuarios";


// ======================================================
// 1. REGISTRAR NUEVO USUARIO
// ======================================================

function registrarUsuario() {

    const nombre =
        document
            .getElementById("nombre")
            .value
            .trim();


    const apellido =
        document
            .getElementById("apellido")
            .value
            .trim();


    const correo =
        document
            .getElementById("correo")
            .value
            .trim()
            .toLowerCase();


    const contraseña =
        document
            .getElementById("contraseña")
            .value
            .trim();


    const telefono =
        document
            .getElementById("telefono")
            .value
            .trim();


    const mensaje =
        document.getElementById(
            "mensajeRegistro"
        );


    // ==================================================
    // VALIDAR CAMPOS
    // ==================================================

    if (
        nombre === ""
        ||
        apellido === ""
        ||
        correo === ""
        ||
        contraseña === ""
        ||
        telefono === ""
    ) {

        mensaje.style.color = "red";

        mensaje.textContent =
            "Complete todos los campos.";

        return;

    }


    mensaje.style.color = "#137333";

    mensaje.textContent =
        "Verificando correo...";


    // ==================================================
    // REVISAR SI EL CORREO YA EXISTE
    // ==================================================

    fetch(API_USUARIOS)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "No se pudieron consultar los usuarios"
                );

            }

            return response.json();

        })

        .then(function (usuarios) {


            const correoExiste =
                usuarios.some(
                    function (usuario) {

                        return (

                            String(
                                usuario.correo || ""
                            )
                                .trim()
                                .toLowerCase()

                            ===

                            correo

                        );

                    }
                );


            if (correoExiste) {

                mensaje.style.color = "red";

                mensaje.textContent =
                    "Ya existe una cuenta con este correo.";

                return;

            }


            // SI EL CORREO NO EXISTE,
            // CREAR EL USUARIO

            crearUsuario({

                idUsuario: 0,

                nombre: nombre,

                correo: correo,

                "contraseña": contraseña,

                telefono: telefono,

                apellido: apellido

            });

        })

        .catch(function (error) {

            console.error(
                "Error al verificar correo:",
                error
            );


            mensaje.style.color = "red";

            mensaje.textContent =
                "No se pudo conectar con el servidor.";

        });

}


// ======================================================
// 2. GUARDAR USUARIO EN LA BASE DE DATOS
// ======================================================

function crearUsuario(usuario) {

    const mensaje =
        document.getElementById(
            "mensajeRegistro"
        );


    const boton =
        document.getElementById(
            "btnRegistrar"
        );


    boton.disabled = true;

    boton.textContent =
        "Creando cuenta...";


    fetch(API_USUARIOS, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(usuario)

    })

        .then(async function (response) {

            const texto =
                await response.text();


            if (!response.ok) {

                console.error(
                    "Error del servidor:",
                    response.status,
                    texto
                );


                throw new Error(
                    texto
                    ||
                    "No se pudo crear la cuenta"
                );

            }


            return texto;

        })

        .then(function () {

            mensaje.style.color = "#137333";

            mensaje.textContent =
                "Cuenta creada correctamente. Ahora puedes iniciar sesión.";


            document
                .getElementById("formRegistro")
                .reset();


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1800);

        })

        .catch(function (error) {

            console.error(
                "Error al registrar usuario:",
                error
            );


            mensaje.style.color = "red";

            mensaje.textContent =
                "No se pudo crear la cuenta.";


            boton.disabled = false;

            boton.textContent =
                "Crear cuenta";

        });

}


// ======================================================
// 3. LIMPIAR FORMULARIO
// ======================================================

function limpiarRegistro() {

    document
        .getElementById("formRegistro")
        .reset();


    document
        .getElementById("mensajeRegistro")
        .textContent = "";


    const boton =
        document.getElementById(
            "btnRegistrar"
        );


    boton.disabled = false;

    boton.textContent =
        "Crear cuenta";


    document
        .getElementById("nombre")
        .focus();

}