//explicacao breve:
//A camada DAL recebe uma referencia da camada BLL, e essa camad principal recebe referencia das duas camadas 


using ControleFinanceiro.API;
using ControleFinanceiro.API.Validations;
using ControleFinanceiro.API.ViewModels;
using ControleFinanceiro.BLL.Models;
using ControleFinanceiro.DAL;
using ControleFinanceiro.DAL.Interfaces;
using ControleFinanceiro.DAL.Repositorios;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<Contexto>(opcoes => opcoes.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoBD")));

//especificacoes referente aos identities 
builder.Services.AddIdentity<Usuario, Funcao>().AddEntityFrameworkStores<Contexto>();
//               |
//               v
//aqui estamos adicionando as classes que herdam o identity (AddIdentity) e informamos por onde seu armazenamento sera feito (AddEntityFrameworkStores)
//apos isso e tambem de termos criado a string de conexao (classe contexto e appsettings.json), rode a aplicacao (build)
//e em seguida abra o console do gerenciador de pacotes, e no projeto padrao, mude para o DAL, que � onde est� o Contexto
//proximo passo: escreva o seguinte codigo no Console do gerenciador de pacotes para adicionar o 'migration', que � para criar o arquivo de configuracao:
//add-migration criacaoBancoDados
//apos isso, ele vai gerar um arquivo com todas as configura��es que criamos, e basta agora digitar no Console do gerenciador de pacotes:
//update-database que ele vai gerar/atualizar o bd

builder.Services.AddScoped<IRepositorioCategoria, RepositorioCategoria>();
builder.Services.AddScoped<IRepositorioTipo, RepositorioTipo>();
builder.Services.AddScoped<IRepositorioFuncao, RepositorioFuncao>();
builder.Services.AddScoped<IRepositorioCartao, RepositorioCartao>();
builder.Services.AddScoped<IRepositorioDespesa, RepositorioDespesa>();
builder.Services.AddScoped<IRepositorioGanhos, RepositorioGanho>();
builder.Services.AddScoped<IRepositorioMes, RepositorioMes>();
builder.Services.AddScoped<IRepositorioFuncao, RepositorioFuncao>();
builder.Services.AddScoped<IRepositorioUsuario, RepositorioUsuario>();
/* � criada uma �nica inst�ncia por requi��o. Ou seja, usando o exemplo de uma aplica��o Web, 
 * quando recebe uma nova requisi��o, por exemplo, um click num bot�o do outro lado do navegador, 
 * � criada uma inst�ncia, onde o escopo � essa requisi��o. 
 * Ent�o se for necess�ria a depend�ncia multiplas vezes na mesma requisi��o a mesma inst�ncia ser� usada. */

builder.Services.AddTransient<IValidator<Categoria>, CategoriaValidator>();
builder.Services.AddTransient<IValidator<Cartao>, CartaoValidator>();
builder.Services.AddTransient<IValidator<Despesa>, DespesaValidator>();
builder.Services.AddTransient<IValidator<Ganho>, GanhoValidator>();

builder.Services.AddTransient<IValidator<FuncoesViewModel>, FuncoesViewModelValidator>();
builder.Services.AddTransient<IValidator<RegistroViewModel>, RegistroViewModelValidator>();
builder.Services.AddTransient<IValidator<LoginViewModel>, LoginViewModelValidator>();
builder.Services.AddTransient<IValidator<AtualizarUsuarioViewModel>, AtualizarUsuarioViewModelValidator>();
//com isso estamos informando que categoria ter� uma propria classe para realizar suas valida��es

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    })
    .AddFluentValidation()
    .AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//comando para ignorar referencias circulares, que estao ocorrendo entre as classes tipo e categoria

var key = Encoding.ASCII.GetBytes(Settings.ChaveSecreta);

builder.Services.AddAuthentication(opcoes =>
{
    opcoes.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opcoes.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(opcoes =>
    {
        opcoes.RequireHttpsMetadata = false;
        opcoes.SaveToken = true;
        opcoes.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();




/* PASSO A PASSO DA CRIACAO DA API
   
   Dependencias a serem instaladas: 
      - EF Core,  --> API
      - EF Core Design,  --> API
      - EF Core Tools,  --> API
      - CodeGeneration.Design,  --> API, BLL, DAL
      - EF Core SqlServer,  --> DAL, API
      - Identity.EntityFrameworkCore,  --> DAL
      - Identity.Core,  --> BLL
      - Identity.Stores,  --> BLL


   1- Criar projeto ASP NET Core API;

   2- Configurar classe startup (CORS e etc), agora diretamente na program.cs;

   3- Instalar EF no projeto 

   4- Criar arquitetura do projeto (Cebola, Limpa, etc). Neste caso, uma especie de limpa;

   5- Criar as models (classes que ser�o uma especie de espelho de determinada tabela do bd. Representar�o uma tabela do bd);

   6- Criar os mapeamentos das classes, que possui como finalidade usar a classe para espelho de como ser� as configura��es da tabela do bd;

   7- Cria��o do contexto, que possui a fun��o de fazer as intera��es com o bd. Ir� aplicar as configura��es instanciando todos os mappers, e cuidar� de cada intera��o que sera feita na tabela;

   8- Na program.cs, adicionar as classes Identity e adicionar a classe Contexto criada (responsavel pela intera��o com o banco), e criar a string de conex�o com o bd;

   9- Defini��o das strings de conex�o no arquivo appsettings.json;

   10- Execute o build. Abra o Console do gerenciador de pacotes, mude o projeto o padr�o para a 'camada'/'projeto' em que est� a classe contexto e digite: add-migration;

   11- Deve gerar o arquivo com as configura��es que foram feitas e mapeadas. Digite updata-database para criar/atualizar o banco; 

   12- Cria��o das controllers: botao direito, add, controller na pasta controllers. Crie uma controller vazia ou usando o EF. Controller como API;

   13- Cria��o do padr�o reposit�rio: sua utilidade � para centralizar o acesso aos dados, 
       ou seja, ao inves de todo processo de acesso ao bd ser pela controller, e pelo reposit�rio. 
       Isso � um padr�o de mercado, boa estrutura de codigo.
       Primeiramnete, se cria a interface do repositorio, onde conter� as funcoes que serao implementadas pelo repositorio
       e depois cria��o da classe repositorio que implementar� a interface;
   
   14- Incluir repositorios na program.cs para que sejam inicializados por inje��o de dependencia, usando addScoped;
       � criada uma �nica inst�ncia por requisi��o;

   15- Incluir validacao de dados no servidor. Para isso, ser� usada a biblioteca fluent validation, que � baixada no projeto API;

   16- Incluir service.addTransient<classe de validacao> e tambem adicionar o fluentValidation como atributo do AddCOntrollers();

   17- Criacao das ViewModels | DTO 
 */