import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-pool-result',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.css']
})
export class MyResultsComponent implements OnInit, AfterViewInit {
  showLoader = false;
  data = null;
  getCurrentPool;
  currentPool;
  username;
  imagePath;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.getCurrentPool = this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.showLoader = true;
    this.admin.getResultsByPoolAndUser(sessionStorage.getItem('id'), this.currentPool).subscribe(data => {
      this.showLoader = false;
      console.log(data);
      if (data.code === 'D200') {
        this.data = data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

}
