using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL;
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
    public class CategoriaController : ControllerBase
    {
        //base
        private readonly IRepositorioCategoria _repositorioCategoria;

        public CategoriaController(IRepositorioCategoria repositorioCategoria)
        {
            _repositorioCategoria = repositorioCategoria;
        }

        //API's Rest

        //GET: api/Categoria
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoria()
        {
            return await _repositorioCategoria.PegarTodos().ToListAsync();

        }

        // GET: api/Categoria/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            var categoria = await _repositorioCategoria.PegarPeloId(id);

            if (categoria == null)
            {
                return NotFound();
            }

            return categoria;
        }

        [HttpGet("FiltrarCategoriasDespesas")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasDespesas()
        {
            return await _repositorioCategoria.PegarCategoriasPeloTipo("Despesa").ToListAsync();
        }

        [HttpGet("FiltrarCategoriasGanhos")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltrarCategoriasGanhos()
        {
            return await _repositorioCategoria.PegarCategoriasPeloTipo("Ganho").ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            if (ModelState.IsValid)
                //ModelState representa a model passada para o post/put, neste caso, o categoria
            {
                await _repositorioCategoria.Inserir(categoria);

                return Ok(new { mensagem = $"Categoria {categoria.Nome} cadastrada com sucesso" });
            }
            else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
                //return BadRequest(new { mensagem = "Categoria inválida!" });
            }

            //return BadRequest(ModelState);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria(int id, Categoria categoria)
        {
            if (id != categoria.Id)
            {
                return BadRequest();
            }

            if(ModelState.IsValid)
            {
                await _repositorioCategoria.Atualizar(categoria);

                return Ok(new { mensagem = $"Categoria {categoria.Nome} atualizada com sucesso"});
            }
            else
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(new { mensagem = errors });
                //return BadRequest(new { mensagem = "Categoria inválida!" });
            }
            //retorna um erro 400, e com o modelState ele informa qual o erro encontrado em nosso model
        }

        // DELETE: api/Categoria/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categoria>> DeleteCategoria(int id)
        {
            var categoria = await _repositorioCategoria.PegarPeloId(id);
            if (categoria == null)
            {
                return NotFound();
            }

            await _repositorioCategoria.Excluir(id);

            return Ok(new { mensagem = $"Categoria {categoria.Nome} excluída com sucesso" });
        }


        [HttpGet("FiltrarCategorias/{nomeCategoria}")]
        public async Task<ActionResult<IEnumerable<Categoria>>> FiltarCategoria(string nomeCategoria)
        {
            return await _repositorioCategoria.FiltrarCategorias(nomeCategoria).ToListAsync();
        }

        /*private bool CategoriaExists(int id)
        {
            return _contexto.Categorias.Any(e => e.CategoriaId == id);
        }*/
    }
}
