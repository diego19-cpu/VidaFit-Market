// ======================================================
// VALIDAR ACCESO ADMINISTRADOR
// ======================================================

var rolUsuario = localStorage.getItem("rol");


if (rolUsuario !== "Administrador") {

    alert(
        "Acceso permitido únicamente para administradores."
    );


    window.location.href = "index.html";

}




// ======================================================
// API REPORTES
// ======================================================

const API =
"https://localhost:7244/api/Reportes";





// ======================================================
// CARGAR REPORTES PRINCIPALES
// ======================================================

async function cargarReportes(){


    try {


        // VENTAS DEL DÍA

        const respuestaDia =
            await fetch(
                `${API}/ventas-dia`
            );


        const dia =
            await respuestaDia.json();



        document.getElementById("ventasDia").innerHTML =
            "$ " + dia.totalVentas;



        // VENTAS DEL MES

        const respuestaMes =
            await fetch(
                `${API}/ventas-mes`
            );


        const mes =
            await respuestaMes.json();



        document.getElementById("ventasMes").innerHTML =
            "$ " + mes.totalVentas;



        // PEDIDOS

        document.getElementById("cantidadPedidos").innerHTML =
            dia.cantidadPedidos;



    }
    catch(error){


        console.error(
            "Error cargando reportes:",
            error
        );


    }


}




cargarReportes();







// ======================================================
// CONSULTAR VENTAS POR MES Y AÑO
// ======================================================

async function consultarVentas(){


    try {


        const mes =
            document.getElementById(
                "mesReporte"
            ).value;



        const año =
            document.getElementById(
                "añoReporte"
            ).value;




        const respuesta =
            await fetch(
                `${API}/ventas-mes?mes=${mes}&año=${año}`
            );



        const datos =
            await respuesta.json();




        document.getElementById("ventasMes").innerHTML =
            "$ " + datos.totalVentas;



        document.getElementById("cantidadPedidos").innerHTML =
            datos.cantidadPedidos;



    }
    catch(error){


        console.error(
            "Error consultando ventas:",
            error
        );


    }


}







// ======================================================
// PRODUCTOS MÁS VENDIDOS
// ======================================================

async function cargarProductosMasVendidos(){


    try {


        const respuesta =
            await fetch(
                `${API}/productos-mas-vendidos`
            );



        const productos =
            await respuesta.json();




        const tabla =
            document.getElementById(
                "tablaProductosVendidos"
            );



        tabla.innerHTML = "";




        productos.forEach(producto => {



            tabla.innerHTML += `

            <tr>

                <td>
                    ${producto.producto}
                </td>


                <td>
                    ${producto.cantidadVendida}
                </td>


            </tr>

            `;



        });



    }
    catch(error){


        console.error(
            "Error cargando productos vendidos:",
            error
        );


    }


}




cargarProductosMasVendidos();
// ======================================================
// GRÁFICA VENTAS POR MES
// ======================================================

async function cargarGraficaVentasMes(){

    try{


        const respuesta =
            await fetch(
                `${API}/ventas-por-mes`
            );


        const datos =
            await respuesta.json();



        const nombresMeses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];



        const etiquetas =
            datos.map(
                x => nombresMeses[x.mes - 1]
            );



        const valores =
            datos.map(
                x => x.total
            );



        const grafica =
            document.getElementById(
                "graficaVentasMes"
            );



        new Chart(grafica, {

            type: "bar",


            data: {

                labels: etiquetas,


                datasets: [

                    {

                        label:
                        "Ventas del año",


                        data:
                        valores

                    }

                ]

            }

        });


    }
    catch(error){

        console.error(
            "Error cargando gráfica:",
            error
        );

    }

}



cargarGraficaVentasMes();

// ======================================================
// GRÁFICA PRODUCTOS MÁS VENDIDOS
// ======================================================

async function cargarGraficaProductosVendidos(){

    try {

        const respuesta =
            await fetch(
                `${API}/productos-mas-vendidos`
            );


        const productos =
            await respuesta.json();


        const nombres =
            productos.map(
                p => p.producto
            );


        const cantidades =
            productos.map(
                p => p.cantidadVendida
            );


        const ctx =
            document.getElementById(
                "graficaProductosVendidos"
            );


        new Chart(ctx, {

            type: "bar",

            data: {

                labels: nombres,

                datasets: [
                    {
                        label: "Cantidad vendida",

                        data: cantidades
                    }
                ]

            },

            options: {

                indexAxis: "y",

                responsive: true

            }

        });


    }
    catch(error){

        console.error(
            "Error gráfica productos:",
            error
        );

    }

}


cargarGraficaProductosVendidos();
// ======================================================
// CARGAR ALERTAS
// ======================================================

async function cargarAlertas(){

    try{

        const respuesta =
            await fetch(`${API}/alertas`);


        const alertas =
            await respuesta.json();


        const contenedor =
            document.getElementById(
                "contenedorAlertas"
            );


        contenedor.innerHTML = "";


        alertas.forEach(alerta => {


            let clase = "alerta-venta";


            if(alerta.tipo.includes("Stock")){
                clase = "alerta-stock";
            }


            contenedor.innerHTML += `

            <div class="alerta-card ${clase}">

                <div class="alerta-titulo">

                    <h3>
                        ${alerta.tipo}
                    </h3>

                </div>


                <p class="producto-alerta">
                    ${alerta.producto}
                </p>


                <small>
                    ${alerta.detalle}
                </small>


            </div>

            `;


        });


    }
    catch(error){

        console.error(
            "Error cargando alertas:",
            error
        );

    }

}


cargarAlertas();
// ======================================================
// BOTÓN CONSULTAR MES Y AÑO
// ======================================================

document
.getElementById("btnConsultar")
.addEventListener("click", function(){

    consultarVentas();

});