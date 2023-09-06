import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { TiposService } from './core/services/gerenciamento/tipos.service';
import { CategoriasService } from './core/services/gerenciamento/categorias.service';
import { FuncoesService } from './core/services/gerenciamento/funcoes.service';
import { RequestInterceptor } from './core/utils/interceptors/request.interceptor';
import { LoaderService } from './core/services/loader.service';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './views/shared/design/material.module';
import { ErrorInterceptor } from './core/utils/interceptors/error.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const ModalConfig: NgxUiLoaderConfig = {
  fgsColor: '#5300cc',
  fgsSize: 100,
  fgsType: 'ball-spin-clockwise-fade-rotating',
  gap: 25,
  overlayColor: 'rgba(195,195,195,0.75)',
  pbColor: '#5300cc',
  pbDirection: 'ltr',
  pbThickness: 4,
  hasProgressBar: true,
  text: 'Carregando...',
  textColor: '#5300cc'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule.forRoot(ModalConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [
    TiposService,
    CategoriasService,
    FuncoesService,
    LoaderService,
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt-BR', multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
