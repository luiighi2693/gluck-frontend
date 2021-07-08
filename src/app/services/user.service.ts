import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

const headers = new HttpHeaders().set('token', sessionStorage.getItem('token'));

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get/?model=q_user`, {headers});
  }

  getUser(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_user`, {headers});
  }

  editUser(name, lastname, username, email, phone, password, address, state, city, code, id ): Observable<any> {
    const params = {
      name,
      lastname,
      username,
      email,
      phone,
      password,
      address,
      state,
      city,
      code,
      id
    };
    return this.http.post(`${environment.basePath}/api/update?model=q_user`, params, {headers});
  }
}
