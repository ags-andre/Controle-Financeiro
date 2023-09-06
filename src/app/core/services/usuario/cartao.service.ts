import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartao } from '../../models/classes/cartao/Cartao.model';
import { MensagemAPI } from '../../models/classes/MensagemAPI.model';
import { ServiceGenerica } from '../../models/genericos/ServiceGenerica.model';

@Injectable({
  providedIn: 'root'
})

export class CartaoService extends ServiceGenerica {
  private apiUrl: string = `${environment.urlAPI}Cartoes`;

  constructor(private http: HttpClient) {
    super();
  }

  getById(idCartao: number): Observable<Cartao> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Cartao>(`${this.apiUrl}/PegarPorId/${idCartao}`, httpOptions);
  }

  getCartoesByIdUsuario(idUsuario: string): Observable<Cartao[]> {
    const httpOptions = this.apiAuthorization;
    return this.http.get<Cartao[]>(`${this.apiUrl}/PegarCartoesPeloUsuarioID/${idUsuario}`, httpOptions);
  }

  postCartao(cartao: Cartao): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;

    let limite: string = String(cartao.limite);
    cartao.limite = Number(limite.replace(/[^0-9]/g, ''));
    cartao.numero = cartao.numero.replace(/[^0-9]/g, '');
    return this.http.post<MensagemAPI>(`${this.apiUrl}/NovoCartao`, cartao, httpOptions);
  }

  putCartao(idCartao: number, cartao: Cartao): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;

    let limite: string = String(cartao.limite);
    cartao.limite = Number(limite.replace(/[^0-9]/g, ''));
    cartao.numero = cartao.numero.replace(/[^0-9]/g, '');
    
    return this.http.put<MensagemAPI>(`${this.apiUrl}/${idCartao}`, cartao, httpOptions);
  }

  deleteCartao(idCartao: number): Observable<MensagemAPI> {
    const httpOptions = this.apiAuthorization;
    return this.http.delete<MensagemAPI>(`${this.apiUrl}/${idCartao}`, httpOptions)
  }
}
