import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ganho } from '../../models/classes/cartao/Ganho.model';
import { MensagemAPI } from '../../models/classes/MensagemAPI.model';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';
import { MensageriaService } from '../mensageria.service';

@Injectable({
  providedIn: 'root'
})
export class GanhosService extends ServiceGenerica {
  private url: string = `${environment.urlAPI}Ganhos`;

  constructor(private http: HttpClient, private mensageria: MensageriaService) {
    super();
  }

  public getGanhosPeloUsuarioId(usuarioId: string): Observable<Ganho[]> {
    const httpOptions = this.apiAuthorization;

    return this.http.get<Ganho[]>(`${this.url}/PegarGanhosPeloUsuarioId/${usuarioId}`, httpOptions);
  }

  public getGanhosPeloId(ganhoId: number): Observable<Ganho> {
    const httpOptions = this.apiAuthorization;

    return this.http.get<Ganho>(`${this.url}/PegarGanhoPeloId/${ganhoId}`, httpOptions);
  }

  public postGanho(ganho: Ganho): Observable<void> {
    const httpOptions = this.apiAuthorization;

    let valor = String(ganho.valor);
    ganho.valor = Number(valor.replace(/[^0-9]/g, ''));

    return this.http.post<MensagemAPI>(`${this.url}`, ganho, httpOptions)
    .pipe(map(res => {
      this.mensageria.openSnackBar(res.mensagem)
    }));
  }

  public putGanho(idGanho: number, ganho: Ganho): Observable<void> {
    const httpOptions = this.apiAuthorization;

    let valor = String(ganho.valor);
    ganho.valor = Number(valor.replace(/[^0-9]/g, ''));

    return this.http.put<MensagemAPI>(`${this.url}/${idGanho}`, ganho, httpOptions)
    .pipe(map(res => {
      this.mensageria.openSnackBar(res.mensagem)
    }));
  }

  public deleteGanho(idGanho: number): Observable<void> {
    const httpOptions = this.apiAuthorization;

    return this.http.delete<MensagemAPI>(`${this.url}/${idGanho}`, httpOptions)
    .pipe(map(res => {
      this.mensageria.openSnackBar(res.mensagem)
    }));
  }
}
