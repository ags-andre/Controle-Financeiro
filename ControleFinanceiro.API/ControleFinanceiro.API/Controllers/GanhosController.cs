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
    public class GanhosController : ControllerBase
    {
        private readonly IRepositorioGanhos repositorioGanhos;
        public GanhosController(IRepositorioGanhos _repositorioGanhos) {
            repositorioGanhos = _repositorioGanhos;
        }

        [HttpGet("PegarGanhosPeloUsuarioId/{id}")]
        public async Task<ActionResult<IEnumerable<Ganho>>> PegarGanhosPeloUsuarioID(string id)
        {
            if (id == null || id == "")
            {
                return BadRequest(new { mensagem = "Id inválido" });
            }
            var ganhos = await repositorioGanhos.PegarGanhosPeloUsuarioId(id).ToListAsync();
            if (ganhos.Count == 0)
            {
                return NotFound(new { mensagem = "Nenhum ganho registrado para esse usuário" });
            }
            return Ok(ganhos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ganho>> PegarGanhoPeloId(int id)
        {
            if(id == 0 || id == null)
            {
                return BadRequest(new { mensagem = "Id inválido" });
            }

            Ganho ganho = await repositorioGanhos.PegarPeloId(id);

            if(ganho == null) {
                return NotFound(new { mensagem = "Ganho não encontrado" });
            }

            return Ok(ganho);
        }

        [HttpPost]
        public async Task<ActionResult> InserirGanho(Ganho ganho)
        {
            if(ganho == null)
            {
                return BadRequest(new { mensagem = "Objeto Ganho nulo!" });
            }

            if(!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            } else
            {
                await repositorioGanhos.Inserir(ganho);
                return Ok(new { mensagem = "Ganho inserido com sucesso!" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarGanho(int id, Ganho ganho)
        {
            if(id != ganho.Id)
            {
                return BadRequest(new { mensagem = "Id informado não corresponde ao id do Ganho informado" });
            }
            if(!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            } else
            {
                await repositorioGanhos.Atualizar(ganho);
                return Ok(new { mensagem = "Ganho atualizado com sucesso!" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> ExcluirGanho(int id)
        {
            if(id == null || id == 0)
            {
                return BadRequest(new { mensagem = "Id inválido" });
            }

            await repositorioGanhos.Excluir(id);
            return Ok(new { mensagem = "Ganho excluído com sucesso" });
        }
    }
}
