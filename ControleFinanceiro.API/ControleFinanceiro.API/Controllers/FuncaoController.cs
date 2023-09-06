using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using ControleFinanceiro.DAL.Repositorios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncaoController : ControllerBase
    {
        private readonly IRepositorioFuncao _repositorioFuncao;

        public FuncaoController(IRepositorioFuncao repositorioFuncao)
        {
            _repositorioFuncao = repositorioFuncao;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuncoesViewModel>>> GetFuncoes()
        {
            var funcoes = await _repositorioFuncao.PegarTodos().ToListAsync();

            if (funcoes == null)
            {
                return NotFound();
            }
            var f = new List<FuncoesViewModel>();
            foreach (var funcao in funcoes) { 
                FuncoesViewModel newFuncao = new FuncoesViewModel
                {
                    Descricao = funcao.Descricao,
                    Id = funcao.Id,
                    Nome = funcao.Name
                };
                f.Add(newFuncao);
            }
            return f;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FuncoesViewModel>> GetFuncao(string id)
        {
            var funcao = await _repositorioFuncao.PegarPeloId(id);

            if (funcao == null)
            {
                return NotFound();
            }
            FuncoesViewModel f = new() { 
                Nome = funcao.Name,
                Id = funcao.Id,
                Descricao = funcao.Descricao
            };

            return f;
        }

        [HttpGet("FiltrarFuncoes/{nomeFuncao}")]
        public async Task<ActionResult<IEnumerable<Funcao>>> FiltrarFuncoes(string nomeFuncao)
        {
            var funcoes = await _repositorioFuncao.FiltrarFuncoes(nomeFuncao).ToListAsync();
            if(funcoes == null || funcoes.Count == 0)
            {
                return NotFound(new { Mensagem = "Função não encontrada"});
            }
            else
            {
                return funcoes;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Funcao>> PostFuncao(FuncoesViewModel funcoes)
        {
            if (ModelState.IsValid)
            {
                Funcao funcao = new()
                {
                    Id = funcoes.Id,
                    Name = funcoes.Nome,
                    Descricao = funcoes.Descricao
                };
                await _repositorioFuncao.AdicionarFuncao(funcao);
                return Ok(new
                {
                    mensagem = $"Função {funcao.Name} cadastrada com sucesso"
                });
            }
            else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncao(string id, FuncoesViewModel funcoes)
        {
            if (id != funcoes.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                Funcao funcao = new Funcao
                {
                    Id = funcoes.Id,
                    Name = funcoes.Nome,
                    Descricao = funcoes.Descricao
                };

                await _repositorioFuncao.AtualizarFuncao(funcao);
                return Ok(new
                {
                    mensagem = $"Função {funcao.Name} atualizada com sucesso"
                });
            }
            else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Funcao>> DeleteFuncao(string id)
        {
            var funcao = await _repositorioFuncao.PegarPeloId(id);
            if (funcao == null)
            {
                return NotFound();
            }

            await _repositorioFuncao.Excluir(funcao.Id);
            return Ok(new
            {
                mensagem = $"Função {funcao.Name} excluída com sucesso"
            });
        }
    }
}
