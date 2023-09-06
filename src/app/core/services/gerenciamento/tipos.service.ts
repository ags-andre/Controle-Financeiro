import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/core/models/classes/Tipo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  public url = `${environment.urlAPI}Tipo`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.url);
  }
}
