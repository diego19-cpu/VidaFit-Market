document.addEventListener("DOMContentLoaded", function () {

    prepararMenu();

});


// ======================================================
// 1. PREPARAR EL MENÚ AUTOMÁTICAMENTE
// ======================================================

function prepararMenu() {

    const header =
        document.querySelector("header");


    // SI LA PÁGINA NO TIENE ENCABEZADO

    if (!header) {

        return;

    }


    let menu =
        document.getElementById(
            "menuPrincipal"
        );


    // SI NO EXISTE menuPrincipal,
    // BUSCAR UN MENÚ VIEJO

    if (!menu) {

        menu =
            header.querySelector("nav");

    }


    // SI EXISTE UN MENÚ VIEJO,
    // CONVERTIRLO EN EL MENÚ PRINCIPAL

    if (menu) {

        menu.id =
            "menuPrincipal";

    }


    // SI NO EXISTE NINGÚN MENÚ,
    // CREARLO AUTOMÁTICAMENTE

    if (!menu) {

        menu =
            document.createElement("nav");


        menu.id =
            "menuPrincipal";


        header.appendChild(menu);

    }


    crearMenu(menu);

}



// ======================================================
// 2. CREAR MENÚ SEGÚN EL ROL
// ======================================================

function crearMenu(menu) {

    const rol =
        localStorage.getItem("rol");



    // ==================================================
    // VISITANTE
    // ==================================================

    if (!rol) {

        menu.innerHTML = `
      
        

          <a  href="inicio.html"

                Inicio

            </a>


            <a href="catalogo.html">

                Catálogo

            </a>


            <a href="blogpublico.html">

                Blog

            </a>

<a href="acerca-de-vidafit.html">
    Acerca de VidaFit Market
</a>
            <a href="registro.html">

                Registrarse

            </a>


            <a href="login.html">

                Iniciar sesión

            </a>

        `;


        return;

    }



    // ==================================================
    // USUARIO
    // ==================================================

    if (rol === "Usuario") {

        menu.innerHTML = `

            <a href="index.html">

                Inicio

            </a>


            <a href="catalogo.html">

                Catálogo

            </a>


            <a href="recomendaciones.html">

                Recomendaciones

            </a>


            <a href="mascotas.html">

                Mis Mascotas

            </a>


            <a href="carrito.html">

                Carrito

            </a>


            <a href="mispedidos.html">

                Mis Pedidos

            </a>


            <a href="blogpublico.html">

                Blog

            </a>
<a href="acerca-de-vidafit.html">
    Acerca de VidaFit Market
</a>

            <a
                href="#"
                onclick="
                    cerrarSesion();
                    return false;
                "
            >

                Cerrar sesión

            </a>

        `;


        return;

    }



    // ==================================================
    // ADMINISTRADOR
    // ==================================================

    if (rol === "Administrador") {

        menu.innerHTML = `

            <a href="index.html">

                Inicio

            </a>
            <a href="devoluciones.html">

    Devoluciones

</a>


            <a href="administradores.html">

                Administradores

            </a>


            <a href="usuarios.html">

                Usuarios

            </a>


            <a href="productos.html">

                Productos

            </a>


            <a href="mascotas.html">

                Mascotas

            </a>


            <a href="pedidos.html">

                Pedidos

            </a>
<a href="reportes.html">

    Reportes

</a>

            <a href="recomendaciones.html">

                Recomendaciones

            </a>


            <a href="blog.html">

                Blog

            </a>
<a href="acerca-de-vidafit.html">
    Acerca de VidaFit Market
</a>

       <a
    href="#"
    onclick="
        cerrarSesion();
        return false;
    "
>

    Salir

</a>

        `;


        return;

    }



    // ==================================================
    // SI EXISTE UN ROL INCORRECTO
    // ==================================================

    localStorage.removeItem("rol");

    window.location.href =
        "index.html";

}



// ======================================================
// 3. CERRAR SESIÓN
// ======================================================

function cerrarSesion() {

    localStorage.removeItem("rol");

    localStorage.removeItem("idAdmin");

    localStorage.removeItem("idUsuario");

    localStorage.removeItem("nombreSesion");

    localStorage.removeItem("correoSesion");


    window.location.href =
        "login.html";

}

