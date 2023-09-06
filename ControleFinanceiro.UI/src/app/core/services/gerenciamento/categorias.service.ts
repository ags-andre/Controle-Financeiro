import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/core/models/classes/categoria/Categoria.model';
import { environment } from 'src/environments/environment';
import { MensagemAPI } from '../../models/classes/MensagemAPI.model';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService extends ServiceGenerica {
  private url = `${environment.urlAPI}Categoria`;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Categoria[]> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Categoria[]>(this.url, httpOptions);
  }

  getById(categoriaId: number): Observable<Categoria> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.http.get<Categoria>(apiUrl, httpOptions);
  }

  postCategoria(categoria: Categoria): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;
    return this.http.post<MensagemAPI>(this.url, categoria, httpOptions);
  }

  putCategoria(categoriaId: number, categoria: Categoria): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.http.put<MensagemAPI>(apiUrl, categoria, httpOptions);
  }

  deleteCategoria(categoriaId: number): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.http.delete<MensagemAPI>(apiUrl, httpOptions);
  }

  filtrarCategoria(nomeCategoria: string): Observable<Categoria[]> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/FiltrarCategorias/${nomeCategoria}`;
    return this.http.get<Categoria[]>(apiUrl, httpOptions);
  }

  filtrarCategoriaDespesas(): Observable<Categoria[]> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/FiltrarCategoriasDespesas`;
    return this.http.get<Categoria[]>(apiUrl, httpOptions);
  }

  filtrarCategoriaGanhos(): Observable<Categoria[]> {
    const httpOptions = this.apiAuthorization;
    const apiUrl = `${this.url}/FiltrarCategoriasGanhos`;
    return this.http.get<Categoria[]>(apiUrl, httpOptions);
  }
}
