document.addEventListener("DOMContentLoaded", () => {
const idUsuarioSesion = localStorage.getItem("idUsuario");

document.getElementById("idUsuario").value = idUsuarioSesion;

    cargarUsuarios();


    const formulario =
        document.getElementById("formRecomendacion");


    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        generarRecomendacion();

    });


    document
        .getElementById("tipoRecomendacion")
        .addEventListener(
            "change",
            cambiarTipoRecomendacion
        );


    document
        .getElementById("idUsuario")
        .addEventListener(
            "change",
            cargarMascotasUsuario
        );


    document
        .getElementById("idMascota")
        .addEventListener(
            "change",
            mostrarNecesidad
        );


});



// ======================================================
// RUTAS DE LAS API
// ======================================================

const API_URL =
    "https://localhost:7244/api/Recomendacions";


const API_USUARIOS =
    "https://localhost:7244/api/Usuarios";


const API_MASCOTAS =
    "https://localhost:7244/api/Mascotas";


const API_PRODUCTOS =
    "https://localhost:7244/api/Productos";



// ======================================================
// VARIABLES
// ======================================================

let usuarios = [];

let mascotas = [];

let productos = [];



// ======================================================
// 1. CARGAR USUARIOS
// ======================================================
function cargarUsuarios() {

    const idUsuarioSesion = localStorage.getItem("idUsuario") || localStorage.getItem("idAdmin");

    const select = document.getElementById("idUsuario");


    if (!idUsuarioSesion) {

        console.error("No existe usuario iniciado");

        return;

    }


    fetch(API_USUARIOS)

        .then(response => response.json())

        .then(data => {


            usuarios = data;


            const usuarioActual = usuarios.find(
                usuario => usuario.idUsuario == idUsuarioSesion
            );


            select.innerHTML = "";


            if(usuarioActual){

                select.innerHTML = `

                    <option value="${usuarioActual.idUsuario}" selected>

                        ${usuarioActual.nombre}
                        ${usuarioActual.apellido}

                    </option>

                `;

            }


            cargarMascotas();


        })

        .catch(error => {

            console.error(
                "Error al cargar usuario:",
                error
            );

        });

}


// ======================================================
// 2. CARGAR MASCOTAS
// ======================================================

// ======================================================
// 2. CARGAR MASCOTAS
// ======================================================

function cargarMascotas() {


    const idUsuarioSesion =
        localStorage.getItem("idUsuario");


    fetch(API_MASCOTAS)


        .then(response => response.json())


        .then(data => {


            mascotas = data.filter(
                mascota =>
                mascota.idUsuario == idUsuarioSesion
            );

cargarMascotasUsuario();
            cargarProductos();


        })


        .catch(error => {


            console.error(
                "Error al cargar mascotas:",
                error
            );


        });


}



// ======================================================
// 3. CARGAR PRODUCTOS
// ======================================================

function cargarProductos() {


    fetch(API_PRODUCTOS)


        .then(response => response.json())


        .then(data => {


            productos = data;


            cargarRecomendaciones();


        })


        .catch(error => {


            console.error(
                "Error al cargar productos:",
                error
            );


        });


}



// ======================================================
// 4. CAMBIAR HUMANO O MASCOTA
// ======================================================

function cambiarTipoRecomendacion() {


    const tipo =
        document.getElementById(
            "tipoRecomendacion"
        ).value;


    if (tipo === "Humano") {


        document.getElementById(
            "camposHumano"
        ).style.display = "block";


        document.getElementById(
            "camposMascota"
        ).style.display = "none";


    }


    else {


        document.getElementById(
            "camposHumano"
        ).style.display = "none";


        document.getElementById(
            "camposMascota"
        ).style.display = "block";


        cargarMascotasUsuario();


    }


}



// ======================================================
// 5. CARGAR MASCOTAS DEL USUARIO
// ======================================================

function cargarMascotasUsuario() {


    const idUsuario =
        document.getElementById(
            "idUsuario"
        ).value;


    const select =
        document.getElementById(
            "idMascota"
        );


    select.innerHTML = `

        <option value="">

            Seleccione una mascota

        </option>

    `;


    document.getElementById(
        "necesidad"
    ).value = "";


    if (idUsuario === "") {

        return;

    }


    const mascotasUsuario =
        mascotas.filter(mascota =>

            Number(mascota.idUsuario)
            ===
            Number(idUsuario)

        );


    mascotasUsuario.forEach(mascota => {


        select.innerHTML += `

            <option value="${mascota.idMascota}">

                ${mascota.nombre}
                - ${mascota.raza}

            </option>

        `;


    });


}



