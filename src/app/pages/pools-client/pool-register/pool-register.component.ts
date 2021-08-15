import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-pool-register',
  templateUrl: './pool-register.component.html',
  styleUrls: ['./pool-register.component.css']
})
export class PoolRegisterComponent implements OnInit, AfterViewInit {
  pool: any;
  matches: any;
  userId: any;

  currentPool: string | number;
  imagePath;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private loaderValue: LoaderProvider,
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');
    this.getParam();
  }

  ngAfterViewInit(): void {
    this.getPoolData();
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

        this.loaderValue.updateIsloading(true);
        this.admin.getResultsByPoolAndUser(sessionStorage.getItem('id'), this.currentPool).subscribe(data2 => {
          this.loaderValue.updateIsloading(false);
          if (data2.code === 'D200') {
            this.matches.forEach(match => {
              const result = data2.data.find(x => (x.teamId1 === match.team1) && (x.teamId2 === match.team2));
              console.log(result);
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

  registerValues() {
    this.loaderValue.updateIsloading(true);
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
