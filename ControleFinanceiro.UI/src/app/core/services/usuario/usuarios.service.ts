import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { DadosRegistro } from 'src/app/core/models/classes/DadosRegistro.model';
import { environment } from 'src/environments/environment';
import { DadosLogin, UsuarioLogado } from '../../models/classes/DadosLogin.model';
import { MensagemAPI } from '../../models/classes/MensagemAPI.model';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';
import { MensageriaService } from '../mensageria.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends ServiceGenerica {

  private url = `${environment.urlAPI}Usuarios`;

  constructor(private http: HttpClient, private mensageria: MensageriaService) { super(); }

  logarUsuario(dadosLogin: DadosLogin): Observable<DadosRegistro>{
    const apiUrl = `${this.url}/login`;

    return this.http.post<DadosRegistro>(apiUrl, dadosLogin)
    .pipe(catchError(err => { throw err } ));
  }

  getUsuario(id: string): Observable<DadosRegistro> {
    const apiUrl = `${this.url}/${id}`;
    const httpOptions = this.apiAuthorization;

    return this.http.get<DadosRegistro>(apiUrl, httpOptions);
  }

  postFoto(formData: any) {
    const apiUrl = `${this.url}/SalvarFoto`;

    return this.http.post<any>(apiUrl, formData)
    .pipe(catchError(err => { throw err } ));
  }

  postUsuario(dadosRegistro: DadosRegistro): Observable<UsuarioLogado> {
    const apiUrl = `${this.url}/RegistrarUsuario`;

    return this.http.post<UsuarioLogado>(apiUrl, dadosRegistro)
    .pipe(catchError(err => { throw err } ));
  }

  putUsuario(usuario: DadosRegistro) {
    const apiUrl = `${this.url}/AtualizarUsuario`;
    const httpOptions = this.apiAuthorization;

    return this.http.put<MensagemAPI>(apiUrl, usuario, httpOptions)
    .pipe(map(res => {
      this.mensageria.openSnackBar(res.mensagem)
    }));;
  }
}
