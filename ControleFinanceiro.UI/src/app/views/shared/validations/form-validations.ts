import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MesEnum } from 'src/app/core/utils/enum/Mes.Enum';

export class FormValidations {
  static campoValidator(control: FormControl): string {
    let errorMessage: string = '';

    Object.keys(control.errors as Object).forEach(e => {
      switch (e) {
        case 'required':
          errorMessage = 'Campo obrigatório';
          break;
        case 'minlength':
          errorMessage = 'Mínimo de caracteres: ' + control?.errors?.[e].requiredLength;
          break;
        case 'maxlength':
          errorMessage = 'Máximo de caracteres: ' + control?.errors?.[e].requiredLength;
          break;
        case 'email':
          errorMessage = 'Email inválido';
          break;
        case 'cpfInvalido':
          errorMessage = 'CPF inválido';
          break;
        case 'anoInvalido':
          errorMessage = 'Ano inválido! Apenas de entre 2016 - 2024';
          break;
      }
    })
    return errorMessage;
  }

  static rangeAno(control: FormControl) {
    const anos: string[] = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    let valorValido: boolean = false;

    if(control.value) {
      anos.every(x => {
        if(x == control.value) {
          valorValido = true;
          return false;
        } else {
          return true;
        }
      });

      if(!valorValido) {
        return { anoInvalido: true };
      }
    }
    return null;
  }

  static habilitarCampoDia(control: FormControl) {
    if(control && control.parent) {
      let dia = control.parent?.get('dia');

      if(control?.value) {
        dia?.enable();
      }
    }
  }

  /* static diaDoMes(listaDias: number[]) {
    console.log(1)
    //bissexto = 2020, 2024
    const validator = (control: AbstractControl) => {
      console.log(2)
      if (control instanceof FormControl) {
        console.log(3)
        if(control && control.parent) {
          console.log(4)
          /* let enumMes: any = MesEnum
          Object.keys(enumMes).forEach(x => {
            console.log(enumMes[x])
          }) *
        }
      }
    }
  } */

  static cpfValidator(control: FormControl) {
    if (control.value) {
      const cpf = control.value;

      if (
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999'
      ) {
        return { cpfInvalido: true };
      }

      let numero: number = 0;
      let caracter: string = '';
      let numeros: string = '0123456789';
      let j: number = 10;
      let somatorio: number = 0;
      let resto: number = 0;
      let digito1: number = 0;
      let digito2: number = 0;
      let cpfAux: string = '';

      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
          return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + numero * j;
        j--;
      }

      resto = somatorio % 11;
      digito1 = 11 - resto;
      if (digito1 > 9) {
        digito1 = 0;
      }

      j = 11;
      somatorio = 0;
      cpfAux = cpfAux + digito1;
      for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + numero * j;
        j--;
      }

      resto = somatorio % 11;
      digito2 = 11 - resto;
      if (digito2 > 9) {
        digito2 = 0;
      }

      cpfAux = cpfAux + digito2;
      if (cpf != cpfAux) {
        return { cpfInvalido: true };
      } else {
        return null;
      }
    }
    return null
  }

  static senhaValidator(control: FormControl) {
    const charEspecial = /(?=.*[$*&@#!%¨()§¢£¬])/;
    const charMaiusculo = /(?=.*[A-Z])/;

    if(control.value && (control.value.length >= 8 && control.value.length <= 21)){
      if(!charEspecial.test(control.value) && !charMaiusculo.test(control.value)) {
        return {charEspecialMaiusculo: true}
      }
      if(!charEspecial.test(control.value)) {
        return {charEspecial: true}
      }
      if(!charMaiusculo.test(control.value)) {
        return {charMaiusculo: true}
      }
    }
    return null;
  }

  static compararSenhas(senha: string, confirmarSenha: string) {
    let retorno: boolean;
    if(senha) {
      retorno = senha == confirmarSenha ?  true : false;
      return retorno;
    }
    return false;
  }

  static getErrorsSenha(form: FormGroup, campo: string): string {
    let errorMessage: string = '';

    if(form.get(campo)?.touched) {
      if (form.get(campo)?.errors?.['minlength']) {
        errorMessage = 'No mínimo 8 caracteres';
      }
      else if(form.get(campo)?.errors?.['maxlength']) {
        errorMessage = 'No máximo 21 caracteres';
      }
      else if(form.get(campo)?.errors?.['charEspecialMaiusculo']) {
        errorMessage = 'No mínimo 1 caracter especial e 1 caracter maiúsculo';
      }
      else if(form.get(campo)?.errors?.['charEspecial']) {
        errorMessage = 'No mínimo 1 caracter especial';
      }
      else if(form.get(campo)?.errors?.['charMaiusculo']) {
        errorMessage = 'No mínimo 1 caracter maiúsculo';
      }
    }
    return errorMessage;
  }
}
