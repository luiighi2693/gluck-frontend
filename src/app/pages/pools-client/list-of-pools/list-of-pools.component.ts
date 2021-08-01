import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PoolData} from '../../pools/list-of-pools/list-of-pools.component';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-list-of-pools',
  templateUrl: './list-of-pools.component.html',
  styleUrls: ['./list-of-pools.component.css']
})
export class ListOfPoolsComponent implements OnInit, AfterViewInit {

  showLoader = false;
  pools = [];

  constructor( private handleAlertsProvider: HandleAlertsProvider,
               private router: Router,
               private admin: AdminService) {
    this.admin.initToken();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.showLoader = true;
    this.admin.getPools().subscribe(data => {
      console.log(data);
      if (data.code === 'D200') {
        this.pools = data.data.filter(x => x.status === 1);

        this.admin.getPoolsByUser(sessionStorage.getItem('id')).subscribe(data2 => {
          console.log(data2);
          if (data2.code === 'D200') {
            this.showLoader = false;
            this.setMyPools(data2.data);
            console.log(this.pools);
            // this.pools = data.data.filter(x => x.status === 1);
          } else if (data2.code === 'A401' || data2.code === 'A302' || data2.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        }, error => {
          this.showLoader = false;
          this.handleAlertsProvider.presentGenericAlert(error);
        });
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  registerPool(pool: any) {
    console.log(pool.password);
    console.log(pool.passwordMatch);

    if (pool.password === '' || pool.password === null) {
      if (pool.passwordMatch === '' || pool.passwordMatch === undefined) {
        this.showLoader = true;
        this.admin.registerUserPool(pool.rowid, sessionStorage.getItem('id')).subscribe(data => {
          console.log(data);
          this.showLoader = false;
          if (data.code === 'D200') {
            this.goToEditResults(pool.rowid);
          } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        });
      } else {
        alert('Claves no coinciden!');
      }
    } else {
      if (pool.password === pool.passwordMatch) {
        this.showLoader = true;
        this.admin.registerUserPool(pool.rowid, sessionStorage.getItem('id')).subscribe(data => {
          console.log(data);
          this.showLoader = false;
          if (data.code === 'D200') {
            this.goToEditResults(pool.rowid);
          } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        });
      } else {
        alert('Claves no coinciden!');
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
    // todo: navegar a nueva vista de registros de resultados (pasar poolId)
    // this.router.navigate(['/auth']);
  }
}
