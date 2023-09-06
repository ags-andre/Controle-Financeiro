export class DadosRegistro {
  nomeUsuario!: string;
  cpf!: number;
  profissao!: string;
  foto!: File;
  email!: string;
  senha!: string;

  constructor(usuario: DadosRegistro) {
    this.nomeUsuario = usuario.nomeUsuario;
    this.cpf = usuario.cpf;
    this.profissao = usuario.profissao;
    this.foto = usuario.foto;
    this.email = usuario.email;
    this.senha = usuario.senha
  }
}

