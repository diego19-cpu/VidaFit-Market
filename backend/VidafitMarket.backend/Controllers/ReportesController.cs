using Microsoft.AspNetCore.Mvc;
using VidaFitMarket.backend;
using VidafitMarket.backend.Models;


namespace VidaFitMarket.backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class ReportesController : ControllerBase
    {

        private readonly VidaFitMarketContext _context;


        public ReportesController(VidaFitMarketContext context)
        {
            _context = context;
        }



        // ======================================================
        // PRUEBA DEL CONTROLADOR
        // ======================================================

        [HttpGet("prueba")]
        public IActionResult Prueba()
        {
            return Ok(new
            {
                mensaje = "Controlador de reportes funcionando correctamente"
            });
        }





        // ======================================================
        // REPORTE VENTAS DEL DÍA
        // ======================================================

        [HttpGet("ventas-dia")]
        public IActionResult VentasDia()
        {

            var fechaHoy =
                DateOnly.FromDateTime(DateTime.Today);



            var ventas = _context.Pedidos

                .Where(p =>
                    p.Fecha == fechaHoy &&
                    p.Estado == "Entregado"
                )


                .Select(p => new
                {
                    p.IdPedido,
                    p.Fecha,
                    p.Total
                })


                .ToList();



            return Ok(new
            {
                fecha = fechaHoy,

                cantidadPedidos = ventas.Count,

                totalVentas =
                    ventas.Sum(v => v.Total ?? 0),

                detalle = ventas
            });

        }







        // ======================================================
        // REPORTE VENTAS POR MES Y AÑO
        // ======================================================

        [HttpGet("ventas-mes")]
        public IActionResult VentasMes(int mes, int año)
        {

            var ventas = _context.Pedidos

                .Where(p =>
                    p.Fecha.Value.Month == mes &&
                    p.Fecha.Value.Year == año &&
                    p.Estado == "Entregado"
                )


                .Select(p => new
                {
                    p.IdPedido,
                    p.Fecha,
                    p.Total
                })


                .ToList();



            return Ok(new
            {

                mes = mes,

                año = año,

                cantidadPedidos = ventas.Count,


                totalVentas =
                    ventas.Sum(v => v.Total ?? 0),


                detalle = ventas

            });

        }







        // ======================================================
        // VENTAS POR MESES DEL AÑO
        // PARA GRÁFICA
        // ======================================================

        [HttpGet("ventas-por-mes")]
        public IActionResult VentasPorMes()
        {

            var añoActual =
                DateTime.Today.Year;



            var ventas = _context.Pedidos

                .Where(p =>
                    p.Fecha.Value.Year == añoActual &&
                    p.Estado == "Entregado"
                )


                .GroupBy(p =>
                    p.Fecha.Value.Month
                )


                .Select(x => new
                {

                    Mes = x.Key,


                    Total =
                        x.Sum(p => p.Total ?? 0)

                })


                .OrderBy(x => x.Mes)


                .ToList();



            return Ok(ventas);

        }







        // ======================================================
        // PRODUCTOS MÁS VENDIDOS
        // ======================================================

        [HttpGet("productos-mas-vendidos")]
        public IActionResult ProductosMasVendidos()
        {

            var productos =
                _context.DetallePedidos


                .GroupBy(d =>
                    d.IdProducto
                )


                .Select(x => new
                {

                    Producto =
                        x.First()
                        .IdProductoNavigation
                        .Nombre,


                    CantidadVendida =
                        x.Sum(d => d.Cantidad)

                })


                .OrderByDescending(x =>
                    x.CantidadVendida
                )


                .Take(5)


                .ToList();



            return Ok(productos);

        }








        // ======================================================
        // ALERTAS
        // ======================================================

        [HttpGet("alertas")]
        public IActionResult Alertas()
        {

            var alertas =
                new List<object>();



            // STOCK BAJO

            var stockBajo =
                _context.Productos


                .Where(p =>
                    p.Stock <= 5
                )


                .Select(p => new
                {

                    tipo = "Stock bajo",

                    producto = p.Nombre,

                    detalle =
                    "Quedan pocas unidades: "
                    + p.Stock

                })


                .ToList();



            foreach (var alerta in stockBajo)
            {
                alertas.Add(alerta);
            }

            // ======================================================
            // PEDIDOS PENDIENTES
            // ======================================================

            var pedidosPendientes = _context.Pedidos
                .Where(p => p.Estado == "Pendiente")
                .Count();


            if (pedidosPendientes > 0)
            {
                alertas.Add(new
                {
                    tipo = "Pedidos pendientes",
                    producto = "Pedidos",
                    detalle = "Pedidos esperando entrega: " + pedidosPendientes
                });
            }



            // ======================================================
            // DEVOLUCIONES PENDIENTES
            // ======================================================

            var devolucionesPendientes = _context.Devoluciones
                .Where(d => d.Estado == "Pendiente")
                .Count();


            if (devolucionesPendientes > 0)
            {
                alertas.Add(new
                {
                    tipo = "Devoluciones pendientes",
                    producto = "Devoluciones",
                    detalle = "Solicitudes pendientes: " + devolucionesPendientes
                });
            }





            // PRODUCTO MÁS VENDIDO

            var productoTop =
                _context.DetallePedidos


                .GroupBy(d =>
                    d.IdProducto
                )


                .Select(x => new
                {

                    Producto =
                    x.First()
                    .IdProductoNavigation
                    .Nombre,


                    Cantidad =
                    x.Sum(d => d.Cantidad)

                })


                .OrderByDescending(x =>
                    x.Cantidad
                )


                .FirstOrDefault();




            if (productoTop != null)
            {

                alertas.Add(new
                {

                    tipo =
                    "Producto más vendido",


                    producto =
                    productoTop.Producto,


                    detalle =
                    "Unidades vendidas: "
                    + productoTop.Cantidad

                });

            }



            return Ok(alertas);

        }


    }

}
