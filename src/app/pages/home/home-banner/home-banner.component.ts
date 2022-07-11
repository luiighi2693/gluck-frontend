import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {EventBusService} from 'ng-simple-event-bus';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  imagePath;
  user: string;
  amountSelected;
  coinsSelected;
  hotPools = [];
  timers = [];
  timerControllers = [];
  constructor(
    private router: Router,
    private handleAlertsProvider: HandleAlertsProvider,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
    private event: EventBusService,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    this.setPoolData();
  }

  setPoolData() {
    const userId = sessionStorage.getItem('id');
    this.loaderValue.updateIsloading(true);
    this.admin.getHotPools(userId).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.hotPools = res.pools;
        console.log('hot pools', this.hotPools);
        this.hotPools.forEach((e, i) => {
          this.timerControllers[i] = setInterval(() => {
            // const finishDateTime =  e.dateFinish + ' ' + e.timeFinish;
            const futureDate = new Date(e.timeRemaining).getTime();
            // const futureDate = new Date('2022-08-06 17:00:00').getTime();
            const today = new Date().getTime();
            const distance = futureDate - today;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 ));
            const sec = Math.floor((distance % (1000 * 60)) / (1000));

            const timer = `${days} : ${hours} : ${min} : ${sec}`;
            this.timers[i] = timer;
            if (distance < 0) {
              clearInterval(this.timerControllers[i]);
              this.timers[i] = 'Finalizado...';
            }
          }, 1000);

        });
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

  goToDetail(id: number) {
    this.router.navigate([``]);
  }

  registerToPool(data) {
    console.log(data);
    this.amountSelected = data.amountInput;
    this.coinsSelected = data.coinsInput;
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
    this.admin.registerUserPool(id, sessionStorage.getItem('id')).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.updateMoney();
        this.updateCoins();
        this.goToEditResults(id);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }

  updateMoney() {
    this.event.trigger('getMoney', this.amountSelected * (-1));
  }

  updateCoins() {
    this.event.trigger('getCoins', this.coinsSelected * (-1));
  }

  goToEditResults(pool) {
    this.router.navigate([`/home/pools/pool-register/${pool}`]);

    // if (pool.timeRemaining === '00:00:00' && !pool.registered) {
    //   alert('este evento esta cerrado');
    // } else if (pool.registered) {
    //   this.router.navigate([`/home/pools/pool-register/${pool.id}`]);
    // }

    // if (new Date() > new Date(pool.date)) {
    //   alert('este evento esta cerrado');
    // } else if (pool.registered) {
    //   this.router.navigate([`/home/pools/pool-register/${pool.id}`]);
    // }
  }
}


