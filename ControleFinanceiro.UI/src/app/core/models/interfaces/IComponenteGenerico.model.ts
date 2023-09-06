import { FormControl, FormGroup } from "@angular/forms"

export interface IComponenteGenerico {
  form: FormGroup;

  iniciarForm(): void;

}
