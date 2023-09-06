import { Categoria } from "../categoria/Categoria.model";

export class Ganho {
  id!: number;
  descricao!: string;
  categoriaId!: number;
  categoria!: Categoria;
  valor!: number;
  dia!: number;
  mesId!: number;
  ano!: number;
  usuarioId!: string;

  constructor(_ganho: Ganho) {
    this.id = _ganho.id;
    this.descricao = _ganho.descricao;
    this.categoriaId = _ganho.categoriaId;
    this.categoria = _ganho.categoria;
    this.valor = _ganho.valor;
    this.dia = _ganho.dia;
    this.mesId = _ganho.mesId;
    this.ano = _ganho.ano;
    this.usuarioId = _ganho.usuarioId;
  }
}
