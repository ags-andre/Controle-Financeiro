using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.DAL.Repositorios
{
    public class RepositorioUsuario : RepositorioGenerico<Usuario>, IRepositorioUsuario
    {
        private readonly Contexto contexto;
        private readonly UserManager<Usuario> gerenciadorUsuarios;
        private readonly SignInManager<Usuario> gerenciadorLogin;

        public RepositorioUsuario(Contexto _contexto, UserManager<Usuario> _gerenciadorUsuarios, SignInManager<Usuario> _gerenciadorLogin) : base(_contexto)
        {
            contexto = _contexto;
            gerenciadorUsuarios = _gerenciadorUsuarios;
            gerenciadorLogin = _gerenciadorLogin;
        }

        public async Task AtualizarUsuario(Usuario usuario)
        {
            try
            {
                await gerenciadorUsuarios.UpdateAsync(usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IdentityResult> CriarUsuario(Usuario usuario, string senha)
        {
            try
            {
                return await gerenciadorUsuarios.CreateAsync(usuario, senha);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task IncluirUsuarioEmFuncao(Usuario usuario, string funcao)
        {
            try
            {
                await gerenciadorUsuarios.AddToRoleAsync(usuario, funcao);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task LogarUsuario(Usuario usuario, bool lembrar)
        {
            try
            {
                await gerenciadorLogin.SignInAsync(usuario, false);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IList<string>> PegarFuncoesUsuario(Usuario usuario)
        {
            try
            {
                return await gerenciadorUsuarios.GetRolesAsync(usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<int> PegarQuantidadeUsuariosRegistrados()
        {
            try
            {
                return await contexto.Usuarios.CountAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Usuario> PegarUsuarioPeloEmail(string email)
        {
            try
            {
                return await gerenciadorUsuarios.FindByEmailAsync(email);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
