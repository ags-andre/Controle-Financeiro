import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {

  nomeUsuario!: string;
  listagem!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const url: string[] = event.url.split('/');
        
        if(url.at(-1) == 'financeiro' || url.at(-1) == 'listagem') {
          this.listagem = true;
        } else {
          this.listagem = false;
        }
      }
    })
  }

  ngOnInit(): void {
    this.nomeUsuario = localStorage.getItem('nomeUsuario') as string;
  }

}
