using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Administrador
{
    public int IdAdmin { get; set; }

    public string? Correo { get; set; }

    public string? Nombre { get; set; }

    public string? Contraseña { get; set; }

    public string? Apellido { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
