using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class RepositorioDespesa : RepositorioGenerico<Despesa>, IRepositorioDespesa
    {
        private readonly Contexto contexto;

        public RepositorioDespesa(Contexto _contexto) : base(_contexto)
        {
            contexto = _contexto;
        }

        public void ExcluirDespesas(IEnumerable<Despesa> despesas)
        {
            try
            {
                contexto.Despesas.RemoveRange(despesas);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Despesa> FiltrarDespesas(string nomeCategoria)
        {
            try
            {
                return contexto.Despesas
                    .Include(d => d.Cartao).Include(d => d.Mes)
                    .Include(d => d.Categoria).ThenInclude(d => d.Tipo)
                    .Where(d => d.Categoria.Nome.Contains(nomeCategoria) && d.Categoria.Tipo.Nome == "Despesa");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Despesa>> PegarDespesasPeloCartaoId(int cartaoId)
        {
            try
            {
                return await contexto.Despesas.Where(d => d.CartaoId == cartaoId).Include(d => d.Categoria).ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Despesa> PegarDespesasPeloUsuarioId(string usuarioId)
        {
            try
            {
                return contexto.Despesas
                    .Include(d => d.Cartao)
                    .Include(c => c.Categoria)
                    .Include(c => c.Mes)
                    .Where(d => d.UsuarioId == usuarioId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<double> PegarDespesaTotalPorUsuarioId(string usuarioId)
        {
            try
            {
                return await contexto.Despesas.Where(d => d.UsuarioId == usuarioId).SumAsync(d => d.Valor);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
