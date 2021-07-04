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
  //
  // register() {
  //   const params = {
  //
  //   };
  //   return this.http.post<any>(`${environment.basePath}/register`, params);
  // }
}

