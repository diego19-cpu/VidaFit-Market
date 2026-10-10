// ======================================================
// CARRITO FLOTANTE CON CONTADOR
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    crearCarritoFlotante();

    actualizarContadorCarrito();

    // Revisar automáticamente si cambia el carrito
    setInterval(
        actualizarContadorCarrito,
        500
    );

});


// ======================================================
// CREAR EL CARRITO ARRIBA A LA DERECHA
// ======================================================

function crearCarritoFlotante() {
    const rol = localStorage.getItem("rol");

if (rol !== "Usuario") {
    return;
}

    // Evitar crear el carrito dos veces
    if (
        document.getElementById(
            "carritoFlotante"
        )
    ) {
        return;
    }


    const enlaceCarrito =
        document.createElement("a");


    enlaceCarrito.id =
        "carritoFlotante";


    enlaceCarrito.className =
        "carrito-flotante";


    enlaceCarrito.href =
        "carrito.html";


    enlaceCarrito.title =
        "Ver carrito";


    enlaceCarrito.innerHTML = `

        <span class="icono-carrito">
            🛒
        </span>

        <span
            id="contadorCarrito"
            class="contador-carrito"
            style="display: none;"
        >
            0
        </span>

    `;


    document.body.appendChild(
        enlaceCarrito
    );

}


// ======================================================
// ACTUALIZAR EL NÚMERO DEL CARRITO
// ======================================================

function actualizarContadorCarrito() {

    const contador =
        document.getElementById(
            "contadorCarrito"
        );


    if (!contador) {
        return;
    }


    let carrito = [];


    try {

        const carritoGuardado =
            localStorage.getItem(
                "carritoVidaFit"
            );


        if (carritoGuardado) {

            carrito =
                JSON.parse(
                    carritoGuardado
                );

        }

    } catch (error) {

        console.error(
            "No se pudo leer el carrito:",
            error
        );

        carrito = [];

    }


    if (!Array.isArray(carrito)) {

        carrito = [];

    }


    const totalUnidades =
        carrito.reduce(
            function (total, producto) {

                const cantidad =
                    Number(
                        producto.cantidad
                    ) || 0;


                return total + cantidad;

            },
            0
        );


    contador.textContent =
        totalUnidades;


    if (totalUnidades > 0) {

        contador.style.display =
            "flex";

    } else {

        contador.style.display =
            "none";

    }

}