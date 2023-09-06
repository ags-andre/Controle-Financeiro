import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DadosRegistro } from 'src/app/core/models/classes/DadosRegistro.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { UsuariosService } from 'src/app/core/services/usuario/usuarios.service';
import { FormValidations } from 'src/app/views/shared/validations/form-validations';

@Component({
  selector: 'app-atualiza-usuario',
  templateUrl: './atualiza-usuario.component.html',
  styleUrls: ['./atualiza-usuario.component.css']
})
export class AtualizaUsuarioComponent extends ComponenteGenerico implements OnInit, OnDestroy, IComponenteGenerico {

  usuario!: DadosRegistro;
  foto!: File;
  inscricoes: Subscription[] = new Array();

  constructor(private usuarioService: UsuariosService, private fb: FormBuilder, private router: Router) {
    super();
  }

  /* Ciclos */
  ngOnInit(): void {
    this.iniciarForm();
    this.getUsuario();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(x => x.unsubscribe());
  }

  /* Formulario */
  iniciarForm(): void {
    this.form = this.fb.group({
      id: [localStorage.getItem('idUsuario'), Validators.required],
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

  /* Serviços */
  getUsuario(): void {
    this.inscricoes.push(
      this.usuarioService.getUsuario(localStorage.getItem('idUsuario') as string).subscribe(res => {
        this.usuario = new DadosRegistro(res);
        this.form.patchValue(this.usuario);

        document.getElementById('img')?.removeAttribute('hidden');
        document.getElementById('img')?.setAttribute('src', `data:image/any;base64,${this.usuario.foto}`);
      })
    );
  }

  putUsuario(): void {
    this.inscricoes.push(
      this.usuarioService.putUsuario(this.form.value).subscribe(() => {
        this.voltar();
      })
    );
  }

  voltar(): void {
    window.history.go(-1);
  }
}
