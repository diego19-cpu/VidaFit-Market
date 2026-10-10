using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Recomendacion
{
    public int IdRecomendacion { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdMascota { get; set; }

    public int? IdProducto { get; set; }

    public string? Objetivo { get; set; }

    public string? Actividad { get; set; }

    public string? Necesidad { get; set; }

    public virtual Mascota? IdMascotaNavigation { get; set; }

    public virtual Producto? IdProductoNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}