import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {brackets, champion} from '../../../../assets/mock/mock-brackets';

@Component({
  selector: 'app-pool-register',
  templateUrl: './pool-register.component.html',
  styleUrls: ['./pool-register.component.css']
})
export class PoolRegisterComponent implements OnInit, AfterViewInit {
  pool: any;
  matches: any;
  userId: any;
  teams: any;

  currentPool: string | number;
  imagePath;
  bracketsData = brackets;
  finalQuarters = [];
  semifinals = [];
  final = [];
  thirdPosition = [];
  champion: any;

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
    this.getParam();
    this.setTeamsData();
    if (this.pool.league === 'Copa America') {
      this.setArrays();
    }
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

    for (let i = 0; i < 2; i++) {
      this.semifinals.push({
        team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
      });
    }

    for (let i = 0; i < 1; i++) {
      this.final.push({
        team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
      });
    }

    for (let i = 0; i < 1; i++) {
      this.thirdPosition.push({
        team1: null, resultTeam1: 0, team2: null, resultTeam2: 0, date: '2021-09-11', time: '00:00:00', status: 0
      });
    }

  }

  setTeamsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getTeams().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        console.log(data);
        this.teams = data.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
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
        this.matches = res.data.matchesInfo;
        this.matches.forEach(match => {
          match.resultTeam1 = 0;
          match.resultTeam2 = 0;
        });
        this.pool = res.data;
        console.log(this.pool);

        this.loaderValue.updateIsloading(true);
        this.admin.getResultsByPoolAndUser(sessionStorage.getItem('id'), this.currentPool).subscribe(data2 => {
          this.loaderValue.updateIsloading(false);
          if (data2.code === 'D200') {
            this.matches.forEach(match => {
              const result = data2.data.find(x => (x.teamId1 === match.team1) && (x.teamId2 === match.team2));
              match.resultTeam1 = result.teamResult1;
              match.resultTeam2 = result.teamResult2;
            });
          } else if (data2.code === 'A401' || data2.code === 'A302' || data2.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
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
    console.log(this.finalQuarters, this.semifinals, this.thirdPosition, this.final);
    console.log(this.final.every(this.someValidation));
    if (this.finalQuarters.every(this.someValidation) || this.semifinals.every(this.someValidation) || this.final.every(this.someValidation) || this.thirdPosition.every(this.someValidation)) {
      this.handleAlertsProvider.presentGenericAlert('Has colocado un partido con dos resultados iguales "Empate", por favor cambialo...');
      return;
    } else {
      this.loaderValue.updateIsloading(true);
      this.matches.push(...this.finalQuarters);
      this.matches.push(...this.semifinals);
      this.matches.push(...this.thirdPosition);
      this.matches.push(...this.final);
      this.pool.matchesInfo = this.matches;
      this.admin.clientRegisterToPool(this.userId, this.pool).subscribe(res => {
        this.loaderValue.updateIsloading(false);
        if (res.code === 'D200') {
          this.handleAlertsProvider.presentSnackbarSuccess('Has registrado los datos correctamente!');
          this.router.navigate(['home/pools']);
        } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
          this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
          this.router.navigate(['/auth']);
        }
      });
    }
  }
}
