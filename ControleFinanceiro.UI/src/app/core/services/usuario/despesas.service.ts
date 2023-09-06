import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Despesa } from '../../models/classes/cartao/Despesa.model';
import { MensagemAPI } from '../../models/classes/MensagemAPI.model';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';
import { MensageriaService } from '../mensageria.service';

@Injectable({
  providedIn: 'root'
})
export class DespesasService extends ServiceGenerica {

  private apiUrl: string = `${environment.urlAPI}Despesas`;

  constructor(private http: HttpClient, private mensageria: MensageriaService) {
    super();
  }

  getDespesaPeloUsuarioID(usuarioId: string): Observable<Despesa[]> {
    const httpOptions = this.apiAuthorization;

    return this.http.get<Despesa[]>(`${this.apiUrl}/PegarDespesasPeloUsuarioId/${usuarioId}`, httpOptions);
  }

  getDespesaDoCartao(cartaoId: number): Observable<Despesa[]> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Despesa[]>(`${this.apiUrl}/DespesasDoCartao/${cartaoId}`, httpOptions);
  }

  getDespesaPeloID(despesaId: number): Observable<Despesa> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Despesa>(`${this.apiUrl}/${despesaId}`, httpOptions);
  }

  postDespesa(despesa: Despesa): Observable<void> {
    const httpOptions = this.apiAuthorization;

    let valor = String(despesa.valor);
    despesa.valor = Number(valor.replace(/[^0-9]/g, ''));
    console.log(JSON.stringify(despesa))
    return this.http.post<MensagemAPI>(this.apiUrl, despesa, httpOptions)
      .pipe(map(res => {
        this.mensageria.openSnackBar(res.mensagem)
      }));
  }

  putDespesa(despesaId: number, despesa: Despesa): Observable<void> {
    const httpOptions = this.apiAuthorization;

    let valor = String(despesa.valor);
    despesa.valor = Number(valor.replace(/[^0-9]/g, ''));

    return this.http.put<MensagemAPI>(`${this.apiUrl}/${despesaId}`, despesa, httpOptions)
      .pipe(map(res => {
        this.mensageria.openSnackBar(res.mensagem)
      }));
  }

  deleteDespesa(despesaId: number): Observable<void> {
    const httpOptions = this.apiAuthorization;

    return this.http.delete<MensagemAPI>(`${this.apiUrl}/${despesaId}`, httpOptions)
      .pipe(map(res => {
        this.mensageria.openSnackBar(res.mensagem)
      }));;
  }
}
