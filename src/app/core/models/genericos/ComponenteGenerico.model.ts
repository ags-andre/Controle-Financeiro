import { FormControl, FormGroup } from "@angular/forms";
import { FormValidations } from "src/app/views/shared/validations/form-validations";

export class ComponenteGenerico {

  form!: FormGroup;

  getCampo(campo: string): FormControl {
    return this.form.get(campo) as FormControl;
  }

  getErrosCampo(campo: string): string {
    let campoForm = this.getCampo(campo);
    return FormValidations.campoValidator(campoForm as FormControl);
  }
}

