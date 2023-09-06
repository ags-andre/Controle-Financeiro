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
    public class MesMap : IEntityTypeConfiguration<Mes>
    {
        public void Configure(EntityTypeBuilder<Mes> builder)
        {
            //chave primária
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Nome).IsRequired();

            //define que essa propriedade é unica e nao pode ter valor repetido
            builder.HasIndex(m => m.Nome).IsUnique();

            builder.HasMany(m => m.Despesas).WithOne(m => m.Mes);
            builder.HasMany(m => m.Ganhos).WithOne(m => m.Mes);

            builder.HasData(
                new Mes
                {
                    Id = 1,
                    Nome = "Janeiro"
                },
                new Mes
                {
                    Id = 2,
                    Nome = "Fevereiro"
                },
                new Mes
                {
                    Id = 3,
                    Nome = "Março"
                },
                new Mes
                {
                    Id = 4,
                    Nome = "Abril"
                },
                new Mes
                {
                    Id = 5,
                    Nome = "Maio"
                },
                new Mes
                {
                    Id = 6,
                    Nome = "Junho"
                },
                new Mes
                {
                    Id = 7,
                    Nome = "julho"
                },
                new Mes
                {
                    Id = 8,
                    Nome = "Agosto"
                },
                new Mes
                {
                    Id = 9,
                    Nome = "Setembro"
                },
                new Mes
                {
                    Id = 10,
                    Nome = "Outubro"
                },
                new Mes
                {
                    Id = 11,
                    Nome = "Novembro"
                },
                new Mes
                {
                    Id = 12,
                    Nome = "Dezembro"
                });

            builder.ToTable("Meses");
        }
    }
}
