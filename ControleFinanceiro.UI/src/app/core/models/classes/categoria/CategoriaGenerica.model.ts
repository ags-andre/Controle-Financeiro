import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IComponenteGenerico } from "../../interfaces/IComponenteGenerico.model";

export class CategoriaGenerica implements IComponenteGenerico {

  form!: FormGroup;

  constructor(private fb: FormBuilder = new FormBuilder()) {}

  iniciarForm(): void {
    this.form = this.fb.group({
      nome: [null, Validators.required],  /* teste => nome: [null, [Validators.required, Validators.maxLength(10)]], */
      icone: [null, Validators.required],
      tipoId: [null, Validators.required],
    });
  }
}
