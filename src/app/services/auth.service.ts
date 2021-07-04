import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BASE_PATH = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


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
}

