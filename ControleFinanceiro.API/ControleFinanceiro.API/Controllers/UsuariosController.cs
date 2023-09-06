using ControleFinanceiro.API.Services;
using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IRepositorioUsuario repositorioUsuario;

        public UsuariosController(IRepositorioUsuario _repositorioUsuario)
        {
             repositorioUsuario = _repositorioUsuario;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> PegarPeloId(string id)
        {
            if(id == null || id == "")
            {
                return BadRequest(new { mesnagem = "Parâmetro id inválido" });
            }

            Usuario usuario = await repositorioUsuario.PegarPeloId(id);

            if(usuario == null)
            {
                return NotFound(new { mensagem = "Usuário não encontrado!"});
            }
            RegistroViewModel usuarioVM = new() { 
                CPF = usuario.CPF,
                Email = usuario.Email,
                Foto = usuario.Foto,
                NomeUsuario = usuario.UserName,
                Profissao = usuario.Profissao,
                Senha = usuario.PasswordHash
            };

            return Ok(usuarioVM);
        }

        /*
         * [HttpGet("{id}")]
        public async Task<ActionResult<AtualizarUsuarioViewModel>> GetUsuario(string id)
        {
            var usuario = await _usuarioRepositorio.PegarPeloId(id);

            if (usuario == null)
            {
                return NotFound();
            }

            AtualizarUsuarioViewModel model = new AtualizarUsuarioViewModel
            {
                Id = usuario.Id,
                UserName = usuario.UserName,
                Email = usuario.Email,
                CPF = usuario.CPF,
                Profissao = usuario.Profissao,
                Foto = usuario.Foto
            };

            return model;
        }
         */

        [HttpPost("SalvarFoto")]
        public async Task<ActionResult> SalvarFoto()
        {
            var foto = Request.Form.Files[0];
            byte[] b;

            using (var openReadStream = foto.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    await openReadStream.CopyToAsync(memoryStream);
                    b = memoryStream.ToArray();
                }
            }

            return Ok(new
            {
                foto = b
            });
        }

        [HttpPost("RegistrarUsuario")]
        public async Task<ActionResult> RegistrarUsuario(RegistroViewModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult usuarioCriado;
                string funcaoUsuario;

                Usuario usuario = new Usuario
                {
                    UserName = model.NomeUsuario,
                    Email = model.Email,
                    PasswordHash = model.Senha,
                    CPF = model.CPF,
                    Profissao = model.Profissao,
                    Foto = model.Foto
                };

                if (await repositorioUsuario.PegarQuantidadeUsuariosRegistrados() > 0)
                {
                    funcaoUsuario = "Usuario";
                }
                else
                {
                    funcaoUsuario = "Administrador";
                }

                usuarioCriado = await repositorioUsuario.CriarUsuario(usuario, model.Senha);

                if (usuarioCriado.Succeeded)
                {
                    await repositorioUsuario.IncluirUsuarioEmFuncao(usuario, funcaoUsuario);
                    var token = TokenService.GerarToken(usuario, funcaoUsuario);
                    await repositorioUsuario.LogarUsuario(usuario, false);

                    return Ok(new
                    {
                        emailUsuarioLogado = usuario.Email,
                        usuarioId = usuario.Id,
                        tokenUsuarioLogado = token
                    });
                }
                else
                {
                    return BadRequest(new { mensagem = "Falha ao criar o usuário!" });
                }
            }
            var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
            return BadRequest(new { mensagem = errors });
            //return BadRequest(model);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LogarUsuario(LoginViewModel loginModel)
        {
            if (ModelState.IsValid) 
            {
                Usuario usuario = await repositorioUsuario.PegarUsuarioPeloEmail(loginModel.Email);

                if(usuario == null)
                {
                    return NotFound(new { mensagem = "Email e / ou senha inválidos" });
                }

                PasswordHasher<Usuario> passwordHasher = new PasswordHasher<Usuario>();

                if (usuario.PasswordHash == loginModel.Senha)
                {
                    var funcoesUsuario = await repositorioUsuario.PegarFuncoesUsuario(usuario);
                    var token = TokenService.GerarToken(usuario, funcoesUsuario.First());
                    await repositorioUsuario.LogarUsuario(usuario, false);

                    return Ok(new
                    {
                        emailUsuarioLogado = usuario.Email,
                        idUsuario = usuario.Id,
                        tokenUsuarioLogado = token
                    });
                }
                
                return NotFound(new { mensagem = "Email e / ou senha inválidos" });
            }
            else
            {
                return BadRequest(new { mensagem = "Parâmetros de login inválidos!" });
            }
        }

        [HttpGet("RetornarFotoUsuario/{usuarioId}")]
        public async Task<dynamic> RetornarFotoUsuario(string usuarioId)
        {
            Usuario usuario = await repositorioUsuario.PegarPeloId(usuarioId);

            return new { imagem = usuario.Foto };
        }

        [Authorize]
        [HttpPut("AtualizarUsuario")]
        public async Task<ActionResult> AtualizarUsuario(AtualizarUsuarioViewModel model)
        {
            if (ModelState.IsValid)
            {
                Usuario usuario = await repositorioUsuario.PegarPeloId(model.Id);
                usuario.UserName = model.NomeUsuario;
                usuario.PasswordHash = model.Senha;
                usuario.Email = model.Email;
                usuario.CPF = model.CPF;
                usuario.Profissao = model.Profissao;
                usuario.Foto = model.Foto;

                await repositorioUsuario.AtualizarUsuario(usuario);

                return Ok(new
                {
                    mensagem = $"Usuário {usuario.Email} atualizado com sucesso"
                });
            }

            var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
            return BadRequest(new { mensagem = errors });
        }
    }
}
