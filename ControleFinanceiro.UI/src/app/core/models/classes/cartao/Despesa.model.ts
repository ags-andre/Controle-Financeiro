import { Categoria } from "../categoria/Categoria.model";
import { Cartao } from "./Cartao.model";

export class Despesa {
  id!: number;
  cartao!: Cartao;
  descricao!: string;
  categoriaId!: number;
  categoria!: Categoria;
  valor!: number;
  dia!: number;
  mesId!: number;
  mes!: Mes;
  ano!: number;
  usuarioId!: number;

  constructor(despesa: Despesa) {
    this.id = despesa.id;
    this.cartao = despesa.cartao;
    this.descricao = despesa.descricao;
    this.categoriaId = despesa.categoriaId;
    this.categoria = despesa.categoria;
    this.valor = despesa.valor;
    this.dia = despesa.dia;
    this.mesId = despesa.mesId;
    this.mes = despesa.mes;
    this.ano = despesa.ano;
    this.usuarioId = despesa.usuarioId;
  }
}

export class Mes {
  id!: number;
  nome!: string;
}
