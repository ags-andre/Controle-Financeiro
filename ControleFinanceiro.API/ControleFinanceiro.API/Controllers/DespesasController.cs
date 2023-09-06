using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using ControleFinanceiro.DAL.Repositorios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace ControleFinanceiro.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : ControllerBase
    {
        private readonly IRepositorioDespesa repositorioDespesa;

        public DespesasController(IRepositorioDespesa _repositorioDespesa)
        {
            repositorioDespesa = _repositorioDespesa;
        }

        [HttpGet("DespesasDoCartao/{idCartao}")]
        public async Task<ActionResult<IEnumerable<Despesa>>> PegarDespesasDoCartao(int idCartao)
        {
            if (idCartao == null || idCartao == 0)
            {
                return BadRequest(new { mensagem = "Parâmetro id inválido!" });
            }
            var despesas = await repositorioDespesa.PegarDespesasPeloCartaoId(idCartao);

            if (despesas.ToList().Count == 0)
            {
                return NotFound(new { mensagem = $"Despesas não encontradas para o cartão de id {idCartao}" });
            }
            return Ok(despesas);
        }

        [HttpGet("PegarDespesasPeloUsuarioId/{id}")]
        public async Task<ActionResult<IEnumerable<Despesa>>> PegarDespesasPeloUsuarioID(string id)
        {
            if (id == "" || id == null)
            {
                return BadRequest(new { mensagem = "ID inválido" });
            }

            var despesas = await repositorioDespesa.PegarDespesasPeloUsuarioId(id).ToListAsync();
            if (despesas.Count == 0)
            {
                return NotFound(new { mensagem = "Despesas não encontradas" });
            }

            return Ok(despesas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> PegarDespesaPeloID(int id)
        {
            if(id == 0)
            {
                return BadRequest(new { mensagem = "ID inválido" });
            }
            Despesa despesa = await repositorioDespesa.PegarPeloId(id);

            if(despesa == null)
            {
                return NotFound(new { mensagem = "Despesa não encontrada" });
            }
            return Ok(despesa);
        }

        [HttpPost]
        public async Task<ActionResult> InserirDespesa(Despesa despesa)
        {
            if(despesa == null)
            {
                return BadRequest(new { mensagem = "Despesa nula" });
            }
            if(!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            } else
            {
                await repositorioDespesa.Inserir(despesa);
                return Ok(new { mensagem = "Despesa inserida com sucesso!" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarDespesa(int id, Despesa despesa)
        {
            if (id != despesa.Id)
            {
                return BadRequest(new { mensagem = "Id informado não corresponde ao id da Despesa informada" });
            }
            if (!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            }
            else
            {
                await repositorioDespesa.Atualizar(despesa);
                return Ok(new { mensagem = "Despesa atualizada com sucesso!" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> ExcluirDespesa(int id)
        {
            if (id == 0)
            {
                return BadRequest(new { mensagem = "Id inválido" });
            }
            await repositorioDespesa.Excluir(id);
            return Ok(new { mensagem = "Despesa excluida com sucesso!" });
        }
    }
}
