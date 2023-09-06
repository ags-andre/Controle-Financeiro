import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoriasService } from "../../services/gerenciamento/categorias.service";
import { MesService } from "../../services/gerenciamento/mes.service";
import { MesEnum } from "../../utils/enum/Mes.Enum";
import { Mes } from "../classes/cartao/Despesa.model";
import { Categoria } from "../classes/categoria/Categoria.model";
import { IGanhoDespesa } from "../interfaces/IGanhoDespesa.model";
import { ComponenteGenerico } from "./ComponenteGenerico.model";

export class GanhoDespesa extends ComponenteGenerico implements IGanhoDespesa {

  categorias: Categoria[] = new Array();
  meses: Mes[] = new Array();
  diasValidosDoMes: number[] = new Array();
  usuarioId!: string;
  inscricoes: Subscription[] = new Array();

  constructor(protected router: Router, protected categoriaService: CategoriasService, protected mesService: MesService, protected fb: FormBuilder) {
    super();
  }

  /* Serviços */
  getCategoriasDespesas(): void {
    this.inscricoes.push(
      this.categoriaService.filtrarCategoriaDespesas().subscribe(res => {
        this.categorias = res;
      })
    )
  }

  getCategoriasGanhos(): void {
    this.inscricoes.push(
      this.categoriaService.filtrarCategoriaGanhos().subscribe(res => {
        this.categorias = res;
      })
    )
  }

  getMeses(): void {
    this.inscricoes.push(
      this.mesService.PegarTodos().subscribe(res => {
        this.meses = res;
      })
    )
  }

  /* Validação para dias do mes */
  habilitarCampoDia(): void {
    let ano = this.form.get('ano');
    let mes = this.form.get('mesId');
    let dia = this.form.get('dia');

    const validar = () => {
      if(ano?.value && mes?.value){
        dia?.enable();
        this.diaDoMes();
      } else {
        dia?.disable();
      }
    }

    ano?.valueChanges.subscribe(x => {
      validar();
    });

    mes?.valueChanges.subscribe(x => {
      validar();
    });
  }

  diaDoMes(): void {
    let ano = this.form.get('ano');
    const totalMeses = 12;
    const mes = this.form.get('mesId')?.value;

    const totalDiasMes = (diasMes: any) => {
      if(ano?.valid) {
        this.diasValidosDoMes = new Array();

        for (let index = 1; index <= diasMes; index++) {
          this.diasValidosDoMes.push(index);
        }
      }
    }

    let indexLoopENum = 1;
    for (var key in MesEnum) {
      if(isNaN(Number(key))) {// algumas vezes acaba trazendo numeros de cada um, entao verificamos se não for numero
        if(mes == indexLoopENum) {
          if((mes == 2) && (ano?.value == 2016 || ano?.value == 2020 || ano?.value == 2024)) {
            //caso seja ano bissexto
            totalDiasMes(MesEnum[key] + 1);
          } else {
            totalDiasMes(MesEnum[key])
          }
        }
        indexLoopENum++;
      }
    }
  }
}
