export class DadosLogin {
  constructor(private email: string, private senha: string){}
}

export class UsuarioLogado {
  tokenUsuarioLogado!: string;
  ///mensagem!: string;
  idUsuario!: string | number;
  emailUsuarioLogado!: string;
  //nomeUsuario!: string;

  constructor(retornoLogin: UsuarioLogado) {
    this.tokenUsuarioLogado = retornoLogin.tokenUsuarioLogado;
    //this.mensagem = retornoLogin.mensagem;
    this.idUsuario = retornoLogin.idUsuario;
    this.emailUsuarioLogado = retornoLogin.emailUsuarioLogado;
    //this.nomeUsuario = retornoLogin.nomeUsuario;
  }
}
