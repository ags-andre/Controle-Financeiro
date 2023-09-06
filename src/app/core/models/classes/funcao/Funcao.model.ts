export class Funcao {
  id!: string;
  nome!: string;
  descricao!: string

  constructor(id: string, funcao: Funcao) {
    this.id = id;
    this.nome = funcao.nome;
    this.descricao = funcao.descricao;
  }
}
