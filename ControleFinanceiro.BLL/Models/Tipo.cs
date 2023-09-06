using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.BLL.Models
{
    public class Tipo
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        //colecao de categorias
        public virtual ICollection<Categoria> Categorias { get; set; }
    }
}
