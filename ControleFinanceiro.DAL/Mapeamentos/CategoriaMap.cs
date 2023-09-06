using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Mapeamentos
{
    public class CategoriaMap : IEntityTypeConfiguration<Categoria>
    {
        public void Configure(EntityTypeBuilder<Categoria> builder) //é necessário que tenha public pra nao gerar erro
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Nome).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Icone).IsRequired().HasMaxLength(15);

            builder.HasOne(c => c.Tipo).WithMany(t => t.Categorias).HasForeignKey(c => c.TipoId).IsRequired();
            builder.HasMany(c => c.Ganhos).WithOne(g => g.Categoria);
            builder.HasMany(c => c.Despesas).WithOne(d => d.Categoria);
        }
    }
}
