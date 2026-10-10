using System;

namespace VidafitMarket.backend.Models;

public partial class Devolucion
{
    public int IdDevolucion { get; set; }

    public int IdDetalle { get; set; }

    public int Cantidad { get; set; }

    public string Motivo { get; set; } = null!;

    public string? Comentario { get; set; }

    public string Estado { get; set; } = "Pendiente";

    public DateTime FechaSolicitud { get; set; }

    public string? ObservacionAdministrador { get; set; }

    public DateTime? FechaRespuesta { get; set; }

    public virtual DetallePedido IdDetalleNavigation { get; set; } = null!;
}