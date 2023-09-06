using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class RepositorioMes : RepositorioGenerico<Mes>, IRepositorioMes
    {
        private readonly Contexto contexto;
        public RepositorioMes(Contexto _contexto) : base(_contexto)
        {
            contexto = _contexto;
        }

        public new IQueryable<Mes> PegarTodos()
        {
            try
            {
                return contexto.Meses.OrderBy(m => m.Id);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
