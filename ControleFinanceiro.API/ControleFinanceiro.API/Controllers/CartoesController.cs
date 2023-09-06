using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartoesController : ControllerBase
    {
        private readonly IRepositorioCartao repositorioCartao;
        private readonly IRepositorioDespesa repositorioDespesa;
        private readonly IRepositorioUsuario repositorioUsuario;

        public CartoesController(IRepositorioCartao _repositorioCartao, IRepositorioDespesa _repositorioDespesa, IRepositorioUsuario repositorioUsuario)
        {
            repositorioCartao = _repositorioCartao;
            repositorioDespesa = _repositorioDespesa;
            this.repositorioUsuario = repositorioUsuario;

        }

        [HttpGet("PegarPorId/{id}")]
        public async Task<ActionResult<Cartao>> PegarPorId(int id)
        {
            if(id == null || id == 0)
            {
                return BadRequest(new { mensagem = "Parâmetro id inválido!"});
            }

            Cartao cartao = await repositorioCartao.PegarPeloId(id);
            if(cartao == null)
            {
                return NotFound(new { mensagem = "Cartão não encontrado!"});
            }
            return Ok(cartao);
        }

        [HttpGet("PegarCartoesPeloUsuarioID/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Cartao>>> PegarCartoesPeloUsuarioID(string idUsuario)
        {
            if(idUsuario == null || idUsuario == "")
            {
                return BadRequest(new { mensagem = "Parâmetro id inválido!" });
            }

            var cartoes = await repositorioCartao.PegarCartoesPeloUsuarioId(idUsuario).ToListAsync();
            Usuario usuario = await repositorioUsuario.PegarPeloId(idUsuario);

            if(cartoes.Count == 0)
            {
                return NotFound(new { mensagem = $"Nenhum cartão encontrado para o usuário {usuario.UserName}"});
            }

            return Ok(cartoes);
        }

        [HttpPost("NovoCartao")]
        public async Task<ActionResult> NovoCartao(Cartao cartao)
        {
            if(ModelState.IsValid)
            {
                await repositorioCartao.Inserir(cartao);
                return Ok(new { mensagem = "Cartão cadastrado com sucesso!" });  
            } else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
                //return BadRequest(new { mensagem = "Cartão inválido!"});
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarCartao(Cartao cartao, int id)
        {
            if(ModelState.IsValid)
            {
                if(cartao.Id != id)
                {
                    return BadRequest(new { mensagem = "Id informado não correpondeao Id do cartão!" });
                }
                /*Cartao cartao = await repositorioCartao.PegarPeloId(id);
                if(cartao == null)
                {
                    return NotFound(new { mensagem = "Cartao não encontrado!"});
                }*/
                await repositorioCartao.Atualizar(cartao);
                return Ok(new { mensagem = $"Cartão número {cartao.Numero} atualizado com sucesso!"});
            }
            else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
                // return BadRequest(new { mensagem = "Cartão inválido!" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletarCartao(int id)
        {
            if (id == null || id == 0)
            {
                return BadRequest(new { mensagem = "Parâmetro id inválido!" });
            }
            Cartao cartao = await repositorioCartao.PegarPeloId(id);

            if(cartao == null)
            {
                return NotFound(new { mensagem = "Cartão não encontrado!" });
            }

            IEnumerable<Despesa> despesas = await repositorioDespesa.PegarDespesasPeloCartaoId(id);
            repositorioDespesa.ExcluirDespesas(despesas);

            await repositorioCartao.Excluir(id);
            return Ok(new { mensagem = $"Cartão número {cartao.Numero} excluído com sucesso!"});
        }
    }
}
