document.addEventListener("DOMContentLoaded", function () {

    mostrarInicio();

});


// ======================================================
// MOSTRAR EL INICIO SEGÚN EL ROL
// ======================================================

function mostrarInicio() {

    const contenido =
        document.querySelector("main");


    if (!contenido) {

        return;

    }


    const rol =
        localStorage.getItem("rol");


    const nombre =
        localStorage.getItem("nombreSesion") || "";


    // VISITANTE

    if (!rol) {

        mostrarInicioVisitante(contenido);

        return;

    }


    // USUARIO

    if (rol === "Usuario") {

        mostrarInicioUsuario(
            contenido,
            nombre
        );

        return;

    }


    // ADMINISTRADOR

    if (rol === "Administrador") {

        mostrarInicioAdministrador(
            contenido,
            nombre
        );

        return;

    }


    // SI EXISTE UN ROL EXTRAÑO

    mostrarInicioVisitante(contenido);

}



// ======================================================
// INICIO DEL VISITANTE
// ======================================================

function mostrarInicioVisitante(contenido) {

    contenido.innerHTML = `

        <section class="formulario">


            <h2 class="titulo-seccion">

                Bienvenido a VidaFit Market

            </h2>


            <p
                style="
                    text-align: center;
                    font-size: 18px;
                    line-height: 1.7;
                "
            >

                Bienestar, nutrición y recomendaciones
                para personas y mascotas.

            </p>


            <p
                style="
                    text-align: center;
                    line-height: 1.7;
                    margin-top: 15px;
                "
            >

                Conoce nuestros productos,
                consulta información sobre nutrición
                y bienestar y descubre las opciones
                disponibles en nuestra plataforma.

            </p>


            <div
                style="
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-top: 25px;
                "
            >


                <button
                    type="button"
                    onclick="
                        window.location.href='catalogo.html'
                    "
                >

                    Ver catálogo

                </button>


                <button
                    type="button"
                    onclick="
                        window.location.href='blogpublico.html'
                    "
                >

                    Leer blog

                </button>


                <button
                    type="button"
                    onclick="
                        window.location.href='login.html'
                    "
                >

                    Iniciar sesión

                </button>


            </div>


        </section>

    `;

}



// ======================================================
// INICIO DEL USUARIO
// ======================================================


    contenido,
    nombre

function mostrarInicioUsuario(
    contenido,
    nombre
) {

    const nombreSeguro =
        escaparHTML(nombre);


    contenido.innerHTML = `

        <section class="formulario bienvenida-usuario">


            <div class="bienvenida-logo">

                <img
                    src="img/logo/logo.png"
                    alt="Logo de VidaFit Market"
                >

            </div>


            <p class="bienvenida-etiqueta">

                MI CUENTA

            </p>


            <h2 class="titulo-seccion bienvenida-titulo">

                ¡Bienvenido, ${nombreSeguro}!

            </h2>


            <p class="bienvenida-mensaje">

                Nos alegra tenerte en VidaFit Market.

            </p>


            <p class="bienvenida-descripcion">

                Consulta productos, administra tus mascotas,
                recibe recomendaciones personalizadas y revisa
                el estado de tus compras desde un solo lugar.

            </p>


            <div class="bienvenida-servicios">

<a
    href="recomendaciones.html"
    class="bienvenida-servicio bienvenida-enlace"
>

    <span class="bienvenida-icono">
        ✨
    </span>

    <h3>
        Recomendaciones
    </h3>

    <p>
        Descubre opciones para personas y mascotas
        según sus necesidades y características.
    </p>

    <span class="bienvenida-accion">
        Ver recomendaciones →
    </span>

</a>
               
               <a
    href="mascotas.html"
    class="bienvenida-servicio bienvenida-enlace"
>

    <span class="bienvenida-icono">
        🐾
    </span>

    <h3>
        Mis mascotas
    </h3>

    <p>
        Registra, consulta y administra
        la información de tus mascotas.
    </p>

    <span class="bienvenida-accion">
        Gestionar mis mascotas →
    </span>

</a>

               <a
    href="mispedidos.html"
    class="bienvenida-servicio bienvenida-enlace"
>

    <span class="bienvenida-icono">
        📦
    </span>

    <h3>
        Mis pedidos
    </h3>

    <p>
        Consulta tus compras y revisa
        el estado de cada pedido.
    </p>

    <span class="bienvenida-accion">
        Ver mis pedidos →
    </span>

</a>

            </div>


            <p class="bienvenida-indicacion">

                Utiliza el menú superior para ingresar
                a las diferentes secciones de tu cuenta.

            </p>


        </section>

    `;

}


// ======================================================
// INICIO DEL ADMINISTRADOR
// ======================================================

function mostrarInicioAdministrador(
    contenido,
    nombre
) {

    const nombreSeguro =
        escaparHTML(nombre);


    contenido.innerHTML = `

        <section class="formulario">


            <h2 class="titulo-seccion">

                Panel de Administración

            </h2>


            <p
                style="
                    text-align: center;
                    font-size: 20px;
                    line-height: 1.7;
                    margin-top: 20px;
                "
            >

                Bienvenido, ${nombreSeguro}.

            </p>


            <p
                style="
                    text-align: center;
                    font-size: 17px;
                    line-height: 1.7;
                    margin-top: 15px;
                "
            >

                Desde el menú superior puedes gestionar
                las diferentes áreas de VidaFit Market.

            </p>


            <p
                style="
                    text-align: center;
                    line-height: 1.7;
                    margin-top: 20px;
                "
            >

                Administra usuarios, productos, mascotas,
                pedidos, recomendaciones y publicaciones
                desde las opciones disponibles en el menú.

            </p>


        </section>

    `;

}



// ======================================================
// PROTEGER EL NOMBRE MOSTRADO
// ======================================================

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        String(texto || "");


    return elemento.innerHTML;

}