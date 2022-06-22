import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-list-of-pools',
  templateUrl: './list-of-pools.component.html',
  styleUrls: ['./list-of-pools.component.css']
})
export class ListOfPoolsComponent implements OnInit, AfterViewInit {

  pools = [];

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPools().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.pools = data.data.filter(x => x.status === 1);
        this.admin.getPoolsByUser(sessionStorage.getItem('id')).subscribe(data2 => {
          if (data2.code === 'D200') {
            this.setMyPools(data2.data);
          } else if (data2.code === 'A401' || data2.code === 'A302' || data2.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        }, error => {
          this.handleAlertsProvider.presentGenericAlert(error);
        });
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  registerPool(pool: any) {
    if (pool.password === '' || pool.password === null) {
      if (pool.passwordMatch === '' || pool.passwordMatch === undefined) {
        this.loaderValue.updateIsloading(true);
        this.admin.registerUserPool(pool.rowid, sessionStorage.getItem('id')).subscribe(data => {
          this.loaderValue.updateIsloading(false);
          if (data.code === 'D200') {
            this.goToEditResults(pool.rowid);
          } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        });
      } else {
        this.handleAlertsProvider.presentSnackbarError('Claves no coinciden!');
      }
    } else {
      if (pool.password === pool.passwordMatch) {
        this.loaderValue.updateIsloading(true);
        this.admin.registerUserPool(pool.rowid, sessionStorage.getItem('id')).subscribe(data => {
          this.loaderValue.updateIsloading(false);
          if (data.code === 'D200') {
            this.goToEditResults(pool.rowid);
          } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        });
      } else {
        this.handleAlertsProvider.presentSnackbarError('Las Claves no coinciden!');
      }
    }
  }

  private setMyPools(data) {
    this.pools.forEach(pool => {
      pool.subcribed = false;
      data.forEach(poodId => {
        if (pool.rowid === poodId.fk_q_pools) {
          pool.subcribed = true;
        }
      });
    });
  }

  goToEditResults(poolId) {
    this.router.navigate([`/home/pools/pool-register/${poolId}`]);
  }
}
