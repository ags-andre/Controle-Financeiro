using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Mapeamentos
{
    public class GanhoMap : IEntityTypeConfiguration<Ganho>
    {
        public void Configure(EntityTypeBuilder<Ganho> builder)
        {
            builder.HasKey(g => g.Id);

            builder.Property(g => g.Descricao).IsRequired().HasMaxLength(50);
            builder.Property(g => g.Valor).IsRequired();
            builder.Property(g => g.Dia).IsRequired();
            builder.Property(g => g.Ano).IsRequired();

            builder.HasOne(g => g.Usuario).WithMany(u => u.Ganhos).HasForeignKey(g => g.UsuarioId).IsRequired();
            builder.HasOne(g => g.Mes).WithMany(m => m.Ganhos).HasForeignKey(m => m.MesId).IsRequired();
            builder.HasOne(g => g.Categoria).WithMany(m => m.Ganhos).HasForeignKey(m => m.CategoriaId).IsRequired();

            builder.ToTable("Ganhos");
        }
    }
}
