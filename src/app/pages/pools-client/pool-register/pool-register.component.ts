import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {brackets, champion} from '../../../../assets/mock/mock-brackets';
import {group} from '@angular/animations';

@Component({
  selector: 'app-pool-register',
  templateUrl: './pool-register.component.html',
  styleUrls: ['./pool-register.component.css']
})
export class PoolRegisterComponent implements OnInit, AfterViewInit {
  pool: any;
  matches: any;
  userId: any;
  teams = [];

  currentPool: string | number;
  imagePath;
  bracketsData = brackets;
  finalEighths = [];
  finalQuarters = [];
  semifinals = [];
  final = [];
  thirdPosition = [];
  champion: any;
  allMatchesFilled = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');
    this.setTeamsData();
    this.getParam();
    // if (this.pool.league === 'Copa America') {
    //   this.setArrays();
    // }
  }

  ngAfterViewInit(): void {
    this.getPoolData();
  }

  setArrays() {
    for (let i = 0; i < 4; i++) {
      this.finalQuarters.push({
        team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
      });
    }

    // for (let i = 0; i < 2; i++) {
    //   this.semifinals.push({
    //     team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
    //   });
    // }
    //
    // for (let i = 0; i < 1; i++) {
    //   this.final.push({
    //     team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
    //   });
    // }
    //
    // for (let i = 0; i < 1; i++) {
    //   this.thirdPosition.push({
    //     team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
    //   });
    // }

  }

  setArraysWith8vos() {

    for (let i = 0; i < 8; i++) {
      this.finalEighths.push({
        team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0, penalty1: 0, penalty2: 0,
      });
    }
    /*
        for (let i = 0; i < 4; i++) {
          this.finalQuarters.push({
            team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0, penalty1: 0, penalty2: 0
          });
        }

        for (let i = 0; i < 2; i++) {
          this.semifinals.push({
            team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0, penalty1: 0, penalty2: 0
          });
        }

        for (let i = 0; i < 1; i++) {
          this.final.push({
            team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0, penalty1: 0, penalty2: 0
          });
        }

        for (let i = 0; i < 1; i++) {
          this.thirdPosition.push({
            team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0, penalty1: 0, penalty2: 0
          });
        }*/
  }

  setTeamsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getTeams().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.teams = data.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        console.log('teams.length', this.teams.length);
        console.log('teams', this.teams);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }


  getParam() {
    this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  getPoolData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPoolForEdit(this.currentPool).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        // filter teams by groups

        this.matches = res.data.matchesInfo;
        this.matches.forEach(match => {
          match.resultTeam1 = null;
          match.resultTeam2 = null;
        });
        this.pool = res.data;

        if (this.pool.league === 'Copa America') {
          const allGroups = res.data.groupsInfo.map(x => x.teams).join();
          this.teams = this.teams.filter(x => allGroups.includes(x.rowid));

          this.setArrays();
        }

        if (this.pool.league === 'generic') {
          if (this.pool.tournamentType === '8vos') {
            const allGroupsWithEighths = res.data.groupsInfo.map(x => x.teams).join();
            this.teams = this.teams.filter(x => allGroupsWithEighths.includes(x.rowid));
            // this.setArraysWith8vos();
          } else {
            const allGroups = res.data.groupsInfo.map(x => x.teams).join();
            this.teams = this.teams.filter(x => allGroups.includes(x.rowid));
            // this.setArrays();
          }
        }

        this.loaderValue.updateIsloading(true);
        this.admin.getResultsByPoolAndUser(localStorage.getItem('id'), this.currentPool).subscribe(data2 => {
          this.loaderValue.updateIsloading(false);
          if (data2.code === 'D200') {
            console.log('data2', data2);

            this.matches.forEach(match => {
              const result = data2.data.find(x => (x.teamId1 === match.team1) && (x.teamId2 === match.team2));
              if (result !== undefined) {
                match.resultTeam1 = result.teamResult1;
                match.resultTeam2 = result.teamResult2;
              }
            });
            console.log(this.matches);


            // en algun momento se lleno los brackets
            if (this.pool.league === 'Copa America' || this.pool.league === 'generic') {
              console.log('i am here!');
              let allMatches = this.matches;
              this.matches = allMatches.filter(x => x.bracketType === null);


              // partidos de eliminatorias
              if (data2.data.length > 0) {

                let arrayBracket;

                arrayBracket = data2.data.slice(data2.data.length - (this.pool.tournamentType === '8vos' ? 16 : 8), data2.data.length);

                console.log('arrayBracket', arrayBracket);

                this.finalEighths = [];
                // llenamos 8vos
                if (this.pool.tournamentType === '8vos') {
                  arrayBracket.slice(0, 8).forEach(result => {
                    this.finalEighths.push({
                      team1: result.teamId1,
                      resultTeam1: result.teamResult1,
                      team2: result.teamId2,
                      resultTeam2: result.teamResult2,
                      penalty1: result.penalty1,
                      penalty2: result.penalty2,
                      date: result.date,
                      time: result.hour,
                      status: 0
                    });
                  });
                }

                // llenamos 4tos
                this.finalQuarters = [];
                arrayBracket.slice(0, 4).forEach(result => {
                  this.finalQuarters.push({
                    team1: result.teamId1,
                    resultTeam1: result.teamResult1,
                    team2: result.teamId2,
                    resultTeam2: result.teamResult2,
                    penalty1: result.penalty1,
                    penalty2: result.penalty2,
                    date: result.date,
                    time: result.hour,
                    status: 0
                  });
                });

                // llenamos semifinal
                this.semifinals = [];
                arrayBracket.slice(4, 6).forEach(result => {
                  this.semifinals.push({
                    team1: result.teamId1,
                    resultTeam1: result.teamResult1,
                    team2: result.teamId2,
                    resultTeam2: result.teamResult2,
                    penalty1: result.penalty1,
                    penalty2: result.penalty2,
                    date: result.date,
                    time: result.hour,
                    status: 0
                  });
                });

                // llenamos final
                this.final = [];
                arrayBracket.slice(6, 7).forEach(result => {
                  this.final.push({
                    team1: result.teamId1,
                    resultTeam1: result.teamResult1,
                    team2: result.teamId2,
                    resultTeam2: result.teamResult2,
                    penalty1: result.penalty1,
                    penalty2: result.penalty2,
                    date: result.date,
                    time: result.hour,
                    status: 0
                  });
                });

                // llenamos tercero
                this.thirdPosition = [];
                arrayBracket.slice(7, 8).forEach(result => {
                  this.thirdPosition.push({
                    team1: result.teamId1,
                    resultTeam1: result.teamResult1,
                    team2: result.teamId2,
                    resultTeam2: result.teamResult2,
                    penalty1: result.penalty1,
                    penalty2: result.penalty2,
                    date: result.date,
                    time: result.hour,
                    status: 0
                  });
                });
              }
            }

          } else if (data2.code === 'A401' || data2.code === 'A302' || data2.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          } else {
            console.log(this.teams);
          }
        }, error => {
          this.handleAlertsProvider.presentGenericAlert(error);
        });
      } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }

  validateSameResults(result) {
    return result.teamResult1 === result.teamResult2 ? 'true' : 'false';
  }

  someValidation(validation) {
    return validation.resultTeam1 === validation.resultTeam2;
  }

  registerValues() {
    if (this.pool.league === 'Copa America' || this.pool.league === 'generic') {
      console.log(this.finalQuarters, this.semifinals, this.thirdPosition, this.final);
      this.matches.push(...this.finalEighths);
      this.matches.push(...this.finalQuarters);
      this.matches.push(...this.semifinals);
      this.matches.push(...this.thirdPosition);
      this.matches.push(...this.final);
      if (this.matches.every(this.someValidation)) {
        this.handleAlertsProvider.presentGenericAlert('Has colocado un partido con dos resultados iguales "Empate", por favor cambialo...');
        return;
      } else {
        this.loaderValue.updateIsloading(true);
        this.pool.matchesInfo = this.matches;
        this.admin.clientRegisterToPool(this.userId, this.pool).subscribe(res => {
          this.loaderValue.updateIsloading(false);
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess('Has registrado los datos correctamente!');
            this.router.navigate(['/pools']);
          } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          } else if (res.code === 'D400') {
            this.handleAlertsProvider.presentSnackbarError(res.message);
          }
        });
      }
    } else {
      this.loaderValue.updateIsloading(true);
      this.pool.matchesInfo = this.matches;
      console.log(this.pool);

      this.admin.clientRegisterToPool(this.userId, this.pool).subscribe(res => {
        this.loaderValue.updateIsloading(false);
        if (res.code === 'D200') {
          this.handleAlertsProvider.presentSnackbarSuccess('Has registrado los datos correctamente!');
          this.router.navigate(['/pools']);
        } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
          this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
          this.router.navigate(['/auth']);
        } else if (res.code === 'D400') {
          this.handleAlertsProvider.presentSnackbarError(res.message);
        }
      });
    }
  }

  handleSelectTeam($event: any, match: any) {
    if (match.team1 === match.team2) {
      this.handleAlertsProvider.presentSnackbarError('Has seleccionado dos equipos iguales para un partido!');
    }
    console.log($event);
    console.log(match);
  }

  handleResult($event: any, arr: any[], match: any, i: number) {
    // if (match.resultTeam1 === match.resultTeam2) {
    //   this.handleAlertsProvider.presentErrorDialogOk('Debes agregar valores de penalties');
    // } else {
    //   arr[i].penalty1 = 0;
    //   arr[i].penalty2 = 0;
    // }
    console.log($event.target.value);
    console.log(arr);
    console.log(match);
    console.log(i);
  }

  setEights() {
    this.handleAlertsProvider.presentSnackbarSuccess('Se genero la siguiente fase: Octavos de final');

    let groupMatches = this.getBracketMatches('8vos', this.pool.tournamentType);

    for (let i = 0; i < 8; i++) {
      this.finalEighths.push({
        team1: null,
        resultTeam1: 0,
        team2: null,
        resultTeam2: 0,
        date: '2021-09-11',
        time: '00:00:00',
        status: 0,
        penalty1: 0,
        penalty2: 0
      });
    }
    this.finalQuarters = [];
    this.semifinals = [];
    this.final = [];
    this.thirdPosition = [];
  }

  setQuarters() {
    this.handleAlertsProvider.presentSnackbarSuccess('Se genero la siguiente fase: Cuartos de final');
    let groupMatches = this.getBracketMatches('4tos', this.pool.tournamentType);

    // B1 con A2, A1 con B2, D1 con C2, C1 con D2

    for (let i = 0; i < 4; i++) {
      this.finalQuarters.push({
        team1: null,
        resultTeam1: 0,
        team2: null,
        resultTeam2: 0,
        date: '2021-09-11',
        time: '00:00:00',
        status: 0,
        penalty1: 0,
        penalty2: 0
      });
    }
    this.semifinals = [];
    this.final = [];
    this.thirdPosition = [];
  }

  setSemiFinal() {
    this.handleAlertsProvider.presentSnackbarSuccess('Se genero la siguiente fase: Semifinales');
    for (let i = 0; i < 2; i++) {
      this.semifinals.push({
        team1: null,
        resultTeam1: 0,
        team2: null,
        resultTeam2: 0,
        date: '2021-09-11',
        time: '00:00:00',
        status: 0,
        penalty1: 0,
        penalty2: 0
      });
    }
    this.final = [];
    this.thirdPosition = [];

  }

  setFinal() {
    this.handleAlertsProvider.presentSnackbarSuccess('Se genero la siguiente fase: Final y Mejor tercero');
    for (let i = 0; i < 1; i++) {
      this.final.push({
        team1: null,
        resultTeam1: 0,
        team2: null,
        resultTeam2: 0,
        date: '2021-09-11',
        time: '00:00:00',
        status: 0,
        penalty1: 0,
        penalty2: 0
      });
    }
    for (let i = 0; i < 1; i++) {
      this.thirdPosition.push({
        team1: null,
        resultTeam1: 0,
        team2: null,
        resultTeam2: 0,
        date: '2021-09-11',
        time: '00:00:00',
        status: 0,
        penalty1: 0,
        penalty2: 0
      });
    }
  }

  fillMatch() {
    const test = (match) => (match.resultTeam1 !== null && match.resultTeam2 !== null);
    this.allMatchesFilled = !!this.matches.every(test);
    console.log(this.matches.some(test));
    console.log(this.matches);
  }

  getBracketMatches(type, bracketType, data = null) {
    if (type === '8vos' && bracketType === '8vos') {
      let groupMatches = this.pool.groupsInfo;
      this.matches.forEach(match => {
        // debemos saber a que grupo pertenece el partido
        const index = groupMatches.findIndex(x => x.teams.includes(match.team1));

        if (!groupMatches[index].matches) {
          groupMatches[index].matches = [];
        }
        groupMatches[index].matches.push(match);
      });

      groupMatches.forEach(groupMatch => {
        // inicializamos ranking
        groupMatch.ranking = [];

        groupMatch.teams.forEach(team => {
          groupMatch.ranking.push({
            team,
            result: 0
          });
        });

        if (groupMatch.matches) {
          // cargamos resultados en base a los partidos
          groupMatch.matches.forEach(match => {
            // team1 gana
            if (match.result1 > match.result2) {
              const index = groupMatch.ranking.findIndex(x => x.team === match.team1);
              groupMatch.ranking[index].result += 1;
            }
            // team2 gana
            if (match.result1 < match.result2) {
              const index = groupMatch.ranking.findIndex(x => x.team === match.team2);
              groupMatch.ranking[index].result += 1;
            }
            // empate
            if (match.result1 === match.result2) {
              // team1 gana
              if (match.penalty1 > match.penalty2) {
                const index = groupMatch.ranking.findIndex(x => x.team === match.team1);
                groupMatch.ranking[index].result += 1;
              } else {
                const index = groupMatch.ranking.findIndex(x => x.team === match.team2);
                groupMatch.ranking[index].result += 1;
              }
            }
          });
        }

        groupMatch.ranking.sort((a, b) => b.result - a.result);
      });

      console.log(groupMatches);

      return groupMatches;
    }
    if (type === '4tos' && bracketType === '8vos') {

    }
    if (type === '4tos' && bracketType === '4tos') {
      let groupMatches = this.pool.groupsInfo;
      this.matches.forEach(match => {
        // debemos saber a que grupo pertenece el partido
        const index = groupMatches.findIndex(x => x.teams.includes(match.team1));

        if (!groupMatches[index].matches) {
          groupMatches[index].matches = [];
        }
        groupMatches[index].matches.push(match);
      });

      groupMatches.forEach(groupMatch => {
        // inicializamos ranking
        groupMatch.ranking = [];

        groupMatch.teams.forEach(team => {
          groupMatch.ranking.push({
            team,
            result: 0
          });
        });

        if (groupMatch.matches) {
          // cargamos resultados en base a los partidos
          groupMatch.matches.forEach(match => {
            // team1 gana
            if (match.result1 > match.result2) {
              const index = groupMatch.ranking.findIndex(x => x.team === match.team1);
              groupMatch.ranking[index].result += 1;
            }
            // team2 gana
            if (match.result1 < match.result2) {
              const index = groupMatch.ranking.findIndex(x => x.team === match.team2);
              groupMatch.ranking[index].result += 1;
            }
            // empate
            if (match.result1 === match.result2) {
              // team1 gana
              if (match.penalty1 > match.penalty2) {
                const index = groupMatch.ranking.findIndex(x => x.team === match.team1);
                groupMatch.ranking[index].result += 1;
              } else {
                const index = groupMatch.ranking.findIndex(x => x.team === match.team2);
                groupMatch.ranking[index].result += 1;
              }
            }
          });
        }

        groupMatch.ranking.sort((a, b) => b.result - a.result);
      });

      console.log(groupMatches);
      return groupMatches;
    }

    return null;
  }
}







