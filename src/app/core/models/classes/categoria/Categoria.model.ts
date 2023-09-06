import { Tipo } from "../Tipo.model";

export class Categoria {
  id!: number;
  nome!: string;
  icone!: string;
  tipo?: Tipo;
  tipoId?: number;

  constructor(categoria: Categoria) {
    this.id = categoria.id;
    this.nome = categoria.nome;
    this.icone = categoria.icone;
    this.tipo = categoria.tipo;
    this.tipoId = categoria.tipoId;
  }
}

