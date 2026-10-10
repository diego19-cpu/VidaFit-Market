using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidafitMarket.backend.Models;

namespace VidafitMarket.backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecomendacionsController : ControllerBase
    {
        private readonly VidaFitMarketContext _context;

        public RecomendacionsController(VidaFitMarketContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recomendacion>>> GetRecomendacions()
        {
            return await _context.Recomendacions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recomendacion>> GetRecomendacion(int id)
        {
            var recomendacion = await _context.Recomendacions.FindAsync(id);

            if (recomendacion == null)
            {
                return NotFound();
            }

            return recomendacion;
        }

        [HttpPost]
        public async Task<ActionResult<Recomendacion>> PostRecomendacion(Recomendacion recomendacion)
        {
            _context.Recomendacions.Add(recomendacion);
            await _context.SaveChangesAsync();

            return Ok(recomendacion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecomendacion(int id, Recomendacion recomendacion)
        {
            if (id != recomendacion.IdRecomendacion)
            {
                return BadRequest("El ID no coincide.");
            }

            _context.Entry(recomendacion).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(recomendacion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecomendacion(int id)
        {
            var recomendacion = await _context.Recomendacions.FindAsync(id);

            if (recomendacion == null)
            {
                return NotFound();
            }

            _context.Recomendacions.Remove(recomendacion);
            await _context.SaveChangesAsync();

            return Ok("Recomendación eliminada correctamente.");
        }
    }
}
