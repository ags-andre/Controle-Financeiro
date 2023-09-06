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
    public class FuncaoMap : IEntityTypeConfiguration<Funcao>
    {
        public void Configure(EntityTypeBuilder<Funcao> builder)
        {
            builder.Property(f => f.Id).ValueGeneratedOnAdd();
            //funcao nao possui uma propriedade de Id (FUncaoId por exemplo)
            //portanto, usamos os atributos que o entity framework tem por padrão, que neste caso será o ID (também possui name e etc)
            //e tambem informamos que esse id será gerado automaticamente a cada adição de uma nova função no banco

            builder.Property(f => f.Descricao).IsRequired().HasMaxLength(50);

            builder.HasData(
                new Funcao
                {
                    Id = Guid.NewGuid().ToString(),
                    //Guid.NewGuid() gera um hashcode para esse id,
                    //e o convertemos para string, ou seja, queremos que o id que irá gerar automaticamente seja um hashcode
                    Name = "Administrador",
                    NormalizedName = "ADMINISTRADOR",
                    //a funcao usa esse pra comparar valores
                    Descricao = "Administrador do sistema"

                    //Resumo: os 3 primeiros atributos são padrões do entity framework, e estamos atribuindo valores a eles, e o Id foi configurado anteriormente
                },
                new Funcao
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Usuario",
                    NormalizedName = "USUARIO",
                    Descricao = "Usuario do sistema"
                });


            builder.ToTable("Funcao");
        }
    }
}
