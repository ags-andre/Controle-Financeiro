import { Subscription } from "rxjs";
import { Mes } from "../classes/cartao/Despesa.model";
import { Categoria } from "../classes/categoria/Categoria.model";

export interface IGanhoDespesa {

  categorias: Categoria[];
  meses: Mes[];
  diasValidosDoMes: number[];
  usuarioId: string;
  inscricoes: Subscription[];
}
