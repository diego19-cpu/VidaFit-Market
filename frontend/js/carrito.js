document.addEventListener("DOMContentLoaded", () => {

    cargarCarrito();

});


// ======================================================
// RUTAS API
// ======================================================

const API_PRODUCTOS =
    "https://localhost:7244/api/Productos";


const API_PEDIDOS =
    "https://localhost:7244/api/Pedidos";


const API_DETALLE_PEDIDO =
    "https://localhost:7244/api/DetallePedido";



// ======================================================
// CARRITO
// ======================================================

const CLAVE_CARRITO =
    "carritoVidaFit";


let carrito = [];




// ======================================================
// CARGAR CARRITO
// ======================================================

function cargarCarrito(){

    const guardado =
        localStorage.getItem(
            CLAVE_CARRITO
        );


    if(guardado){

        carrito =
            JSON.parse(
                guardado
            );

    }
    else{

        carrito = [];

    }


    mostrarCarrito();

}





// ======================================================
// MOSTRAR CARRITO
// ======================================================

function mostrarCarrito(){


    const tabla =
        document.getElementById(
            "tablaCarrito"
        );


    const vacio =
        document.getElementById(
            "carritoVacio"
        );


    const seccion =
        document.getElementById(
            "seccionCarrito"
        );



    if(carrito.length === 0){


        if(seccion)
            seccion.style.display="none";


        if(vacio)
            vacio.style.display="block";


        return;

    }



    if(seccion)
        seccion.style.display="block";


    if(vacio)
        vacio.style.display="none";



    tabla.innerHTML="";


    let total = 0;

    let cantidadTotal = 0;



    carrito.forEach(item=>{


        const subtotal =
            Number(item.precio)
            *
            Number(item.cantidad);



        total += subtotal;


        cantidadTotal +=
            Number(item.cantidad);



        tabla.innerHTML += `

        <tr>


            <td>
                ${item.nombre}
            </td>


            <td>
                ${formatearPrecio(item.precio)}
            </td>


            <td>

                <button onclick="disminuirCantidad(${item.idProducto})">
                -
                </button>


                ${item.cantidad}


                <button onclick="aumentarCantidad(${item.idProducto})">
                +
                </button>

            </td>


            <td>
                ${formatearPrecio(subtotal)}
            </td>


            <td>

                <button onclick="eliminarProducto(${item.idProducto})">

                Eliminar

                </button>

            </td>


        </tr>

        `;


    });



    document.getElementById(
        "totalProductos"
    ).textContent =
        cantidadTotal;



    document.getElementById(
        "totalCompra"
    ).textContent =
        formatearPrecio(total);


}




// ======================================================
// CAMBIAR CANTIDAD
// ======================================================

function aumentarCantidad(idProducto){


    const producto =
        carrito.find(
            p =>
            Number(p.idProducto)
            ===
            Number(idProducto)
        );


    if(producto){

        producto.cantidad++;

        guardarCarrito();

        mostrarCarrito();

    }

}



function disminuirCantidad(idProducto){


    const producto =
        carrito.find(
            p =>
            Number(p.idProducto)
            ===
            Number(idProducto)
        );


    if(producto.cantidad > 1){

        producto.cantidad--;

        guardarCarrito();

        mostrarCarrito();

    }
    else{

        eliminarProducto(idProducto);

    }

}





function eliminarProducto(idProducto){


    carrito =
        carrito.filter(
            p =>
            Number(p.idProducto)
            !==
            Number(idProducto)
        );


    guardarCarrito();

    mostrarCarrito();

}





function guardarCarrito(){

    localStorage.setItem(

        CLAVE_CARRITO,

        JSON.stringify(carrito)

    );

}





// ======================================================
// CONFIRMAR COMPRA
// ======================================================

function confirmarCompra(){



    const idUsuario =
        localStorage.getItem(
            "idUsuario"
        );



    if(!idUsuario){


        alert(
            "Debe iniciar sesión para comprar."
        );


        return;

    }




    if(carrito.length===0){


        alert(
            "El carrito está vacío."
        );


        return;

    }



    verificarStockActual(
        idUsuario
    );


}





// ======================================================
// VERIFICAR STOCK
// ======================================================

function verificarStockActual(idUsuario){


    fetch(API_PRODUCTOS)

    .then(r=>r.json())

    .then(productos=>{


        crearPedido(

            idUsuario

        );


    })


    .catch(error=>{


        console.error(error);


        alert(
            "No se pudo verificar stock."
        );


    });


}




// ======================================================
// CREAR PEDIDO
// ======================================================

function crearPedido(idUsuario){



    const pedido = {


        idPedido:0,


        idUsuario:
            Number(idUsuario),


        total:
            calcularTotalCompra(),


        estado:
            "Pendiente",


        fecha:
            obtenerFechaActual()


    };





    fetch(
        API_PEDIDOS,
        {


        method:"POST",


        headers:{

            "Content-Type":
            "application/json"

        },


        body:
        JSON.stringify(pedido)


        }

    )


    .then(r=>r.json())


    .then(pedidoCreado=>{


        crearDetallesPedido(
            pedidoCreado.idPedido
        );


    })


    .catch(error=>{


        console.error(error);


        alert(
            "Error creando pedido."
        );


    });


}






// ======================================================
// CREAR DETALLES
// ======================================================

function crearDetallesPedido(idPedido){


    const solicitudes=[];



    carrito.forEach(item=>{


        const detalle={


            idDetalle:0,


            idPedido:
            idPedido,


            idProducto:
            item.idProducto,


            cantidad:
            item.cantidad,


            subtotal:
            Number(item.precio)
            *
            Number(item.cantidad)


        };




        solicitudes.push(

            fetch(
                API_DETALLE_PEDIDO,
                {

                method:"POST",

                headers:{

                "Content-Type":
                "application/json"

                },


                body:
                JSON.stringify(detalle)


                }

            )

        );


    });





    Promise.all(solicitudes)

    .then(()=>{


        finalizarCompra(idPedido);


    });



}






// ======================================================
// FINALIZAR
// ======================================================

function finalizarCompra(idPedido){


    carrito=[];


    localStorage.removeItem(
        CLAVE_CARRITO
    );


    mostrarCarrito();



    alert(

        "Compra realizada correctamente.\nPedido #"

        +

        idPedido

    );



    window.location.href =
        "mispedidos.html";


}






function calcularTotalCompra(){


    let total=0;


    carrito.forEach(item=>{


        total +=

        Number(item.precio)

        *

        Number(item.cantidad);


    });


    return total;

}




function obtenerFechaActual(){


    return new Date()
    .toISOString()
    .substring(0,10);


}





function volverCatalogo(){


    window.location.href=
    "catalogo.html";


}





function formatearPrecio(precio){


return new Intl.NumberFormat(
    "es-CO",
    {

    style:"currency",

    currency:"COP",

    minimumFractionDigits:0

    }

)
.format(
    Number(precio || 0)
);


}