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
    public class DespesaMap : IEntityTypeConfiguration<Despesa>
    {
        public void Configure(EntityTypeBuilder<Despesa> builder)
        {
            builder.HasKey(d => d.Id);
            builder.Property(d => d.Descricao).IsRequired().HasMaxLength(50);
            builder.Property(d => d.Valor).IsRequired();
            builder.Property(d => d.Dia).IsRequired();
            builder.Property(d => d.Ano).IsRequired();

            builder.HasOne(d => d.Cartao).WithMany(c => c.Despesas).HasForeignKey(d => d.CartaoId).IsRequired();
            builder.HasOne(d => d.Categoria).WithMany(c => c.Despesas).HasForeignKey(d => d.CategoriaId).IsRequired();
            builder.HasOne(d => d.Mes).WithMany(m => m.Despesas).HasForeignKey(d => d.MesId).IsRequired();
            builder.HasOne(d => d.Usuario).WithMany(u => u.Despesas).HasForeignKey(d => d.UsuarioId).IsRequired();

            builder.ToTable("Despesas");
        }
    }
}
