import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

const headers = new HttpHeaders().set('token', sessionStorage.getItem('token'));

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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

  getSports(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get?model=q_sport`, {headers});
  }
  getSport(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_sport`, {headers});
  }
  editSport(id, name, dateCreate, status, description): Observable<any> {
    const params = {
      rowid: id,
      name,
      status,
      date_Create: dateCreate,
      descriptios: description
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_sport`, params , {headers});
  }
  createSport(name, description, dateCreate, status): Observable<any> {
    const params = {
      name,
      descriptios: description,
      date_Create: dateCreate,
      status
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_sport`, params, {headers});
  }

  getTeams(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get?model=q_team`, {headers});
  }
  getTeam(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_team`, {headers});
  }
  editTeam(id, name, description, dateCreate, status, asociatedSport): Observable<any> {
    const params = {
      rowid: id,
      name,
      desctiptios: description,
      date_Create: dateCreate,
      status,
      fk_sport: asociatedSport
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_team`, params, {headers});
  }
  createTeam(name, description, dateCreate, status, asociatedSport): Observable<any> {
    const params = {
      name,
      desctiptios: description,
      date_Create: dateCreate,
      status,
      fk_sport: asociatedSport
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_team`, params, {headers});
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
