using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidafitMarket.backend.Models;

namespace VidafitMarket.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly VidaFitMarketContext _context;


        public PedidosController(VidaFitMarketContext context)
        {
            _context = context;
        }



        // ======================================================
        // ADMINISTRADOR
        // VER TODOS LOS PEDIDOS
        // ======================================================

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
        {
            return await _context.Pedidos.ToListAsync();
        }



        // ======================================================
        // USUARIO
        // VER SOLO SUS PROPIOS PEDIDOS
        // ======================================================

        [HttpGet("usuario/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidosPorUsuario(int idUsuario)
        {
            var pedidos = await _context.Pedidos
                .Where(p => p.IdUsuario == idUsuario)
                .ToListAsync();


            if (pedidos == null || pedidos.Count == 0)
            {
                return NotFound("El usuario no tiene pedidos.");
            }


            return Ok(pedidos);
        }



        // ======================================================
        // VER UN PEDIDO POR ID
        // ======================================================

        [HttpGet("{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);


            if (pedido == null)
            {
                return NotFound();
            }


            return pedido;
        }



        // ======================================================
        // CREAR PEDIDO
        // ======================================================

        [HttpPost]
        public async Task<ActionResult<Pedido>> PostPedido(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);

            await _context.SaveChangesAsync();


            return Ok(pedido);
        }



        // ======================================================
        // ACTUALIZAR PEDIDO
        // ======================================================

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {

            if (id != pedido.IdPedido)
            {
                return BadRequest("El ID no coincide.");
            }


            _context.Entry(pedido).State =
                EntityState.Modified;


            await _context.SaveChangesAsync();


            return Ok(pedido);
        }



        // ======================================================
        // ELIMINAR PEDIDO
        // ======================================================

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {

            var pedido =
                await _context.Pedidos.FindAsync(id);


            if (pedido == null)
            {
                return NotFound();
            }


            _context.Pedidos.Remove(pedido);


            await _context.SaveChangesAsync();


            return Ok("Pedido eliminado correctamente.");

        }

    }
}
