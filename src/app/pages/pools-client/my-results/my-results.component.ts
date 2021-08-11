import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-pool-result',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.css']
})
export class MyResultsComponent implements OnInit, AfterViewInit {
  data = null;
  currentPool;
  username: string;
  imagePath;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute,
    private loaderValue: LoaderProvider,
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.getCurrentPool();
  }

  ngAfterViewInit() {
    this.setData();
  }

  getCurrentPool() {
    this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    const id = sessionStorage.getItem('userSearch') === null ? sessionStorage.getItem('id') : sessionStorage.getItem('userSearch');
    this.username = sessionStorage.getItem('usernameSearch') === null ? sessionStorage.getItem('username') : sessionStorage.getItem('usernameSearch');

    this.admin.getResultsByPoolAndUser(id, this.currentPool).subscribe(data => {

      this.loaderValue.updateIsloading(true);
      if (data.code === 'D200') {
        this.data = data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

}
