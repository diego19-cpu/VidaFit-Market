using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidafitMarket.backend.Models;

namespace VidafitMarket.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetallePedidoController : ControllerBase
    {
        private readonly VidaFitMarketContext _context;

        public DetallePedidoController(VidaFitMarketContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetallePedido>>> GetDetallePedidos()
        {
            return await _context.DetallePedidos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetallePedido>> GetDetallePedido(int id)
        {
            var detallePedido = await _context.DetallePedidos.FindAsync(id);

            if (detallePedido == null)
            {
                return NotFound();
            }

            return detallePedido;
        }

        [HttpPost]
        public async Task<ActionResult<DetallePedido>> PostDetallePedido(DetallePedido detallePedido)
        {
            _context.DetallePedidos.Add(detallePedido);
            await _context.SaveChangesAsync();

            return Ok(detallePedido);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetallePedido(int id, DetallePedido detallePedido)
        {
            if (id != detallePedido.IdDetalle)
            {
                return BadRequest("El ID no coincide.");
            }

            var existente = await _context.DetallePedidos.FindAsync(id);

            if (existente == null)
            {
                return NotFound();
            }

            existente.IdPedido = detallePedido.IdPedido;
            existente.IdProducto = detallePedido.IdProducto;
            existente.Cantidad = detallePedido.Cantidad;
            existente.Subtotal = detallePedido.Subtotal;

            await _context.SaveChangesAsync();

            return Ok(detallePedido);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetallePedido(int id)
        {
            var detallePedido = await _context.DetallePedidos.FindAsync(id);

            if (detallePedido == null)
            {
                return NotFound();
            }

            _context.DetallePedidos.Remove(detallePedido);
            await _context.SaveChangesAsync();

            return Ok("Detalle del pedido eliminado correctamente.");
        }
    }
}