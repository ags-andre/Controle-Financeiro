import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mes } from '../../models/classes/cartao/Despesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  apiUrl: string = `${environment.urlAPI}Mes`;

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Mes[]> {
    return this.http.get<Mes[]>(this.apiUrl);
  }
}
