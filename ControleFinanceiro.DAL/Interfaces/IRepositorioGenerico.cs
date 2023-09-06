using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Interfaces
{
    public interface IRepositorioGenerico<TEntity> where TEntity : class
        //TEntity é definido em tempo de compilacao e ele extende uma classe
    {
        IQueryable<TEntity> PegarTodos();
        //mias utilizado pra quando vir mais de um elemento
        Task<TEntity> PegarPeloId(int id);
        Task<TEntity> PegarPeloId(string id);
        Task Inserir(List<TEntity> entity);
        Task Inserir(TEntity entity);
        Task Atualizar(TEntity entity);
        Task Excluir(int id);
        Task Excluir(string id);
    }
}
