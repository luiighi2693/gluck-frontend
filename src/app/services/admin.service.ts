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

  getPoolsForAdmin(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getPoolsForAdmin`, {headers});
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

  registerUserPool(poolId, userId): Observable<any> {
    const params = {
      poolId,
      userId
    };
    return this.http.post(`${environment.basePath}/api/pool/registerUserPool`, params, {headers});
  }

  getPools(): Observable<any> {
    const includes = ['sport', 'matches'];
    return this.http.get(`${environment.basePath}/api/get?model=q_pools&include=${encodeURI(JSON.stringify(includes))}`, {headers});
  }

  getHotPools(userId): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getMyHotPools?userId=${userId}`, {headers});
  }

  getPoolsByUser(userId): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getPoolsByUser?userId=${userId}`, {headers});
  }

  getMyPools(userId): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getMyPools?userId=${userId}`, {headers});
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

  getEventsForUser(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getEventsForUser?userId=${id}`, {headers});
  }

  getResultsByPoolAndUser(user, pool): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getResultsByPoolAndUserWithoutSort?poolId=${pool}&userId=${user}`, {headers});
  }

  getResultsUserForClient(user): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getResultsUserForClient?userId=${user}`, {headers});
  }

  createAndUpdatePool(name, hot, sport, color, matches, usersLimit, status, penalty, groups, teamsPerGroup, type, league, password, rules,
                      matchesInfo, groupsInfo, usersForPool, result, winner, draw, loser, amountInput, coinsInput, dateFinish,
                      timeFinish, awardType, awardValue, variable, id = null): Observable<any> {
    const params = {
      name,
      hot,
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
      rules,
      matchesInfo,
      groupsInfo,
      usersForPool,
      result,
      winner,
      draw,
      loser,
      amountInput,
      coinsInput,
      dateFinish,
      timeFinish,
      awardType,
      awardValue,
      id,
    };


    if (variable === 'create') {
      return this.http.post(`${environment.basePath}/api/pool/create`, params, {headers});
    } else if (variable === 'update') {
      return this.http.post(`${environment.basePath}/api/pool/update`, params, {headers});
    } else {
      return
    }

  }

  getPoolForEdit(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getOne?poolId=${id}`, {headers});
  }

  clientRegisterToPool(userId, data): Observable<any> {

    return this.http.post(`${environment.basePath}/api/result/updateResultByUserAndPool?userId=${userId}`, data, {headers});
  }


  sendEmail(category, subject, manualSelection, message): Observable<any> {
    const params = {
      category,
      subject,
      manualSelection,
      message
    };
    return this.http.post(`${environment.basePath}/api/utilities/sendEmailByCategory`, params);
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

  recharge(userId, type, amount): Observable<any> {
    const params = {
      userId,
      type,
      amount
    };
    return this.http.post(`${environment.basePath}/api/user/rechargue`, params, {headers});
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${environment.basePath}/api/get/?model=q_transaction`, {headers});
  }

  getTransactionsClient(name): Observable<any> {
    const filters = {
      id: 'username',
      value: name
    };
    return this.http.get(`${environment.basePath}/api/filter?model=q_transaction&filters[]=${encodeURI(JSON.stringify(filters))}`, {headers});
  }

  getAvailablePools(id, poolCategory): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getMyAvailablePools?userId=${id}&poolCategory=${poolCategory}`);
  }

  getUsersByPool(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/pool/getUsersByPool?poolId=${id}`);
  }

  getRankingForPool(id): Observable<any> {
    return this.http.get(`${environment.basePath}/api/result/getRankingForPool?poolId=${id}`);
  }
}
