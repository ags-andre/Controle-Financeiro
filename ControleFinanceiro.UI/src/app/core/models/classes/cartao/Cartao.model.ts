import { Despesa } from "./Despesa.model";

export class Cartao {
  id!: number;
  nome!: string;
  bandeira!: string;
  numero!: string;
  limite!: number;
  usuarioId!: string;
  despesas?: Despesa[]

  constructor(cartao: Cartao) {
    this.id = cartao.id;
    this.nome = cartao.nome;
    this.bandeira = cartao.bandeira;
    this.numero = cartao.numero;
    this.limite = cartao.limite;
    this.usuarioId = cartao.usuarioId;
  }
}