// ======================================================
// 6. MOSTRAR NECESIDAD DE LA MASCOTA
// ======================================================

function mostrarNecesidad() {


    const idMascota =
        document.getElementById(
            "idMascota"
        ).value;


    const mascota =
        mascotas.find(mascota =>

            Number(mascota.idMascota)
            ===
            Number(idMascota)

        );


    if (mascota) {


        document.getElementById(
            "necesidad"
        ).value =
            mascota.necesidad;


    }


    else {


        document.getElementById(
            "necesidad"
        ).value = "";


    }


}



// ======================================================
// 7. GENERAR RECOMENDACIÓN
// ======================================================

function generarRecomendacion() {


    const idUsuario =
    localStorage.getItem("idUsuario");

    const tipo =
        document.getElementById(
            "tipoRecomendacion"
        ).value;


    if (idUsuario === "") {


        alert(
            "Seleccione un usuario."
        );


        return;


    }


    if (tipo === "Humano") {


        recomendarHumano(
            idUsuario
        );


    }


    else {


        recomendarMascota(
            idUsuario
        );


    }


}



// ======================================================
// 8. RECOMENDAR PARA HUMANO
// ======================================================

function recomendarHumano(idUsuario) {


    const objetivo =
        document.getElementById(
            "objetivo"
        ).value;


    const actividad =
        document.getElementById(
            "actividad"
        ).value;


    if (
        objetivo === ""
        ||
        actividad === ""
    ) {


        alert(
            "Seleccione objetivo y actividad."
        );


        return;


    }


    const palabras =
        obtenerPalabrasHumano(
            objetivo,
            actividad
        );


    const producto =
        buscarMejorProducto(
            "Humano",
            palabras
        );


    if (!producto) {


        alert(
            "No se encontró un producto disponible."
        );


        return;


    }


    const recomendacion = {


        idRecomendacion: 0,


        idUsuario:
            parseInt(idUsuario),


        idMascota:
            null,


        idProducto:
            producto.idProducto,


        objetivo:
            objetivo,


        actividad:
            actividad,


        necesidad:
            ""


    };


    guardarRecomendacion(
        recomendacion,
        producto
    );


}



// ======================================================
// 9. RECOMENDAR PARA MASCOTA
// ======================================================

function recomendarMascota(idUsuario) {


    const idMascota =
        document.getElementById(
            "idMascota"
        ).value;


    const necesidad =
        document.getElementById(
            "necesidad"
        ).value;


    if (idMascota === "") {


        alert(
            "Seleccione una mascota."
        );


        return;


    }


    const palabras =
        obtenerPalabrasMascota(
            necesidad
        );


    const producto =
        buscarMejorProducto(
            "Mascota",
            palabras
        );


    if (!producto) {


        alert(
            "No se encontró un producto disponible."
        );


        return;


    }


    const recomendacion = {


        idRecomendacion: 0,


        idUsuario:
            parseInt(idUsuario),


        idMascota:
            parseInt(idMascota),


        idProducto:
            producto.idProducto,


        objetivo:
            "",


        actividad:
            "",


        necesidad:
            necesidad


    };


    guardarRecomendacion(
        recomendacion,
        producto
    );


}



// ======================================================
// 10. PALABRAS PARA HUMANO
// ======================================================

function obtenerPalabrasHumano(
    objetivo,
    actividad
) {


    let palabras = [];


    if (
        objetivo
        ===
        "Ganar masa muscular"
    ) {


        palabras = [

            "proteina",
            "masa muscular",
            "creatina",
            "aminoacidos",
            "fuerza"

        ];


    }


    if (
        objetivo
        ===
        "Recuperación física"
    ) {


        palabras = [

            "recuperacion",
            "proteina",
            "creatina",
            "rendimiento",
            "aminoacidos"

        ];


    }


    if (
        objetivo
        ===
        "Salud digestiva"
    ) {


        palabras = [

            "probiotico",
            "microbiota",
            "digestiva",
            "digestion",
            "intestinal"

        ];


    }


    if (
        objetivo
        ===
        "Bienestar general"
    ) {


        palabras = [

            "bienestar",
            "omega 3",
            "colageno",
            "antioxidante",
            "salud"

        ];


    }


    if (
        objetivo
        ===
        "Vitaminas y minerales"
    ) {


        palabras = [

            "vitaminas",
            "minerales",
            "potasio",
            "zinc",
            "calcio",
            "hierro",
            "biotina"

        ];


    }


    if (
        objetivo
        ===
        "Fortalecimiento nutricional"
    ) {


        palabras = [

            "nutricional",
            "proteina",
            "vitaminas",
            "minerales",
            "omega",
            "aminoacidos"

        ];


    }



    // ACTIVIDAD ALTA

    if (actividad === "Alta") {


        palabras.push(

            "creatina",
            "fuerza",
            "rendimiento"

        );


    }



    // ACTIVIDAD MODERADA

    if (actividad === "Moderada") {


        palabras.push(

            "proteina",
            "recuperacion"

        );


    }



    // ACTIVIDAD BAJA

    if (actividad === "Baja") {


        palabras.push(

            "bienestar",
            "vitaminas"

        );


    }


    return palabras;


}



