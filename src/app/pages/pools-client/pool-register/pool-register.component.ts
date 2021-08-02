import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-pool-register',
  templateUrl: './pool-register.component.html',
  styleUrls: ['./pool-register.component.css']
})
export class PoolRegisterComponent implements OnInit, AfterViewInit {
  pool: any;
  matches: any;

  currentPool: string | number;
  showLoader = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider
  ) {
  }

  ngOnInit(): void {
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
    this.showLoader = true;
    this.admin.getPoolForEdit(this.currentPool)
      .pipe(finalize(() => this.showLoader = false))
      .subscribe(res => {
        if (res.code === 'D200') {
          console.log('pool', res);
          this.matches = res.data.matchesInfo;
          this.matches.forEach(match => {
            match.resultTeam1 = 0;
            match.resultTeam2 = 0;
          })
          this.pool = res.data;
          console.log(this.pool.name);
        } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
          this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
          this.router.navigate(['/auth']);
        }
      });
  }

  registerValues() {
    console.log(this.matches);
  }
}
