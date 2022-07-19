import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {EventBusService} from 'ng-simple-event-bus';
import {LoaderProvider} from '../../utilities/providers/loader-provider';

@Component({
  selector: 'app-shares',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
    private event: EventBusService,
    private loaderValue: LoaderProvider
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.validateRegisterByUrl();
  }

  validateRegisterByUrl(): void {
    const userId = sessionStorage.getItem('id');
    this.route.queryParams.subscribe(url => {
      if (url.code) {
        this.admin.registerUserByUrl(userId, url.code).subscribe(res => {
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess('Se registro a la quiniela con exito!');
            this.getCurrentUser();
            this.router.navigate(['/']);
          } else {
            this.handleAlertsProvider.presentSnackbarError(res.message);
            this.router.navigate(['/']);
          }
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getCurrentUser() {
    const id = sessionStorage.getItem('id');
    this.loaderValue.updateIsloading(true);
    this.admin.getUser(id).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        const userData = response.data;
        console.log(userData);
        this.event.trigger('getCoins', userData.coins);
        this.event.trigger('getMoney', userData.money);
        // this.updateProfileForm.setValue(this.userData);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  // updateMoney() {
  //   this.event.trigger('getMoney', this.amountSelected * (-1));
  // }
  //
  // updateCoins() {
  //   this.event.trigger('getCoins', this.coinsSelected * (-1));
  // }

}
