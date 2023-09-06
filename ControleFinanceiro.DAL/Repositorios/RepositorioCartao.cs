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
    public class RepositorioCartao : RepositorioGenerico<Cartao>, IRepositorioCartao
    {
        private readonly Contexto contexto;

        public RepositorioCartao(Contexto _contexto) : base(_contexto)
        {
            contexto = _contexto;
        }

        public IQueryable<Cartao> FiltrarCartoes(string numeroCartao)
        {

            try
            {
                return contexto.Cartoes.Where(c => c.Numero.Contains(numeroCartao));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Cartao> PegarCartoesPeloUsuarioId(string usuarioId)
        {
            try
            {
                return contexto.Cartoes.Where(c => c.UsuarioId == usuarioId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task<int> PegarQuantidadeCartoesPeloUsuarioId(string usuarioId)
        {
            try
            {
                return contexto.Cartoes.CountAsync(c => c.UsuarioId == usuarioId);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
