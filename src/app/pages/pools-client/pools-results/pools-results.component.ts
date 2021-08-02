import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-pools-results',
  templateUrl: './pools-results.component.html',
  styleUrls: ['./pools-results.component.css']
})
export class PoolsResultsComponent implements OnInit {

  data = [];
  showLoader = false;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.admin.getResultsUserForClient(sessionStorage.getItem('id')).subscribe(data => {
      this.showLoader = false;
      console.log(data);
      if (data.code === 'D200') {
        this.data = data.data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  goToRoute(id) {
    this.router.navigate([`/home/pools/pool-result/${id}`]);
  }
}
