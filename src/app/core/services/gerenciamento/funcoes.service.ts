import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcao } from 'src/app/core/models/classes/funcao/Funcao.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService extends ServiceGenerica {

  private url = `${environment.urlAPI}Funcao`;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Funcao[]> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Funcao[]>(this.url, httpOptions);
  }

  getById(funcaoId: string): Observable<Funcao> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Funcao>(`${this.url}/${funcaoId}`, httpOptions);
  }

  postFuncao(funcao: Funcao) {
    const httpOptions = this.apiAuthorization;
    return this.http.post<Funcao>(this.url, funcao, httpOptions);
  }

  putFuncao(funcaoId: string, funcao: Funcao) {
    const httpOptions = this.apiAuthorization;
    return this.http.put<Funcao>(`${this.url}/${funcaoId}`, funcao, httpOptions);
  }

  deleteFuncao(funcaoId: string) {
    const httpOptions = this.apiAuthorization;
    return this.http.delete<Funcao>(`${this.url}/${funcaoId}`, httpOptions);
  }

  filtrarFuncoes(nomeFuncao: string): Observable<Funcao[]> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Funcao[]>(`${this.url}/FiltrarFuncoes/${nomeFuncao}`, httpOptions);
  }
}