// ======================================================
// 11. PALABRAS PARA MASCOTA
// ======================================================

function obtenerPalabrasMascota(necesidad) {


    if (
        necesidad
        ===
        "Salud digestiva"
    ) {


        return [

            "digestiva",
            "digestion",
            "probioticos",
            "prebioticos",
            "microbiota",
            "intestinal"

        ];


    }


    if (
        necesidad
        ===
        "Piel y pelaje"
    ) {


        return [

            "piel",
            "pelaje",
            "pelo",
            "caspa",
            "brillo",
            "omega"

        ];


    }


    if (
        necesidad
        ===
        "Cuidado articular"
    ) {


        return [

            "articular",
            "articulaciones",
            "movilidad",
            "glucosamina",
            "huesos"

        ];


    }


    if (
        necesidad
        ===
        "Energía y vitalidad"
    ) {


        return [

            "energia",
            "vitalidad",
            "proteina",
            "vitamina b12"

        ];


    }


    if (
        necesidad
        ===
        "Fortalecimiento nutricional"
    ) {


        return [

            "nutricional",
            "proteina",
            "vitaminas",
            "minerales",
            "hierro",
            "zinc"

        ];


    }


    if (
        necesidad
        ===
        "Bienestar general"
    ) {


        return [

            "bienestar",
            "vitaminas",
            "minerales",
            "omega",
            "inmunologico"

        ];


    }


    if (
        necesidad
        ===
        "Control de peso"
    ) {


        return [

            "control de peso",
            "peso saludable",
            "saciedad"

        ];


    }


    return [];


}



// ======================================================
// 12. BUSCAR MEJOR PRODUCTO
// ======================================================

function buscarMejorProducto(
    tipoUsuario,
    palabras
) {


    const disponibles =
        productos.filter(producto =>

            normalizar(
                producto.tipoUsuario
            )
            ===
            normalizar(tipoUsuario)

            &&

            Number(producto.stock) > 0

        );


    let mejorProducto = null;

    let mayorPuntaje = 0;


    disponibles.forEach(producto => {


        const texto = normalizar(

            producto.nombre
            + " "
            + producto.categoria
            + " "
            + producto.descripcion
            + " "
            + producto.beneficio

        );


        let puntos = 0;


        palabras.forEach(palabra => {


            if (
                texto.includes(
                    normalizar(palabra)
                )
            ) {


                puntos++;


            }


        });


        if (puntos > mayorPuntaje) {


            mayorPuntaje = puntos;


            mejorProducto =
                producto;


        }


    });


    return mejorProducto;


}



// ======================================================
// 13. GUARDAR RECOMENDACIÓN
// ======================================================

function guardarRecomendacion(
    recomendacion,
    producto
) {


    fetch(
        API_URL,
        {


            method: "POST",


            headers: {


                "Content-Type":
                    "application/json"


            },


            body:
                JSON.stringify(
                    recomendacion
                )


        }
    )


        .then(response => {


            if (!response.ok) {


                throw new Error(
                    "Error al guardar la recomendación"
                );


            }


            return response.json();


        })


        .then(data => {


            alert(
                "Recomendación generada correctamente."
            );


            mostrarProducto(
                producto
            );


            cargarRecomendaciones();


        })


        .catch(error => {


            console.error(
                "Error:",
                error
            );


            alert(
                "Error al guardar la recomendación."
            );


        });


}



// ======================================================
// 14. MOSTRAR PRODUCTO
// ======================================================

function mostrarProducto(producto) {


    document.getElementById(
        "resultado"
    ).style.display = "block";


    document.getElementById(
        "nombreProducto"
    ).textContent =
        producto.nombre;


    document.getElementById(
        "categoriaProducto"
    ).textContent =
        producto.categoria;


    document.getElementById(
        "precioProducto"
    ).textContent =
        formatearPrecio(
            producto.precio
        );


    document.getElementById(
        "descripcionProducto"
    ).textContent =
        producto.descripcion;


    document.getElementById(
        "beneficioProducto"
    ).textContent =
        producto.beneficio;


    document.getElementById(
        "stockProducto"
    ).textContent =
        "Disponible";


}



