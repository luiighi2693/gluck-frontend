import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';
import {PeriodicElement} from '../my-pools/my-pools.component';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';
import {EventBusService} from 'ng-simple-event-bus';

export interface UserPool {
  name: string;
  sport: string;
  status: number;
  date: string;
  timeRemaining: string;
  registered: string;
}

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['name', 'sport', 'status', 'date', 'participants', 'remainingTime', 'opts'];
  dataSourceOneVsOne: MatTableDataSource<UserPool>;
  dataSourceWeekly: MatTableDataSource<UserPool>;
  dataSourceMonthly: MatTableDataSource<UserPool>;
  dataSourceprivate: MatTableDataSource<UserPool>;

  user: string;
  userId: string;
  oneVsOnePools = [];
  privatePools = [];
  weeklyPools = [];
  monthlyPools = [];
  todayDate = new Date();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath;

  amountSelected;
  coinsSelected;
  poolCategory;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
    private event: EventBusService,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    this.userId = sessionStorage.getItem('id');
    this.poolCategory = sessionStorage.getItem('poolCategory');
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getAvailablePools(this.userId, this.poolCategory).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.privatePools = data.privadas;
        this.monthlyPools = data.mensuales;
        this.oneVsOnePools = data.oneVSone;
        this.weeklyPools = data.semanales;

        this.dataSourceOneVsOne = new MatTableDataSource<any>(this.oneVsOnePools);
        this.dataSourceWeekly = new MatTableDataSource<any>(this.weeklyPools);
        this.dataSourceMonthly = new MatTableDataSource<any>(this.monthlyPools);
        this.dataSourceprivate = new MatTableDataSource<any>(this.privatePools);

        this.startCounter(this.oneVsOnePools, this.dataSourceOneVsOne);
        this.startCounter(this.weeklyPools, this.dataSourceWeekly);
        this.startCounter(this.monthlyPools, this.dataSourceMonthly);
        this.startCounter(this.privatePools, this.dataSourceprivate);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  registerToPool(data) {
    console.log(data);
    this.amountSelected = data.amountInput;
    this.coinsSelected = data.coinsInput;
    const dialogRef = this.handleAlertsProvider.registerPoolDialog(
      data.id,
      data.poolName,
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
      }
    });
  }

  showRemainingTime(timeRamaining) {
    this.handleAlertsProvider.presentTimeRemainingDialog(timeRamaining);
  }


  showParticipants(id) {
    this.loaderValue.updateIsloading(true);
    this.admin.getUsersByPool(id).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        const participants = [];

        data.data.forEach(user => {
          participants.push({
            username: user.username,
            rowid: user.rowid,
            image: user.img === '' ? '../../../../../assets/example-user.png' : (this.imagePath + '/images/' + user.img)
          });
        });

        this.handleAlertsProvider.presentParticipantsDialog(participants);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  startCounter(list, dataSource) {
    list.forEach(item => {
      const eventTime = item.timeRemaining === null ? moment() : moment(item.timeRemaining);
      const currentTime = moment();
      const leftTime = eventTime.valueOf() - currentTime.valueOf();
      let duration = moment.duration(leftTime, 'milliseconds');

      setInterval(() => {

        // Time Out check
        if (duration.asSeconds() > 0) {
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');
          // tslint:disable-next-line:max-line-length
          item.timeRemaining = (duration.days() > 0 ? (duration.days() + ' dia(s) ') : '') + this.formatDate(duration.hours()) + ':' + this.formatDate(duration.minutes()) + ':' + this.formatDate(duration.seconds());
        } else {
          item.timeRemaining = '00:00:00';
        }

        dataSource = new MatTableDataSource<PeriodicElement>(list);


      }, 1000);
    });
  }

  private formatDate(n: number) {
    return n < 10 ? ('0' + n) : n;
  }

  private callRegisterPool(id) {
    this.loaderValue.updateIsloading(true);
    this.admin.registerUserPool(id, sessionStorage.getItem('id')).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        // this.updateMoney();
        // this.updateCoins();
        this.getCurrentUser();
        this.goToEditResults(id);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }

  goToEditResults(pool) {
    console.log(pool);
    if (pool.timeRemaining === '00:00:00' && !pool.registered) {
      alert('este evento esta cerrado');
    } else if (pool.registered) {
      this.router.navigate([`/pools/pool-register/${pool.id}`]);
    }
    // if (new Date() > new Date(pool.date)) {
    //   alert('este evento esta cerrado');
    // } else if (pool.registered) {
    //   this.router.navigate([`/home/pools/pool-register/${pool.id}`]);
    // }
  }

  // updateMoney() {
  //   this.event.trigger('getMoney', this.amountSelected * (-1));
  // }
  //
  // updateCoins() {
  //   this.event.trigger('getCoins', this.coinsSelected * (-1));
  // }

  getCurrentUser() {
    const id = sessionStorage.getItem('id');
    this.loaderValue.updateIsloading(true);
    this.admin.getUser(id).subscribe(response => {
      this.loaderValue.updateIsloading(false);
      if (response.code === 'D200') {
        const userData = response.data;
        this.event.trigger('getCoins', {type: 'spent', amount: userData.coins});
        this.event.trigger('getMoney', {type: 'spent', amount: userData.money});
        // this.updateProfileForm.setValue(this.userData);
      } else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }
}
