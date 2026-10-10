document.addEventListener("DOMContentLoaded", function () {

    cargarArticulos();

    const filtro =
        document.getElementById("filtroPublico");

    if (filtro) {

        filtro.addEventListener(
            "change",
            filtrarArticulos
        );

    }

});


// ======================================================
// RUTA DE LA API
// ======================================================

const API_URL =
    "https://localhost:7244/api/Blogs";


// ======================================================
// GUARDAR LOS ARTÍCULOS
// ======================================================

let articulos = [];


// ======================================================
// 1. CARGAR ARTÍCULOS
// ======================================================

function cargarArticulos() {

    fetch(API_URL)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "No se pudieron cargar los artículos"
                );

            }

            return response.json();

        })

        .then(function (data) {

            articulos = data;
            console.log(data);

            mostrarArticulos(articulos);

        })

        .catch(function (error) {

            console.error(
                "Error al cargar artículos:",
                error
            );

            document.getElementById(
                "listaArticulos"
            ).innerHTML = `

                <div class="formulario">

                    <p>
                        No se pudieron cargar los artículos.
                    </p>

                </div>

            `;

        });

}


// ======================================================
// 2. MOSTRAR ARTÍCULOS
// ======================================================

function mostrarArticulos(lista) {

    const contenedor =
        document.getElementById(
            "listaArticulos"
        );


    contenedor.innerHTML = "";


    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="formulario">

                <p>
                    No hay artículos disponibles.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(function (articulo) {


        const idArticulo =
            articulo.idBlog
            || articulo.idPublicacion
            || articulo.id;


        const titulo =
            articulo.titulo || "";


        const contenido =
            articulo.contenido || "";


        const fecha =
            articulo.fechaPublicacion
            || articulo.fecha
            || "";

const tipo =
    articulo.categoria || "General";


        const tituloVisible =
            limpiarTitulo(titulo);


        const imagen =
            "img/blog/blog-"
            + idArticulo
            + ".webp";


        contenedor.innerHTML += `

            <article class="formulario">


                <!-- FOTO -->

                <div
                    style="
                        width: 100%;
                        max-width: 700px;
                        height: 350px;
                        margin: 0 auto 25px auto;
                        overflow: hidden;
                        border-radius: 10px;
                    "
                >


                    <img
                        src="${imagen}"
                        alt="${tituloVisible}"
                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='flex';
                        "
                        style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        "
                    >


                    <div
                        style="
                            width: 100%;
                            height: 100%;
                            display: none;
                            align-items: center;
                            justify-content: center;
                            background: #eeeeee;
                            color: #666666;
                        "
                    >

                        Sin imagen

                    </div>


                </div>


                <!-- TÍTULO -->

                <h2
                    style="
                        text-align: center;
                        color: #137333;
                    "
                >

                    ${tituloVisible}

                </h2>


                <!-- TEMA -->

                <p style="text-align: center;">

                    <strong>
                        Tema:
                    </strong>

                    ${tipo}

                </p>


                <!-- FECHA -->

                <p style="text-align: center;">

                    <strong>
                        Fecha de publicación:
                    </strong>

                    ${formatearFecha(fecha)}

                </p>


                <hr>


                <!-- CONTENIDO -->

                <div
                    style="
                        line-height: 1.8;
                        margin-top: 30px;
                    "
                >

                    ${formatearContenido(contenido)}

                </div>


            </article>

        `;

    });

}


// ======================================================
// 3. FILTRAR ARTÍCULOS
// ======================================================
function filtrarArticulos() {

    const filtro =
        document.getElementById("filtroPublico").value;


    if (filtro == "Todos") {

        mostrarArticulos(articulos);

        return;

    }


    const filtrados =
        articulos.filter(function (articulo) {

          console.log("BD:", articulo.categoria);
console.log("Filtro:", filtro);

return articulo.categoria === filtro;

        });


    mostrarArticulos(filtrados);

}


// ======================================================
// 4. OBTENER TIPO
// ======================================================

function obtenerTipoArticulo(titulo) {

    const texto =
        String(titulo || "").toUpperCase();


    if (texto.includes("[MASCOTA]")) {

        return "Mascota";

    }


    if (texto.includes("[HUMANO]")) {

        return "Humano";

    }


    return "General";

}


// ======================================================
// 5. LIMPIAR EL TÍTULO
// ======================================================

function limpiarTitulo(titulo) {

    return String(titulo || "")

        .replace(
            /\[MASCOTA\]/gi,
            ""
        )

        .replace(
            /\[HUMANO\]/gi,
            ""
        )

        .replace(
            /\[GENERAL\]/gi,
            ""
        )

        .trim();

}


// ======================================================
// 6. FORMATEAR FECHA
// ======================================================

function formatearFecha(fecha) {

    if (!fecha) {

        return "";

    }


    const fechaCorta =
        String(fecha).substring(0, 10);


    const partes =
        fechaCorta.split("-");


    if (partes.length !== 3) {

        return fecha;

    }


    return (

        partes[2]
        + "/"
        + partes[1]
        + "/"
        + partes[0]

    );

}


// ======================================================
// 7. FORMATEAR CONTENIDO Y SUBTÍTULOS
// ======================================================

function formatearContenido(contenido) {

    if (!contenido) {

        return "";

    }


    const lineas =
        String(contenido).split(/\r?\n/);


    return lineas

        .map(function (linea) {

            const texto =
                linea.trim();


            // LÍNEA VACÍA

            if (texto === "") {

                return "";

            }


            // SUBTÍTULO QUE EMPIEZA POR ##

            if (texto.startsWith("## ")) {

                const subtitulo =
                    texto.substring(3);


                return `

                    <h3
                        style="
                            font-size: 22px;
                            font-weight: bold;
                            color: #137333;
                            margin-top: 35px;
                            margin-bottom: 15px;
                            text-align: left;
                        "
                    >

                        ${subtitulo}

                    </h3>

                `;

            }


            // PÁRRAFO NORMAL

            return `

                <p
                    style="
                        text-align: justify;
                        margin-bottom: 18px;
                        line-height: 1.8;
                    "
                >

                    ${texto}

                </p>

            `;

        })

        .join("");

}