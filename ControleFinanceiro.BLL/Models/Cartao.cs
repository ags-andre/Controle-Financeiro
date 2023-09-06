using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.BLL.Models
{
    public class Cartao
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Bandeira { get; set; }
        public string Numero { get; set; }
        public double Limite { get; set; }
        public string UsuarioId { get; set; }
        //chave estrangeira que fará o relacionamento entre a Tabela referente ao cartao e a tabela referente ao usuario 
        //é do tipo string porque será utilizado o Identity, que possui classes prontas com atributos pré-definidos, e sua chave primária é do tipo string
        public Usuario Usuario { get; set; }
        public virtual ICollection<Despesa> Despesas { get; set; }

    }
}
