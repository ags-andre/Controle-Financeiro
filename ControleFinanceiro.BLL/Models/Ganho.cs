  using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.BLL.Models
{
    public class Ganho
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

        public double Valor { get; set; }

        public int Dia { get; set; }

        public int MesId { get; set; }
        public Mes Mes { get; set; }
        public int Ano { get; set; }

        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
