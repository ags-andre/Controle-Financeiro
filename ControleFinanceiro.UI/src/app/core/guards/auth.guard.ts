import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private jwtHelper: JwtHelperService){}

  canActivate(): boolean {
    /* if(localStorage.getItem('token')) {
      return true;
    } */

    this.verificarAdministrador();
    return this.verificarAcesso();
  }

  canLoad(): boolean {
    this.verificarAdministrador();
    return this.verificarAcesso();
  }

  verificarAcesso(): boolean {
    const token = localStorage.getItem('token') as string;

    if(token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  verificarAdministrador(): boolean {
    const token = localStorage.getItem('token') as string;

    if (token) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.role === 'Administrador') {
        return true;
      }
    }
    return false;
  }
}

