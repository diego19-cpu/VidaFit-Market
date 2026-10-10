// ======================================================
// BOTÓN FLOTANTE DE WHATSAPP
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    crearBotonWhatsApp();

});


function crearBotonWhatsApp() {

    // Evitar que el botón se cree dos veces
    if (document.getElementById("botonWhatsApp")) {
        return;
    }

    const numeroWhatsApp = "573232894181";

    const mensaje =
        "Hola, necesito información sobre VidaFit Market.";

    const boton =
        document.createElement("a");

    boton.id =
        "botonWhatsApp";

    boton.className =
        "boton-whatsapp";

    boton.href =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    boton.target =
        "_blank";

    boton.rel =
        "noopener noreferrer";

    boton.title =
        "Contactar por WhatsApp";

    boton.setAttribute(
        "aria-label",
        "Contactar a VidaFit Market por WhatsApp"
    );

    boton.innerHTML = `

        <span class="icono-whatsapp">
            💬
        </span>

        <span class="texto-whatsapp">
            Contáctanos
        </span>

    `;

    document.body.appendChild(boton);

}