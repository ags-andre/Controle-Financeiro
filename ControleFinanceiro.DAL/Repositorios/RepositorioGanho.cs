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
    public class RepositorioGanho : RepositorioGenerico<Ganho>, IRepositorioGanhos
    {
        private readonly Contexto contexto;
        public RepositorioGanho(Contexto _contexto) : base(_contexto)
        {
            contexto = _contexto;
        }

        public IQueryable<Ganho> FiltrarGanhos(string nomeCategoria)
        {
            try
            {
                return contexto.Ganhos
                    .Include(g => g.Mes)
                    .Include(g => g.Categoria)
                    .ThenInclude(g => g.Tipo)
                    .Where(g => g.Categoria.Nome.Contains(nomeCategoria) && g.Categoria.Tipo.Nome.Contains("Ganho"));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Ganho> PegarGanhosPeloUsuarioId(string usuarioId)
        {
            return contexto.Ganhos
                .Include(g => g.Categoria)
                .Include(g => g.Mes)
                .Where(g => g.UsuarioId == usuarioId);
        }

        public async Task<double> PegarGanhoTotalPeloUsuarioId(string usuarioId)
        {
            return await contexto.Ganhos.Where(g => g.UsuarioId == usuarioId).SumAsync(g => g.Valor);
        }
    }
}
