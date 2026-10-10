using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Mascota
{
    public int IdMascota { get; set; }

    public int? IdUsuario { get; set; }

    public string? Nombre { get; set; }

    public string? Raza { get; set; }

    public int? Edad { get; set; }

    public decimal? Peso { get; set; }

    public string? Necesidad { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }

    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();
}
