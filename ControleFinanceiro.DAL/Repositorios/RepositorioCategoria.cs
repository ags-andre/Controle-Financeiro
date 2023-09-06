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
    public class RepositorioCategoria : RepositorioGenerico<Categoria>, IRepositorioCategoria
    {
        private readonly Contexto _contexto;

        public RepositorioCategoria(Contexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }

        public new IQueryable<Categoria> PegarTodos()
        {
            try
            {
                return _contexto.Categorias.Include(c => c.Tipo);
                //include: esta incluindo a classe tipo no retorno, sendo um atributo de categoria. Apesar de estar assim na classe, ele sem o include nao retorna o tipo
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public new async Task<Categoria> PegarPeloId(int id)
        {
            try
            {
                var entity = await _contexto.Categorias.Include(c => c.Tipo).FirstOrDefaultAsync(c => c.Id == id);
                return entity;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<Categoria> FiltrarCategorias(string nome)
        {
            try
            {
                var entity = _contexto.Categorias.Include(c => c.Tipo).Where(c => c.Nome.Contains(nome));
                //Contains ao inves de  == porque queremos verificar se existe algum nome que contenha a string passada em seu escopo
                return entity;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<Categoria> PegarCategoriasPeloTipo(string tipo)
        {
            try
            {
                return _contexto.Categorias.Include(c => c.Tipo).Where(c => c.Tipo.Nome == tipo);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}



/* Comentários */

//IQueryable
//Permite que você crie consultas usando Where, OrderBy ou Select. Consultas que retornam uma quantidade indefinida de itens

//_contexto.Categorias.Include(c => c.Tipo)
//Faz um join na tabela Tipo | Usa a foreign key tipoId da tabela categoria junto com a primary key 'tipoId' da tabela Tipo
//E retorna os dados da tabela Tipo, com base na igualdade do 'tipoId' entre as duas tabelas.

//_contexto.Categorias.Include(c => c.Tipo).FirstOrDefaultAsync(c => c.CategoriaId == id);
//Faz a comparação do parâmetro 'id', com a 'CategoriaId' da tabela Categoria e retorna a Categoria com o mesmo id

//_contexto.Categorias.Include(c => c.Tipo).Where(c => c.Nome.Contains(nomeCategoria))
//O 'Where' usado nessa expressão é para filtrar a propriedade 'Nome' da tabela de Categorias e retornar apenas
//as que possuem o parâmetro nomeCategoria igual a propriedade