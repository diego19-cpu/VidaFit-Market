using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public int? IdAdmin { get; set; }

    public string? Nombre { get; set; }

    public string? Categoria { get; set; }

    public decimal? Precio { get; set; }

    public int? Stock { get; set; }

    public string? Descripcion { get; set; }

    public string? Beneficio { get; set; }

    public string? TipoUsuario { get; set; }

    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    public virtual Administrador? IdAdminNavigation { get; set; }

    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();
}
