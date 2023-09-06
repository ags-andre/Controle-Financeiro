using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;

namespace ControleFinanceiro.DAL.Repositorios
{

    public class RepositorioTipo : RepositorioGenerico<Tipo>, IRepositorioTipo
    {
        private readonly Contexto _contexto;

        public RepositorioTipo(Contexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }

        public Task Atualizar(Tipo entity)
        {
            throw new NotImplementedException();
        }

        public Task Inserir(List<Tipo> entity)
        {
            throw new NotImplementedException();
        }

        public Task Inserir(Tipo entity)
        {
            throw new NotImplementedException();
        }

        Task<Tipo> IRepositorioGenerico<Tipo>.PegarPeloId(int id)
        {
            throw new NotImplementedException();
        }

        Task<Tipo> IRepositorioGenerico<Tipo>.PegarPeloId(string id)
        {
            throw new NotImplementedException();
        }

        IQueryable<Tipo> IRepositorioGenerico<Tipo>.PegarTodos()
        {
            try
            {
                return _contexto.Tipos;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
