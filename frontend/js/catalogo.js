document.addEventListener("DOMContentLoaded", () => {

    cargarProductos();

    const filtroTipo =
        document.getElementById("filtroTipo");

    const filtroCategoria =
        document.getElementById("filtroCategoria");

    if (filtroTipo) {
        filtroTipo.addEventListener(
            "change",
            () => {
                actualizarCategoriasPorTipo();
                filtrarProductos();
            }
        );
    }

    if (filtroCategoria) {
        filtroCategoria.addEventListener(
            "change",
            filtrarProductos
        );
    }

    actualizarCategoriasPorTipo();

});

// ======================================================
// API PRODUCTOS
// ======================================================

const API_URL =
    "https://localhost:7244/api/Productos";


// ======================================================
// CARRITO
// ======================================================

const CLAVE_CARRITO =
    "carritoVidaFit";


// ======================================================
// VARIABLES
// ======================================================

let productos = [];


// ======================================================
// CARGAR PRODUCTOS
// ======================================================

function cargarProductos() {


    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Error al consultar productos"
                );

            }

            return response.json();

        })

        .then(data => {

            productos = data;

            mostrarProductos(
                productos
            );

        })

        .catch(error => {

            console.error(error);

            document.getElementById(
                "listaProductos"
            ).innerHTML = `

            <p>
                No se pudieron cargar los productos.
            </p>

            `;

        });

}



// ======================================================
// MOSTRAR PRODUCTOS
// ======================================================

function mostrarProductos(listaProductos) {


    const contenedor =
        document.getElementById(
            "listaProductos"
        );


    contenedor.innerHTML = "";


    listaProductos.forEach(producto => {


        const disponible =
            Number(producto.stock) > 0;


        const estadoStock =
            disponible
            ? "Disponible"
            : "Agotado";


        const imagen =
            obtenerImagenProducto(
                producto.nombre
            );


        contenedor.innerHTML += `


        <section class="formulario">


            <img
                src="${imagen}"
                alt="${producto.nombre}"
                onerror="this.src='img/sin-imagen.jpg'"
                style="
                width:220px;
                height:220px;
                object-fit:contain;
                display:block;
                margin:auto;
                ">


            <h2>
                ${producto.nombre}
            </h2>


            <p>
                <strong>Tipo:</strong>
                ${producto.tipoUsuario}
            </p>


            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>


            <p>
                <strong>Precio:</strong>
                ${formatearPrecio(
                    producto.precio
                )}
            </p>


            <button
    type="button"
    onclick="alternarDetalles(${producto.idProducto}, this)"
>
    Ver detalles
</button>

<div
    id="detalle-${producto.idProducto}"
    style="display: none;"
>
    <p>
        <strong>Descripción:</strong>
        ${producto.descripcion}
    </p>

    <p>
        <strong>Beneficio:</strong>
        ${producto.beneficio}
    </p>
</div>


            <p>
                <strong>Disponibilidad:</strong>
                ${estadoStock}
            </p>


            ${
                disponible

                ?

                `
                <button
                type="button"
                onclick="agregarAlCarrito(${producto.idProducto})">

                Agregar al carrito

                </button>
                `

                :

                `
                <button disabled>
                Producto agotado
                </button>
                `

            }


        </section>


        `;


    });


}

function alternarDetalles(idProducto, boton) {

    const detalle =
        document.getElementById(`detalle-${idProducto}`);

    if (!detalle) {
        return;
    }

    if (detalle.style.display === "none") {

        detalle.style.display = "block";
        boton.textContent = "Ocultar detalles";

    } else {

        detalle.style.display = "none";
        boton.textContent = "Ver detalles";

    }
}

// ======================================================
// IMÁGENES DE PRODUCTOS
// ======================================================

