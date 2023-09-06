using ControleFinanceiro.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleFinanceiro.DAL.Mapeamentos
{
    public class TipoMap : IEntityTypeConfiguration<Tipo>
    {
        public void Configure(EntityTypeBuilder<Tipo> builder)
        {
            //criando colunas da tabela
            //chave primária
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Nome).IsRequired().HasMaxLength(20);

            //Tipo tem relação com várias categorias, e Categorias tem relação com um Tipo
            builder.HasMany(t => t.Categorias).WithOne(t => t.Tipo);

            //populando a tabela que estamos criando
            builder.HasData(
                new Tipo
                {
                    Id = 1,
                    Nome = "Despesa"
                },
                new Tipo
                {
                    Id = 2,
                    Nome = "Ganho"
                });
            //criando tabela
            builder.ToTable("Tipos");
        }
    }
}
