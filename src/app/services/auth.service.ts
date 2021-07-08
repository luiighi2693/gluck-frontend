import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !jwtHelper.isTokenExpired(token);
  }


  login(username: string, password: any) {
    const params = {
      username,
      password
    };
    return this.http.post<any>(`${environment.basePath}/api/auth/login`, params );
  }

  register(name: string, lastname: string, username: string, password: any, email: string, phone: number, address: string, state: string, city: string, code: number) {
    const params = {
      username,
      name,
      lastname,
      email,
      password,
      phone,
      address,
      state,
      city,
      code,
    };
    return this.http.post<any>(`${environment.basePath}/api/auth/register`, params);
  }



  activateAccount(code: string) {
    const params = {
      code,
    };
    return this.http.post<any>(`${environment.basePath}/api/auth/activateAccount`, params );
  }

  recoverPasswordInit(email: string) {
    const params = {
      email,
    };
    return this.http.post<any>(`${environment.basePath}/api/auth/recoverPasswordInit`, params );
  }

  recoverPasswordEnd(code: string, password: any) {
    const params = {
      code,
      password
    };
    return this.http.post<any>(`${environment.basePath}/api/auth/recoverPasswordEnd`, params );
  }
}