function obtenerImagenProducto(nombreProducto) {


    const nombre =
        normalizar(nombreProducto);



    if(nombre.includes("higado fortificado")) {

        return "img/productos/higado-fortificado.jpg";

    }


    if(nombre.includes("supdogs")) {

        return "img/productos/supdogs-500g.jpg";

    }


    if(nombre.includes("petmed")) {

        return "img/productos/petmed-piel-pelo.jpg";

    }


    if(nombre.includes("omega 3")) {

        return "img/productos/omega-3.jpg";

    }


    if(nombre.includes("fish oil")) {

        return "img/productos/fish-oil-250ml.jpg";

    }


    if(nombre.includes("triple-omega")) {

        return "img/productos/triple-omega.jpg";

    }
    if(nombre.includes("mungos")) {

    return "img/productos/mungos-vital-probiotic.jpg";

}
if(nombre.includes("amigo")) {

    return "img/productos/amigo-prebioticos-probioticos.jpg";

}


    if(nombre.includes("gummies")) {

        return "img/productos/gummies-probiotics.jpg";

    }


    if(nombre.includes("vegan protein")) {

        return "img/productos/vegan-protein.jpg";

    }


    if(
        nombre.includes("creatina") ||
        nombre.includes("creatine")
    ){

        return "img/productos/creatine-360g.jpg";

    }
    if (nombre.includes("petbond")) {

    return "img/productos/petbond-500g.jpg";

}
if (nombre.includes("gummies")) {

    return "img/productos/gummies-probiotics.jpg";

}

if (nombre.includes("vegan protein")) {

    return "img/productos/vegan-protein.jpg";

}
if (nombre.includes("fish omega")) {

    return "img/productos/fish-omega-humano.jpg";

}
if (nombre.includes("collagen")) {

    return "img/productos/collagen-biotin.jpg";

}
if (nombre.includes("potassium")) {

    return "img/productos/potassium-citrate.jpg";

}

if (nombre.includes("slendar")) {

    return "img/productos/premium-slendar.jpg";

}
if (
    nombre.includes("creatina") ||
    nombre.includes("creatine")
) {

    return "img/productos/creatine-360g.jpg";

}
if (nombre.includes("melena de leon")) {
    return "img/productos/melena-de-leon.jpg";
}if(nombre.includes("multimn")) {
    return "img/productos/multimn.jpg";
}
return "img/sin-imagen.jpg";

}

// ======================================================
// FILTRAR PRODUCTOS
// ======================================================
function actualizarCategoriasPorTipo() {

    const filtroTipo =
        document.getElementById("filtroTipo");

    const filtroCategoria =
        document.getElementById("filtroCategoria");

    if (!filtroTipo || !filtroCategoria) {
        return;
    }

    const tipoSeleccionado = filtroTipo.value;

    if (tipoSeleccionado === "Mascota") {

        filtroCategoria.innerHTML = `
            <option value="Todos">
                Todas las categorías
            </option>

            <option value="Vitaminas">
                Vitaminas y minerales
            </option>

            <option value="Omegas">
                Omegas
            </option>

            <option value="Probioticos">
                Probióticos y prebióticos
            </option>

            <option value="Bienestar">
                Bienestar general
            </option>
        `;

        filtroCategoria.size = 5;

    } else {

        filtroCategoria.innerHTML = `
            <option value="Todos">
                Todas las categorías
            </option>

            <option value="Vitaminas">
                Vitaminas y minerales
            </option>

            <option value="Omegas">
                Omegas
            </option>

            <option value="Probioticos">
                Probióticos y prebióticos
            </option>

            <option value="Proteinas">
                Proteínas
            </option>

            <option value="Creatina">
                Creatina
            </option>

            <option value="Colagenos">
                Colágenos
            </option>

            <option value="Bienestar">
                Bienestar general
            </option>
        `;

        filtroCategoria.size = 8;
    }
}
function filtrarProductos() {

    const filtroTipo =
        document.getElementById("filtroTipo").value;

    const filtroCategoria =
        document.getElementById("filtroCategoria").value;

    const productosFiltrados =
        productos.filter(producto => {

            const coincideTipo =
                filtroTipo === "Todos" ||
                normalizar(producto.tipoUsuario) ===
                normalizar(filtroTipo);

            const categoriaProducto =
               obtenerCategoriaProducto(producto);
            const coincideCategoria =
                filtroCategoria === "Todos" ||
                categoriaProducto === filtroCategoria;

            return coincideTipo && coincideCategoria;

        });

    mostrarProductos(productosFiltrados);
}

function obtenerCategoriaProducto(producto) {

    const texto = normalizar(
        `${producto.nombre || ""} ${producto.categoria || ""}`
    );

    if (
        texto.includes("potassium") ||
        texto.includes("higado fortificado") ||
        texto.includes("supdogs") ||
        texto.includes("minerales") ||
        texto.includes("multivitamin")
    ) {
        return "Vitaminas";
    }

    if (
        texto.includes("omega") ||
        texto.includes("fish oil") ||
        texto.includes("aceite de pescado")
    ) {
        return "Omegas";
    }

    if (
        texto.includes("probiotic") ||
        texto.includes("probiotico") ||
        texto.includes("prebiotico") ||
        texto.includes("mungos") ||
        texto.includes("amigo") ||
        texto.includes("gummies") ||
        texto.includes("petbond")
    ) {
        return "Probioticos";
    }

    if (
        texto.includes("vegan protein") ||
        texto.includes("slendar") ||
        texto.includes("proteina vegetal") ||
        texto.includes("proteina deportiva")
    ) {
        return "Proteinas";
    }

    if (
        texto.includes("creatine") ||
        texto.includes("creatina")
    ) {
        return "Creatina";
    }

    if (
        texto.includes("collagen") ||
        texto.includes("colageno")
    ) {
        return "Colagenos";
    }

   if (
    texto.includes("melena de leon") ||
    texto.includes("petmed")
) {
    return "Bienestar";
}
}


