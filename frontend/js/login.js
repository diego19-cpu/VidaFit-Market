document.addEventListener("DOMContentLoaded", function () {

    const campoCorreo =
        document.getElementById("correo");

    const campoContraseña =
        document.getElementById("contraseña");

// Limpiar los campos al abrir la página

if (campoCorreo) {
    campoCorreo.value = "";
}

if (campoContraseña) {
    campoContraseña.value = "";
}

const mensajeLogin =
    document.getElementById("mensajeLogin");

if (mensajeLogin) {
    mensajeLogin.textContent = "";
}
    // Permitir iniciar sesión presionando ENTER

    if (campoCorreo) {

        campoCorreo.addEventListener(
            "keydown",
            detectarEnter
        );

    }


    if (campoContraseña) {

        campoContraseña.addEventListener(
            "keydown",
            detectarEnter
        );

    }

});


// ======================================================
// RUTAS DE LA API
// ======================================================

const API_ADMINISTRADORES =
    "https://localhost:7244/api/Administradors";


const API_USUARIOS =
    "https://localhost:7244/api/Usuarios";


// ======================================================
// 1. INICIAR SESIÓN
// ======================================================

function iniciarSesion() {

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


    const mensaje =
        document.getElementById("mensajeLogin");


    // VALIDAR CAMPOS

    if (correo === "" || contraseña === "") {

        mensaje.style.color = "red";

        mensaje.textContent =
            "Ingrese el correo y la contraseña.";

        return;

    }


    mensaje.style.color = "#137333";

    mensaje.textContent =
        "Verificando datos...";


    // BUSCAR PRIMERO EN ADMINISTRADORES

    fetch(API_ADMINISTRADORES)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "No se pudo consultar administradores"
                );

            }

            return response.json();

        })

        .then(function (administradores) {


            const administradorEncontrado =
                administradores.find(
                    function (administrador) {

                        const correoAdmin =
                            String(
                                administrador.correo || ""
                            )
                                .trim()
                                .toLowerCase();


                        const contraseñaAdmin =
                            String(
                                administrador["contraseña"] || ""
                            );


                        return (

                            correoAdmin === correo

                            &&

                            contraseñaAdmin === contraseña

                        );

                    }
                );


            // SI ES ADMINISTRADOR

            if (administradorEncontrado) {

                guardarSesionAdministrador(
                    administradorEncontrado
                );

                return;

            }


            // SI NO ES ADMINISTRADOR,
            // BUSCAR EN USUARIOS

            buscarUsuario(
                correo,
                contraseña
            );

        })

        .catch(function (error) {

            console.error(
                "Error de inicio de sesión:",
                error
            );


            mensaje.style.color = "red";

            mensaje.textContent =
                "No se pudo conectar con el servidor.";

        });

}


// ======================================================
// 2. BUSCAR USUARIO
// ======================================================

function buscarUsuario(correo, contraseña) {

    const mensaje =
        document.getElementById("mensajeLogin");


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


            const usuarioEncontrado =
                usuarios.find(
                    function (usuario) {

                        const correoUsuario =
                            String(
                                usuario.correo || ""
                            )
                                .trim()
                                .toLowerCase();


                        const contraseñaUsuario =
                            String(
                                usuario["contraseña"] || ""
                            );


                        return (

                            correoUsuario === correo

                            &&

                            contraseñaUsuario === contraseña

                        );

                    }
                );


            // SI NO EXISTE

            if (!usuarioEncontrado) {

                mensaje.style.color = "red";

                mensaje.textContent =
                    "Correo o contraseña incorrectos.";

                return;

            }


            // SI EXISTE

            guardarSesionUsuario(
                usuarioEncontrado
            );

        })

        .catch(function (error) {

            console.error(
                "Error al consultar usuarios:",
                error
            );


            mensaje.style.color = "red";

            mensaje.textContent =
                "No se pudo conectar con el servidor.";

        });

}


// ======================================================
// 3. GUARDAR SESIÓN DEL ADMINISTRADOR
// ======================================================

function guardarSesionAdministrador(administrador) {

    limpiarDatosSesion();


    localStorage.setItem(
        "rol",
        "Administrador"
    );


    localStorage.setItem(
        "idAdmin",
        administrador.idAdmin
    );


    localStorage.setItem(
        "nombreSesion",
        (

            administrador.nombre

            +

            " "

            +

            administrador.apellido

        ).trim()
    );


    localStorage.setItem(
        "correoSesion",
        administrador.correo
    );


    const mensaje =
        document.getElementById("mensajeLogin");


    mensaje.style.color = "#137333";

    mensaje.textContent =
        "Bienvenido, administrador.";


    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 800);

}


// ======================================================
// 4. GUARDAR SESIÓN DEL USUARIO
// ======================================================

function guardarSesionUsuario(usuario) {

    limpiarDatosSesion();


    localStorage.setItem(
        "rol",
        "Usuario"
    );


    localStorage.setItem(
        "idUsuario",
        usuario.idUsuario
    );


    localStorage.setItem(
        "nombreSesion",
        (

            usuario.nombre

            +

            " "

            +

            usuario.apellido

        ).trim()
    );


    localStorage.setItem(
        "correoSesion",
        usuario.correo
    );


    const mensaje =
        document.getElementById("mensajeLogin");


    mensaje.style.color = "#137333";

    mensaje.textContent =
        "Inicio de sesión correcto.";


    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 800);

}


// ======================================================
// 5. CONTINUAR COMO VISITANTE
// ======================================================

function continuarComoVisitante() {

    limpiarDatosSesion();


    window.location.href =
        "index.html";

}


// ======================================================
// 6. LIMPIAR FORMULARIO
// ======================================================

function limpiarLogin() {

    document.getElementById(
        "correo"
    ).value = "";


    document.getElementById(
        "contraseña"
    ).value = "";


    document.getElementById(
        "mensajeLogin"
    ).textContent = "";


    document.getElementById(
        "correo"
    ).focus();

}


// ======================================================
// 7. LIMPIAR SESIÓN ANTERIOR
// ======================================================

function limpiarDatosSesion() {

    localStorage.removeItem("rol");

    localStorage.removeItem("idAdmin");

    localStorage.removeItem("idUsuario");

    localStorage.removeItem("nombreSesion");

    localStorage.removeItem("correoSesion");

}


// ======================================================
// 8. INICIAR SESIÓN CON ENTER
// ======================================================

function detectarEnter(evento) {

    if (evento.key === "Enter") {

        iniciarSesion();

    }

}