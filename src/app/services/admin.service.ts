import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

let headers;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient,
  ) {
  }

  initToken() {
    headers = new HttpHeaders().set('token', sessionStorage.getItem('token'));
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get/?model=q_user`, {headers});
  }

  getUser(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_user`, {headers});
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.basePath}/api/delete?id=${id}&model=q_user`, {headers});
  }

  editUser(name, lastname, username, email, phone, password, address, state, city, code, rowid, status, img): Observable<any> {
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
      status,
      img
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_user`, params, {headers});
  }

  createUser(name, lastname, username, email, phone, password, address, state, city, code, status, img): Observable<any> {
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
      status,
      img
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_user`, params, {headers});
  }

  getSports(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get?model=q_sport`, {headers});
  }

  getSport(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_sport`, {headers});
  }

  deleteSport(id): Observable<any> {
    return this.http.delete(`${environment.basePath}/api/delete?id=${id}&model=q_sport`, {headers});
  }

  editSport(id, name, dateCreate, status, description, img): Observable<any> {
    const params = {
      rowid: id,
      name,
      status,
      date_Create: dateCreate,
      descriptios: description,
      img
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_sport`, params, {headers});
  }

  createSport(name, description, dateCreate, status, img): Observable<any> {
    const params = {
      name,
      descriptios: description,
      date_Create: dateCreate,
      status,
      img
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_sport`, params, {headers});
  }

  getTeams(): Observable<any> {
    const includes = ['sport'];
    return this.http.get(`${environment.basePath}/api/get?model=q_team&include=${encodeURI(JSON.stringify(includes))}`, {headers});
  }

  getTeam(id): Observable<any> {
    const includes = ['sport'];
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_team&include=${encodeURI(JSON.stringify(includes))}`, {headers});
  }

  deleteTeam(id): Observable<any> {
    return this.http.delete(`${environment.basePath}/api/delete?id=${id}&model=q_team`, {headers});
  }

  editTeam(id, name, description, dateCreate, status, asociatedSport, img): Observable<any> {
    const params = {
      rowid: id,
      name,
      desctiptios: description,
      date_Create: dateCreate,
      status,
      fk_sport: asociatedSport,
      img
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_team`, params, {headers});
  }

  createTeam(name, description, dateCreate, status, asociatedSport, img): Observable<any> {
    const params = {
      name,
      desctiptios: description,
      date_Create: dateCreate,
      status,
      fk_sport: asociatedSport,
      img
    };
    return this.http.post(`${environment.basePath}/api/create?model=q_team`, params, {headers});
  }

  getPools(): Observable<any> {
    const includes = ['sport'];
    return this.http.get(`${environment.basePath}/api/get?model=q_pools&include=${encodeURI(JSON.stringify(includes))}`, {headers});
  }

  getPool(id): Observable<any> {
    const includes = ['sport'];
    return this.http.get(`${environment.basePath}/api/getOne?id=${id}&model=q_pools&include=${encodeURI(JSON.stringify(includes))}`, {headers});
  }

  deletePool(id): Observable<any> {
    return this.http.delete(`${environment.basePath}/api/delete?id=${id}&model=q_pools`, {headers});
  }

  editPool(id, name, dateCreate, status, sport, quantity, color, penalty, drawScore, winScore, loseScore, resultScore, limitUser, rules,
           password, league, poolType, groups, groupsTeam): Observable<any> {
    const params = {
      rowid: id,
      name,
      date_Create: dateCreate,
      status,
      fk_sport: sport,
      quantity,
      color,
      penalty,
      puntaje_empate: drawScore,
      puntaje_ganar: winScore,
      puntaje_perder: loseScore,
      puntaje_resultado: resultScore,
      limit_user: limitUser,
      rules,
      password,
      league,
      pool_type: poolType,
      groups,
      groupsTeam
    };
    return this.http.put(`${environment.basePath}/api/update?model=q_pools`, params, {headers});
  }

  getResultsByPool(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getResultsByPool?poolId=${id}`, {headers});
  }

  getResultsByPoolAndUser(user, pool): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getResultsByPoolAndUser?poolId=${pool}&userId=${user}`, {headers});
  }

  createPool(name, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password, matchesInfo,
             usersForPool, result, winner, draw, loser): Observable<any> {
    const params = {
      name,
      sport,
      color,
      matches,
      usersLimit,
      status,
      penalty,
      groups,
      teamsPerGroup,
      type,
      league,
      password,
      matchesInfo,
      usersForPool,
      result,
      winner,
      draw,
      loser
    };

    return this.http.post(`${environment.basePath}/api/pool/create`, params, {headers});
  }

  sendEmail(category, subject, message): Observable<any> {
    const params = {
      category,
      subject,
      message
    };
    return this.http.post(`${environment.basePath}/api/utilities/semdEmailByCategory`, params);
  }

  uploadFile(imageData: any) {
    const params = {
      imageData,
    };
    return this.http.post<any>(`${environment.basePath}/api/file/upload`, params);
  }


  getFile(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/file/get?id=${id}`, {headers});
  }
}
