using ControleFinanceiro.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class RepositorioGenerico<TEntity> : IRepositorioGenerico<TEntity> where TEntity : class
    {
        //base
        private readonly Contexto _contexto;

        public RepositorioGenerico(Contexto contexto)
        {
            _contexto = contexto;
        }

        public IQueryable<TEntity> PegarTodos()
        {
            try
            {
                return _contexto.Set<TEntity>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<TEntity> PegarPeloId(int id)
        {
            try
            {
                var entity = await _contexto.Set<TEntity>().FindAsync(id);
                return entity;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<TEntity> PegarPeloId(string id)
        {
            try
            {
                var entity = await _contexto.Set<TEntity>().FindAsync(id);
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Inserir(TEntity entity)
        {
            try
            {
                await _contexto.AddAsync(entity);
                await _contexto.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task Inserir(List<TEntity> entity)
        {
            try
            {
                await _contexto.AddRangeAsync(entity); //range é para salvar vários registros
                await _contexto.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Atualizar(TEntity entity)
        {
            try
            {
                var registro = _contexto.Set<TEntity>().Update(entity);
                registro.State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task Excluir(int id)
        {
            try
            {
                var entity = await PegarPeloId(id);
                _contexto.Set<TEntity>().Remove(entity);
                await _contexto.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Excluir(string id)
        {
            try
            {
                var entity = await PegarPeloId(id);
                _contexto.Set<TEntity>().Remove(entity);
                await _contexto.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}



/* Comentários */

//<TEntity>
    //É uma classe base para representar genericamente entidades e não deve ser usada diretamente.

//_contexto.Set<TEntity>();
    //Cria uma coleção que não contém elementos duplicados e não se formam em ordem específica. Escalável.

//_contexto.SaveChangesAsync();
    //Salva os dados no banco de dado async, após realizar alguma ação que afeta o mesmo

//_contexto.Set<TEntity>().FindAsync(id);
    //Procura o 'id' de forma async na coleção.

//var registro = _contexto.Set<TEntity>().Update(entity);
    // Atualiza uma coleção e salva na variável registro, com o parâmetro já salvo

//registro.State = EntityState.Modified;
    //O State informa ao Entity Framework o estado do seu objeto.

//_contexto.AddAsync(entity);
    //Adiciona a entidade de forma async na tabela

//_contexto.AddRangeAsync(entity);
    //Adiciona uma lista de entidades na tabela

//_contexto.Set<TEntity>().Remove(entity);
    //Remove a entidade de forma async da coleção genérica