// ======================================================
// 15. CARGAR RECOMENDACIONES
// ======================================================

function cargarRecomendaciones() {


    fetch(API_URL)


        .then(response => response.json())


        .then(recomendaciones => {

const idUsuarioSesion = localStorage.getItem("idUsuario");
const rol = localStorage.getItem("rol");

if (rol !== "Administrador") {

    recomendaciones = recomendaciones.filter(
        r => Number(r.idUsuario) === Number(idUsuarioSesion)
    );

}
            const tabla =
                document.getElementById(
                    "tablaRecomendaciones"
                );


            tabla.innerHTML = "";


            if (recomendaciones.length === 0) {


                tabla.innerHTML = `

                    <tr>

                        <td colspan="7">

                            No hay recomendaciones registradas.

                        </td>

                    </tr>

                `;


                return;


            }


            recomendaciones.forEach(
                recomendacion => {


                    const usuario =
                        usuarios.find(usuario =>

                            Number(
                                usuario.idUsuario
                            )
                            ===
                            Number(
                                recomendacion.idUsuario
                            )

                        );


                    const mascota =
                        mascotas.find(mascota =>

                            Number(
                                mascota.idMascota
                            )
                            ===
                            Number(
                                recomendacion.idMascota
                            )

                        );


                    const producto =
                        productos.find(producto =>

                            Number(
                                producto.idProducto
                            )
                            ===
                            Number(
                                recomendacion.idProducto
                            )

                        );


                    const tipo =

                        recomendacion.idMascota

                            ? "Mascota"

                            : "Humano";


                    const criterio =

                        tipo === "Mascota"

                            ? recomendacion.necesidad

                            :
                            recomendacion.objetivo
                            + " / "
                            + recomendacion.actividad;


                    tabla.innerHTML += `

                        <tr>


                            <td>

                                ${recomendacion.idRecomendacion}

                            </td>


                            <td>

                                ${usuario
                                    ? usuario.nombre + " " + usuario.apellido
                                    : recomendacion.idUsuario}

                            </td>


                            <td>

                                ${tipo}

                            </td>


                            <td>

                                ${mascota
                                    ? mascota.nombre
                                    : "-"}

                            </td>


                            <td>

                                ${criterio}

                            </td>


                            <td>

                                ${producto
                                    ? producto.nombre
                                    : recomendacion.idProducto}

                            </td>


                            <td>

                                <button
                                    type="button"
                                    onclick="eliminarRecomendacion(${recomendacion.idRecomendacion})">

                                    Eliminar

                                </button>

                            </td>


                        </tr>

                    `;


                }
            );


        })


        .catch(error => {


            console.error(
                "Error al cargar recomendaciones:",
                error
            );


        });


}



// ======================================================
// 16. ELIMINAR RECOMENDACIÓN
// ======================================================

function eliminarRecomendacion(idRecomendacion) {


    const confirmar =
        confirm(
            "¿Está seguro de eliminar esta recomendación?"
        );


    if (!confirmar) {


        return;


    }


    fetch(
        `${API_URL}/${idRecomendacion}`,
        {


            method: "DELETE"


        }
    )


        .then(response => {


            if (!response.ok) {


                throw new Error(
                    "Error al eliminar la recomendación"
                );


            }


            alert(
                "Recomendación eliminada correctamente."
            );


            cargarRecomendaciones();


        })


        .catch(error => {


            console.error(
                "Error al eliminar:",
                error
            );


            alert(
                "Error al eliminar la recomendación."
            );


        });


}



// ======================================================
// 17. LIMPIAR FORMULARIO
// ======================================================

function limpiarFormulario() {


    document.getElementById(
        "formRecomendacion"
    ).reset();


    document.getElementById(
        "camposHumano"
    ).style.display = "block";


    document.getElementById(
        "camposMascota"
    ).style.display = "none";


    document.getElementById(
        "resultado"
    ).style.display = "none";


    document.getElementById(
        "necesidad"
    ).value = "";


}



// ======================================================
// 18. NORMALIZAR TEXTO
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
// 19. FORMATEAR PRECIO
// ======================================================

function formatearPrecio(precio) {


    return new Intl.NumberFormat(
        "es-CO",
        {


            style: "currency",


            currency: "COP",


            minimumFractionDigits: 0


        }
    ).format(

        Number(precio || 0)

    );


}