using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidafitMarket.backend.Models;

namespace VidafitMarket.backend.Controllers
{

    // ======================================================
    // DATOS QUE ENVÍA EL CLIENTE
    // ======================================================

    public class CrearDevolucionRequest
    {
        public int IdDetalle { get; set; }

        public int IdUsuario { get; set; }

        public int Cantidad { get; set; }

        public string Motivo { get; set; } = string.Empty;

        public string? Comentario { get; set; }
    }
    public class CambiarEstadoDevolucionRequest
    {
        public string Estado { get; set; } = string.Empty;

        public string? ObservacionAdministrador { get; set; }
    }


    // ======================================================
    // CONTROLADOR DE DEVOLUCIONES
    // ======================================================

    [Route("api/[controller]")]
    [ApiController]
    public class DevolucionesController : ControllerBase
    {
        private readonly VidaFitMarketContext _context;


        public DevolucionesController(
            VidaFitMarketContext context
        )
        {
            _context = context;
        }



        // ======================================================
        // CONSULTAR TODAS LAS DEVOLUCIONES
        // ======================================================

        [HttpGet]
        public async Task<IActionResult> GetDevoluciones()
        {
            var devoluciones =
                await _context.Devoluciones
                    .AsNoTracking()
                    .Select(devolucion => new
                    {
                        devolucion.IdDevolucion,
                        devolucion.IdDetalle,
                        devolucion.Cantidad,
                        devolucion.Motivo,
                        devolucion.Comentario,
                        devolucion.Estado,
                        devolucion.FechaSolicitud,
                        devolucion.ObservacionAdministrador,
                        devolucion.FechaRespuesta
                    })
                    .ToListAsync();


            return Ok(devoluciones);
        }



        // ======================================================
        // CONSULTAR UNA DEVOLUCIÓN POR ID
        // ======================================================

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDevolucion(
            int id
        )
        {
            var devolucion =
                await _context.Devoluciones
                    .AsNoTracking()
                    .Where(d =>
                        d.IdDevolucion == id
                    )
                    .Select(d => new
                    {
                        d.IdDevolucion,
                        d.IdDetalle,
                        d.Cantidad,
                        d.Motivo,
                        d.Comentario,
                        d.Estado,
                        d.FechaSolicitud,
                        d.ObservacionAdministrador,
                        d.FechaRespuesta
                    })
                    .FirstOrDefaultAsync();


            if (devolucion == null)
            {
                return NotFound(
                    "No se encontró la devolución."
                );
            }


            return Ok(devolucion);
        }



        // ======================================================
        // CREAR SOLICITUD DE DEVOLUCIÓN
        // ======================================================
        // ======================================================
        // CONSULTAR PRODUCTOS DISPONIBLES PARA DEVOLUCIÓN
        // ======================================================

        [HttpGet("disponibles/{idUsuario:int}")]
        public async Task<IActionResult> GetProductosDisponibles(
            int idUsuario
        )
        {
            if (idUsuario <= 0)
            {
                return BadRequest(
                    "El usuario no es válido."
                );
            }


            // CONSULTAR DETALLES DE PEDIDOS ENTREGADOS

            var detallesEntregados =
                await _context.DetallePedidos
                    .AsNoTracking()
                    .Where(d =>
                        d.IdPedidoNavigation != null
                        && d.IdPedidoNavigation.IdUsuario == idUsuario
                        && d.IdPedidoNavigation.Estado == "Entregado"
                    )
                    .Select(d => new
                    {
                        d.IdDetalle,
                        d.IdPedido,
                        d.IdProducto,

                        NombreProducto =
                            d.IdProductoNavigation != null
                                ? d.IdProductoNavigation.Nombre
                                : "Producto sin nombre",

                        CantidadComprada =
                            d.Cantidad ?? 0
                    })
                    .ToListAsync();


            if (detallesEntregados.Count == 0)
            {
                return Ok(
                    Array.Empty<object>()
                );
            }


            // OBTENER LOS IDENTIFICADORES DE LOS DETALLES

            var idsDetalles =
                detallesEntregados
                    .Select(d => d.IdDetalle)
                    .ToList();


            // CALCULAR LAS CANTIDADES YA SOLICITADAS

            var cantidadesSolicitadas =
                await _context.Devoluciones
                    .AsNoTracking()
                    .Where(d =>
                        idsDetalles.Contains(d.IdDetalle)
                        && d.Estado != "Rechazada"
                    )
                    .GroupBy(d => d.IdDetalle)
                    .Select(grupo => new
                    {
                        IdDetalle = grupo.Key,

                        CantidadSolicitada =
                            grupo.Sum(d => d.Cantidad)
                    })
                    .ToDictionaryAsync(
                        d => d.IdDetalle,
                        d => d.CantidadSolicitada
                    );


            // CALCULAR LAS UNIDADES DISPONIBLES

            var disponibles =
                detallesEntregados
                    .Select(detalle =>
                    {
                        cantidadesSolicitadas.TryGetValue(
                            detalle.IdDetalle,
                            out int cantidadSolicitada
                        );


                        return new
                        {
                            detalle.IdDetalle,
                            detalle.IdPedido,
                            detalle.IdProducto,
                            detalle.NombreProducto,
                            detalle.CantidadComprada,

                            CantidadSolicitada =
                                cantidadSolicitada,

                            CantidadDisponible =
                                detalle.CantidadComprada
                                - cantidadSolicitada
                        };
                    })
                    .Where(d =>
                        d.CantidadDisponible > 0
                    )
                    .ToList();


            return Ok(disponibles);
        }
        // ======================================================
        // CONSULTAR DEVOLUCIONES DE UN USUARIO
        // ======================================================

