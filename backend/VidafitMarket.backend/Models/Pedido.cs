using System;
using System.Collections.Generic;

namespace VidafitMarket.backend.Models;

public partial class Pedido
{
    public int IdPedido { get; set; }

    public int? IdUsuario { get; set; }

    public decimal? Total { get; set; }

    public string? Estado { get; set; }

    public DateOnly? Fecha { get; set; }

    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
