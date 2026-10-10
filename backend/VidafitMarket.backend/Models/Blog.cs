using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Blog
{
    public int IdBlog { get; set; }

    public int? IdAdmin { get; set; }

    public string? Titulo { get; set; }

    public string? Contenido { get; set; }

    public string? Categoria { get; set; }

    public DateOnly? FechaPublicacion { get; set; }

    public virtual Administrador? IdAdminNavigation { get; set; }
}