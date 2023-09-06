import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { DadosRegistro } from 'src/app/core/models/classes/DadosRegistro.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { UsuariosService } from 'src/app/core/services/usuario/usuarios.service';
import { FormValidations } from 'src/app/views/shared/validations/form-validations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent extends ComponenteGenerico implements OnInit, IComponenteGenerico {

  foto!: File;
  erros!: string[];

  constructor(private usuarioService: UsuariosService, private fb: FormBuilder, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  /* formulario */
  iniciarForm(): void {
    this.form = this.fb.group({
      nomeUsuario: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      profissao: [null, [Validators.required, Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      foto: [null]
    })
  }

  selecionarFoto(fileInput: any): void {

    this.foto = fileInput.target.files[0] as File;
    const reader = new FileReader();

    reader.readAsDataURL(this.foto);
    reader.onload = ((e: any) => {
      document.getElementById('img')?.removeAttribute('hidden');
      document.getElementById('img')?.setAttribute('src', e.target.result); //pegar resultado do input. foto escolhida

      let base64 = reader.result?.toString().split(',')[1];
      this.form.get('foto')?.patchValue(base64);
    })

  }

  /* ----------------------------------- */

  registrar(): void {
    const usuario = this.form.value;
    const formData: FormData = new FormData();

    if(this.foto != null) {
      formData.append('file', this.foto, this.foto.name);
      this.usuarioService.postFoto(formData).subscribe(res => {
        const dadosRegistro: DadosRegistro = new DadosRegistro(usuario);
        dadosRegistro.foto = res.foto;

        this.usuarioService.postUsuario(dadosRegistro).subscribe(res => {
          localStorage.setItem('emailUsuarioLogado', res.emailUsuarioLogado);
          localStorage.setItem('token', res.tokenUsuarioLogado);

          this.router.navigate(['']);
          /* this.mensageriaService.openSnackBar(res.mensagem).afterDismissed().subscribe(() => {
            this.router.navigate(['']);
          }); */
        })
      })
    }
  }
}
