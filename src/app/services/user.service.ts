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

  editUser(name, lastname, username, email, phone, password, address, state, city, code, rowid, status ): Observable<any> {
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
      rowid,
      status
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_user`, params, {headers});
  }

  createUser(name, lastname, username, email, phone, password, address, state, city, code, status ): Observable<any> {
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
      status
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_user`, params, {headers});
  }

  uploadFile(imageData: any) {
    const params = {
      imageData,
    };
    return this.http.post<any>(`${environment.basePath}/api/file/upload`, params );
  }


  getFile(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/file/get?id=${id}`, {headers});
  }
}
