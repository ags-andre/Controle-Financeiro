import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {

  loading!: Subscription;
  resultado: boolean = false;

  constructor(
    private loaderState: LoaderService,
    private changeDetect: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = this.loaderState.loading.subscribe(
      (data: boolean) => {
        this.resultado = data;
      }
    );
  }

  ngAfterContentChecked() {
    this.changeDetect.detectChanges();
  }

  ngOnDestroy(): void {
    this.loading.unsubscribe();
  }

  usuarioLogado(): string | null {
    return localStorage.getItem('token')
  }

  logout(): void {
    this.router.navigate(['login'])
  }
}