// ======================================================
// AGREGAR AL CARRITO
// ======================================================

function agregarAlCarrito(idProducto) {


    const producto =
        productos.find(producto =>

            Number(producto.idProducto)

            ===

            Number(idProducto)

        );


    if (!producto) {


        alert(
            "No se encontró el producto."
        );


        return;

    }



    if (
        Number(producto.stock) <= 0
    ) {


        alert(
            "Producto agotado."
        );


        return;

    }



    let carrito =
        obtenerCarrito();



    const existe =
        carrito.find(item =>

            Number(item.idProducto)

            ===

            Number(idProducto)

        );



    if (existe) {


        if (
            existe.cantidad
            >=
            Number(producto.stock)
        ) {


            alert(
                "No hay más unidades disponibles."
            );


            return;

        }



        existe.cantidad++;


    }

    else {


        carrito.push({

            idProducto:
                producto.idProducto,


            nombre:
                producto.nombre,


            precio:
                Number(producto.precio),


            cantidad:
                1,


            stock:
                Number(producto.stock),


            imagen:
                obtenerImagenProducto(
                    producto.nombre
                )

        });


    }



    guardarCarrito(
        carrito
    );


    mostrarMensajeCarrito(
        producto.nombre
    );


}



// ======================================================
// OBTENER CARRITO
// ======================================================

function obtenerCarrito() {


    const carrito =
        localStorage.getItem(
            CLAVE_CARRITO
        );


    if (!carrito) {

        return [];

    }


    return JSON.parse(
        carrito
    );


}



// ======================================================
// GUARDAR CARRITO
// ======================================================

function guardarCarrito(carrito) {


    localStorage.setItem(

        CLAVE_CARRITO,

        JSON.stringify(
            carrito
        )

    );


}



// ======================================================
// MENSAJE CARRITO
// ======================================================

function mostrarMensajeCarrito(nombreProducto) {


    const mensaje =
        document.getElementById(
            "mensajeCarrito"
        );


    if (!mensaje) {

        return;

    }


    const texto =
        document.getElementById(
            "textoMensajeCarrito"
        );


    if(texto){

        texto.textContent =
            nombreProducto
            +
            " fue agregado al carrito.";

    }


    mensaje.style.display =
        "block";


}



// ======================================================
// NORMALIZAR TEXTO
// ======================================================

function normalizar(texto) {


    return String(texto || "")

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .toLowerCase();


}



// ======================================================
// FORMATO PRECIO
// ======================================================

function formatearPrecio(precio) {


    return new Intl.NumberFormat(
        "es-CO",
        {

            style:
                "currency",

            currency:
                "COP",

            minimumFractionDigits:
                0

        }

    ).format(
        Number(precio || 0)
    );


}
// ======================================================
// OCULTAR MENSAJE DEL CARRITO
// ======================================================

function cerrarMensajeCarrito() {


    const mensaje =
        document.getElementById(
            "mensajeCarrito"
        );


    if (mensaje) {

        mensaje.style.display =
            "none";

    }

}



// ======================================================
// IR AL CARRITO
// ======================================================

function irCarrito() {


    window.location.href =
        "carrito.html";


}



// ======================================================
// LIMPIAR CARRITO
// ======================================================

function limpiarCarrito() {


    localStorage.removeItem(
        CLAVE_CARRITO
    );


}



// ======================================================
// FORMATO TEXTO SEGURO
// ======================================================

function escaparTexto(texto) {


    return String(texto || "")

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        );

}



// ======================================================
// MOSTRAR PRODUCTOS SI NO EXISTEN
// ======================================================

function verificarProductos() {


    if (
        !productos ||
        productos.length === 0
    ) {


        const contenedor =
            document.getElementById(
                "listaProductos"
            );


        if (contenedor) {


            contenedor.innerHTML = `

            <p>

                No hay productos disponibles.

            </p>

            `;


        }


    }


}

