import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  hotPools = [];
  constructor(
    private router: Router,
    private handleAlertsProvider: HandleAlertsProvider,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.setPoolData();
  }

  setPoolData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPools().subscribe(res => {
      this.loaderValue.updateIsloading(false);
      console.log(res);
      if (res.code === 'D200') {
        this.hotPools = res.data.filter(x => x.hot === 1);
        // this.startCounter(res.pools);

      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  catchSport(sport: any) {
    if (sport === 'Futbol') {
      return 'assets/soccer-ball-variant.svg';
    }
  }

  goToExternalUrl(url) {
    window.open(url, '_blank');
  }
}
