import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {EventBusService} from 'ng-simple-event-bus';
import {LoaderProvider} from '../../utilities/providers/loader-provider';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-shares',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  poolData: any;
  imagePath;
  user: string;

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private handleAlertsProvider: HandleAlertsProvider,
    private event: EventBusService,
    private loaderValue: LoaderProvider
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;  }

  ngOnInit(): void {
    this.user = localStorage.getItem('username');
    this.validateRegisterByUrl();
  }

  validateRegisterByUrl(): void {
    const userId = sessionStorage.getItem('id');
    this.route.queryParams.subscribe(url => {
      if (url.code) {
        console.log({
          code: url.code,
          user: userId
        });
        this.admin.getPoolInfo(userId, url.code).subscribe(res => {
          console.log(res);
          if (res.code === 'D200') {
            this.registerToPool(res.pools[0]);
            // this.handleAlertsProvider.presentSnackbarSuccess('El evento esta disponible ');
            // this.poolData = res.pools[0];
            // this.handleAlertsProvider.registerPoolDialog(
            //   this.poolData.id,
            //   this.poolData.name,
            //   'usuario sample',
            //   this.poolData.amountInput,
            //   this.poolData.awardValue,
            //   this.poolData.participants,
            //   '',
            //   this.poolData.rules,
            //   this.poolData.password);
            console.log(this.poolData);
          } else {
            this.handleAlertsProvider.presentErrorDialogOk(res.message, 'Ha ocurrido un error!', () => this.router.navigate(['']));
          }
        });
        // this.admin.registerUserByUrl(userId, url.code).subscribe(res => {
        //   if (res.code === 'D200') {
        //     this.handleAlertsProvider.presentSnackbarSuccess('Se registro a la quiniela con exito!');
        //     this.getCurrentUser();
        //     this.router.navigate(['/']);
        //   } else {
        //     this.handleAlertsProvider.presentSnackbarError(res.message);
        //     this.router.navigate(['/']);
        //   }
        // });
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
        this.event.trigger('getCoinsForRegisterPull', userData.coins);
        this.event.trigger('getMoneyForRegisterPull', userData.amount);
        // this.updateProfileForm.setValue(this.userData);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  registerToPool(data) {
    console.log(data);
    const dialogRef = this.handleAlertsProvider.registerPoolDialog(
      data.id,
      data.name,
      this.user,
      data.amountInput + '$ ' + data.coinsInput + 'G',
      data.awardValue,
      data.participants,
      '../../../../../assets/example-user.png',
      data.rules === '' ? '../../../../../assets/default-rules.png' : (this.imagePath + '/images/' + data.rules),
      '',
    );
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === null) {
        if (data.password === '' || data.password === null) {
          // if (res === null) {
          this.callRegisterPool(data.id);
          // } else {
          //   this.handleAlertsProvider.presentGenericAlert('Las Claves no coinciden!', 'Aviso');
          // }
        } else {
          if (data.password !== res) {
            this.handleAlertsProvider.presentGenericAlert('Las Claves no coinciden!', 'Aviso');
          } else {
            this.callRegisterPool(data.id);
          }
        }
      } else {
        if (data.password !== res) {
          this.handleAlertsProvider.presentGenericAlert('Las Claves no coinciden!', 'Aviso');
        } else {
          this.callRegisterPool(data.id);
        }
      }
    });
  }

  private callRegisterPool(id) {
    this.loaderValue.updateIsloading(true);
    this.admin.registerUserPool(id, localStorage.getItem('id')).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se registro en el evento con exito!');
        this.getCurrentUser();
        this.goToEditResults(id);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      } else if(data.code === 'D401') {
        this.handleAlertsProvider.presentGenericAlert(data.message, 'Ocurrio un error');
      }
    });
  }

  goToEditResults(pool) {
    this.router.navigate([`/pools/pool-register/${pool}`]);
  }

  refreshPage() {
    this.ngOnInit();
  }
}
