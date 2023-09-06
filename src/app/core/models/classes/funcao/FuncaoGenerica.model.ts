import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IComponenteGenerico } from "../../interfaces/IComponenteGenerico.model";

export class FuncaoGenerica implements IComponenteGenerico {
  form!: FormGroup;

  constructor(private fb: FormBuilder = new FormBuilder){}

  iniciarForm(): void {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required]
    });
  }
}
