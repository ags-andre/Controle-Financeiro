namespace ControleFinanceiro.API.ViewModels
{
    public class AtualizarUsuarioViewModel
    {
        public string Id { get; set; }

        public string NomeUsuario { get; set; }

        public string Email { get; set; }

        public string CPF { get; set; }

        public string Profissao { get; set; }

        public byte[] Foto { get; set; }

        public string Senha { get; set; }
    }
}
