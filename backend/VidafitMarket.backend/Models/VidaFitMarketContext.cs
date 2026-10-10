using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VidafitMarket.backend.Models;

public partial class VidaFitMarketContext : DbContext
{
    public VidaFitMarketContext()
    {
    }

    public VidaFitMarketContext(DbContextOptions<VidaFitMarketContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administrador> Administradors { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<DetallePedido> DetallePedidos { get; set; }
    public virtual DbSet<Devolucion> Devoluciones { get; set; }

    public virtual DbSet<Mascota> Mascota { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Recomendacion> Recomendacions { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=VidaFitMarket;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrador>(entity =>
        {
            entity.HasKey(e => e.IdAdmin).HasName("PK__Administ__89472E954FAA63CD");

            entity.ToTable("Administrador");

            entity.Property(e => e.IdAdmin).HasColumnName("id_admin");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.IdBlog).HasName("PK__Blog__D920E8613389C144");

            entity.ToTable("Blog");

            entity.Property(e => e.IdBlog).HasColumnName("id_blog");
            entity.Property(e => e.Contenido)
                .HasColumnType("text")
                .HasColumnName("contenido");
            entity.Property(e => e.FechaPublicacion).HasColumnName("fecha_publicacion");
            entity.Property(e => e.IdAdmin).HasColumnName("id_admin");
            entity.Property(e => e.Titulo)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.IdAdminNavigation).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.IdAdmin)
                .HasConstraintName("FK__Blog__id_admin__4CA06362");
        });

        modelBuilder.Entity<DetallePedido>(entity =>
        {
            entity.HasKey(e => e.IdDetalle).HasName("PK__Detalle___4F1332DE1678DBBD");

            entity.ToTable("Detalle_pedido");

            entity.Property(e => e.IdDetalle).HasColumnName("id_detalle");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.IdPedido).HasColumnName("id_pedido");
            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("subtotal");

            entity.HasOne(d => d.IdPedidoNavigation).WithMany(p => p.DetallePedidos)
                .HasForeignKey(d => d.IdPedido)
                .HasConstraintName("FK__Detalle_p__id_pe__48CFD27E");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetallePedidos)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK__Detalle_p__id_pr__49C3F6B7");
        });
        modelBuilder.Entity<Devolucion>(entity =>
        {
            entity.HasKey(e => e.IdDevolucion)
                .HasName("PK_Devolucion");

            entity.ToTable("Devolucion");

            entity.Property(e => e.IdDevolucion)
                .HasColumnName("id_devolucion");

            entity.Property(e => e.IdDetalle)
                .HasColumnName("id_detalle");

            entity.Property(e => e.Cantidad)
                .HasColumnName("cantidad");

            entity.Property(e => e.Motivo)
                .HasMaxLength(200)
                .HasColumnName("motivo");

            entity.Property(e => e.Comentario)
                .HasMaxLength(500)
                .HasColumnName("comentario");

            entity.Property(e => e.Estado)
                .HasMaxLength(30)
                .HasDefaultValue("Pendiente")
                .HasColumnName("estado");

            entity.Property(e => e.FechaSolicitud)
                .HasColumnType("datetime2(0)")
                .HasDefaultValueSql("(sysdatetime())")
                .ValueGeneratedOnAdd()
                .HasColumnName("fecha_solicitud");

            entity.Property(e => e.ObservacionAdministrador)
                .HasMaxLength(500)
                .HasColumnName("observacion_administrador");

            entity.Property(e => e.FechaRespuesta)
                .HasColumnType("datetime2(0)")
                .HasColumnName("fecha_respuesta");

            entity.HasOne(d => d.IdDetalleNavigation)
                .WithMany()
                .HasForeignKey(d => d.IdDetalle)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_Devolucion_Detalle_pedido");
        });

        modelBuilder.Entity<Mascota>(entity =>
        {
            entity.HasKey(e => e.IdMascota).HasName("PK__Mascota__6F037352D74DA1C0");

            entity.Property(e => e.IdMascota).HasColumnName("id_mascota");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Necesidad)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("necesidad");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Peso)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("peso");
            entity.Property(e => e.Raza)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("raza");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Mascota)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Mascota__id_usua__3E52440B");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.IdPedido).HasName("PK__Pedido__6FF014890A3EC3A2");

            entity.ToTable("Pedido");

            entity.Property(e => e.IdPedido).HasColumnName("id_pedido");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("total");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Pedido__id_usuar__412EB0B6");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__FF341C0DFA1A9C71");

            entity.ToTable("Producto");

            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.Beneficio)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("beneficio");
            entity.Property(e => e.Categoria)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("categoria");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.IdAdmin).HasColumnName("id_admin");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.TipoUsuario)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo_usuario");

            entity.HasOne(d => d.IdAdminNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.IdAdmin)
                .HasConstraintName("FK__Producto__id_adm__398D8EEE");
        });

        modelBuilder.Entity<Recomendacion>(entity =>
        {
            entity.HasKey(e => e.IdRecomendacion).HasName("PK__Recomend__BC44D3FD101C1DFD");

            entity.ToTable("Recomendacion");

            entity.Property(e => e.IdRecomendacion).HasColumnName("id_recomendacion");
            entity.Property(e => e.Actividad)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("actividad");
            entity.Property(e => e.IdMascota).HasColumnName("id_mascota");
            entity.Property(e => e.IdProducto).HasColumnName("id_producto");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Necesidad)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("necesidad");
            entity.Property(e => e.Objetivo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("objetivo");

            entity.HasOne(d => d.IdMascotaNavigation).WithMany(p => p.Recomendacions)
                .HasForeignKey(d => d.IdMascota)
                .HasConstraintName("FK__Recomenda__id_ma__44FF419A");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Recomendacions)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK__Recomenda__id_pr__45F365D3");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Recomendacions)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Recomenda__id_us__440B1D61");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__4E3E04AD9C00A55E");

            entity.ToTable("Usuario");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
