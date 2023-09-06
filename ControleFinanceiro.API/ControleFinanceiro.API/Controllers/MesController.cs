using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MesController : ControllerBase
    {
        private readonly IRepositorioMes repositorioMes;
        public MesController(IRepositorioMes _repositorioMes) {
            repositorioMes = _repositorioMes;
        }

        [HttpGet]
        public async Task<ActionResult<Mes>> Meses()
        {
            var meses = await repositorioMes.PegarTodos().ToListAsync();
            if(meses.Count == 0)
            {
                return NotFound(new { mensagem = "Nenhum mês encontrado" });
            }

            return Ok(meses);
        }
    }
}
