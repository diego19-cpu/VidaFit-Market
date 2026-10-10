// ======================================================
// SEGURIDAD DE VIDAFIT MARKET SEGÚN EL ROL
// ======================================================

(function () {

    // OBTENER EL ROL GUARDADO EN EL LOGIN

    const rol =
        localStorage.getItem("rol");


    // SABER QUÉ PÁGINA ESTÁ ABIERTA

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();



    // ==================================================
    // PÁGINAS EXCLUSIVAS DEL ADMINISTRADOR
    // ==================================================

    const paginasAdministrador = [

        "administradores.html",

        "usuarios.html",

        "productos.html",

        "pedidos.html",

        "detallepedido.html",

        "blog.html"

    ];



    // ==================================================
    // PÁGINAS EXCLUSIVAS DEL USUARIO
    // ==================================================

    const paginasUsuario = [

        "carrito.html",

        "mispedidos.html"

    ];



    // ==================================================
    // PÁGINAS PARA USUARIO O ADMINISTRADOR
    // ==================================================

    const paginasConSesion = [

        "mascotas.html",

        "recomendaciones.html"

    ];



    // ==================================================
    // 1. PROTEGER PÁGINAS DEL ADMINISTRADOR
    // ==================================================

    if (

        paginasAdministrador.includes(paginaActual)

        &&

        rol !== "Administrador"

    ) {

        alert(
            "Acceso no autorizado. Esta sección es exclusiva para administradores."
        );


        window.location.replace(
            "index.html"
        );


        return;

    }



    // ==================================================
    // 2. PROTEGER PÁGINAS DEL USUARIO
    // ==================================================

    if (

        paginasUsuario.includes(paginaActual)

        &&

        rol !== "Usuario"

    ) {

        alert(
            "Debe iniciar sesión como usuario para acceder a esta sección."
        );


        window.location.replace(
            "login.html"
        );


        return;

    }



    // ==================================================
    // 3. PROTEGER PÁGINAS QUE NECESITAN SESIÓN
    // ==================================================

    if (

        paginasConSesion.includes(paginaActual)

        &&

        rol !== "Usuario"

        &&

        rol !== "Administrador"

    ) {

        alert(
            "Debe iniciar sesión para acceder a esta sección."
        );


        window.location.replace(
            "login.html"
        );


        return;

    }

})();