        [HttpGet("usuario/{idUsuario:int}")]
        public async Task<IActionResult> GetDevolucionesPorUsuario(
            int idUsuario
        )
        {
            if (idUsuario <= 0)
            {
                return BadRequest(
                    "El usuario no es válido."
                );
            }


            var devoluciones =
                await (
                    from devolucion
                        in _context.Devoluciones.AsNoTracking()

                    join detalle
                        in _context.DetallePedidos.AsNoTracking()

                        on devolucion.IdDetalle
                        equals detalle.IdDetalle

                    join pedido
                        in _context.Pedidos.AsNoTracking()

                        on detalle.IdPedido
                        equals pedido.IdPedido

                    where pedido.IdUsuario == idUsuario

                    select new
                    {
                        devolucion.IdDevolucion,

                        devolucion.IdDetalle,

                        pedido.IdPedido,

                        detalle.IdProducto,

                        devolucion.Cantidad,

                        devolucion.Motivo,

                        devolucion.Comentario,

                        devolucion.Estado,

                        devolucion.FechaSolicitud,

                        devolucion.ObservacionAdministrador,

                        devolucion.FechaRespuesta
                    }
                )
                .ToListAsync();


            return Ok(devoluciones);
        }
        [HttpPost]
        public async Task<IActionResult> CrearDevolucion(
            CrearDevolucionRequest solicitud
        )
        {
            // VALIDAR EL DETALLE

            if (solicitud.IdDetalle <= 0)
            {
                return BadRequest(
                    "El detalle del pedido no es válido."
                );
            }


            // VALIDAR EL USUARIO

            if (solicitud.IdUsuario <= 0)
            {
                return BadRequest(
                    "El usuario no es válido."
                );
            }


            // VALIDAR LA CANTIDAD

            if (solicitud.Cantidad <= 0)
            {
                return BadRequest(
                    "La cantidad debe ser mayor que cero."
                );
            }


            // VALIDAR EL MOTIVO

            if (string.IsNullOrWhiteSpace(solicitud.Motivo))
            {
                return BadRequest(
                    "El motivo de la devolución es obligatorio."
                );
            }


            if (solicitud.Motivo.Length > 200)
            {
                return BadRequest(
                    "El motivo no puede superar los 200 caracteres."
                );
            }


            // VALIDAR EL COMENTARIO

            if (
                solicitud.Comentario != null
                && solicitud.Comentario.Length > 500
            )
            {
                return BadRequest(
                    "El comentario no puede superar los 500 caracteres."
                );
            }


            // BUSCAR EL DETALLE Y EL PEDIDO RELACIONADO

            var detalle =
                await _context.DetallePedidos
                    .AsNoTracking()
                    .Include(d =>
                        d.IdPedidoNavigation
                    )
                    .FirstOrDefaultAsync(d =>
                        d.IdDetalle == solicitud.IdDetalle
                    );


            if (detalle == null)
            {
                return NotFound(
                    "No se encontró el producto dentro del pedido."
                );
            }


            if (detalle.IdPedidoNavigation == null)
            {
                return BadRequest(
                    "El detalle no tiene un pedido relacionado."
                );
            }


            // VERIFICAR QUE EL PEDIDO SEA DEL USUARIO

            if (
                detalle.IdPedidoNavigation.IdUsuario
                != solicitud.IdUsuario
            )
            {
                return StatusCode(
                    403,
                    "El pedido no pertenece al usuario indicado."
                );
            }


            // VERIFICAR QUE EL PEDIDO ESTÉ ENTREGADO

            if (
                !string.Equals(
                    detalle.IdPedidoNavigation.Estado?.Trim(),
                    "Entregado",
                    StringComparison.OrdinalIgnoreCase
                )
            )
            {
                return BadRequest(
                    "Solo se pueden devolver productos de pedidos entregados."
                );
            }


            int cantidadComprada =
                detalle.Cantidad ?? 0;


            // SUMAR DEVOLUCIONES ANTERIORES NO RECHAZADAS

            int cantidadYaSolicitada =
                await _context.Devoluciones
                    .Where(d =>
                        d.IdDetalle == solicitud.IdDetalle
                        && d.Estado != "Rechazada"
                    )
                    .SumAsync(d =>
                        (int?)d.Cantidad
                    )
                ?? 0;


            int cantidadDisponible =
                cantidadComprada - cantidadYaSolicitada;


            if (cantidadDisponible <= 0)
            {
                return BadRequest(
                    "Este producto ya no tiene unidades disponibles para devolver."
                );
            }


            if (solicitud.Cantidad > cantidadDisponible)
            {
                return BadRequest(
                    $"Solo puedes devolver {cantidadDisponible} unidad(es)."
                );
            }


            // CREAR LA DEVOLUCIÓN

            var devolucion =
                new Devolucion
                {
                    IdDetalle =
                        solicitud.IdDetalle,

                    Cantidad =
                        solicitud.Cantidad,

                    Motivo =
                        solicitud.Motivo.Trim(),

                    Comentario =
                        string.IsNullOrWhiteSpace(
                            solicitud.Comentario
                        )
                            ? null
                            : solicitud.Comentario.Trim(),

                    Estado =
                        "Pendiente",

                    FechaSolicitud =
                        DateTime.Now
                };


            _context.Devoluciones.Add(devolucion);

            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(GetDevolucion),
                new
                {
                    id = devolucion.IdDevolucion
                },
                new
                {
                    mensaje =
                        "Solicitud de devolución creada correctamente.",

                    idDevolucion =
                        devolucion.IdDevolucion,

                    estado =
                        devolucion.Estado
                }
            );
     
 
        
        }

