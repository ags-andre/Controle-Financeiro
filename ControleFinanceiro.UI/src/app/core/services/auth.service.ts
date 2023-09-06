import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DadosLogin, UsuarioLogado } from '../models/classes/DadosLogin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlAPI + 'Usuarios';

  constructor(private http: HttpClient) {}

  login(dadosLogin: DadosLogin): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(`${this.apiUrl}/login`, dadosLogin);
  }
}
