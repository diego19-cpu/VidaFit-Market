using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidafitMarket.backend.Models;

namespace VidafitMarket.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorsController : ControllerBase
    {
        private readonly VidaFitMarketContext _context;

        public AdministradorsController(VidaFitMarketContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administrador>>> GetAdministradors()
        {
            return await _context.Administradors.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Administrador>> GetAdministrador(int id)
        {
            var administrador = await _context.Administradors.FindAsync(id);

            if (administrador == null)
            {
                return NotFound();
            }

            return administrador;
        }

        [HttpPost]
        public async Task<ActionResult<Administrador>> PostAdministrador(Administrador administrador)
        {
            _context.Administradors.Add(administrador);
            await _context.SaveChangesAsync();

            return Ok(administrador);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministrador(int id, Administrador administrador)
        {
            if (id != administrador.IdAdmin)
            {
                return BadRequest("El ID no coincide.");
            }

            _context.Entry(administrador).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(administrador);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrador(int id)
        {
            var administrador = await _context.Administradors.FindAsync(id);

            if (administrador == null)
            {
                return NotFound();
            }

            _context.Administradors.Remove(administrador);
            await _context.SaveChangesAsync();

            return Ok("Administrador eliminado correctamente.");
        }
    }
}