        // ======================================================
        // CAMBIAR ESTADO DE UNA DEVOLUCIÓN
        // ======================================================

        [HttpPut("{id:int}/estado")]
        public async Task<IActionResult> CambiarEstadoDevolucion(
            int id,
            CambiarEstadoDevolucionRequest solicitud
        )
        {
            var devolucion =
                await _context.Devoluciones.FindAsync(id);


            if (devolucion == null)
            {
                return NotFound(
                    "No se encontró la devolución."
                );
            }


            if (string.IsNullOrWhiteSpace(solicitud.Estado))
            {
                return BadRequest(
                    "Debe indicar el nuevo estado."
                );
            }


            string estadoRecibido =
                solicitud.Estado
                    .Trim()
                    .ToLowerInvariant();


            string? estadoNuevo =
                estadoRecibido switch
                {
                    "aprobada" => "Aprobada",
                    "rechazada" => "Rechazada",
                    "completada" => "Completada",
                    _ => null
                };


            if (estadoNuevo == null)
            {
                return BadRequest(
                    "El estado debe ser Aprobada, Rechazada o Completada."
                );
            }


            devolucion.Estado =
                estadoNuevo;


            devolucion.ObservacionAdministrador =
                string.IsNullOrWhiteSpace(
                    solicitud.ObservacionAdministrador
                )
                    ? null
                    : solicitud.ObservacionAdministrador.Trim();


            devolucion.FechaRespuesta =
                DateTime.Now;


            await _context.SaveChangesAsync();


            return Ok(new
            {
                mensaje =
                    "Estado de la devolución actualizado correctamente.",

                idDevolucion =
                    devolucion.IdDevolucion,

                estado =
                    devolucion.Estado,

                observacionAdministrador =
                    devolucion.ObservacionAdministrador,

                fechaRespuesta =
                    devolucion.FechaRespuesta
            });
        }
    }

}
