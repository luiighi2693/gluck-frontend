import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';
import {PeriodicElement} from "../my-pools/my-pools.component";
import {environment} from "../../../../environments/environment";

export interface UserPool {
  name: string;
  id: string;
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

  displayedColumns: string[] = ['id', 'name', 'sport', 'status', 'date', 'participants', 'remainingTime', 'opts'];
  dataSourceOneVsOne: MatTableDataSource<UserPool>;
  dataSourceWeekly: MatTableDataSource<UserPool>;
  dataSourceMonthly: MatTableDataSource<UserPool>;
  dataSourceprivate: MatTableDataSource<UserPool>;

  showLoader = false;
  user: string;
  userId: string;
  oneVsOnePools = [];
  privatePools = [];
  weeklyPools = [];
  monthlyPools = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    this.userId = sessionStorage.getItem('id');
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.showLoader = true;
    this.admin.getAvailablePools(this.userId)
      .pipe(finalize(() => this.showLoader = false))
      .subscribe(data => {
        if (data.code === 'D200') {
          this.privatePools = data.privadas;
          this.monthlyPools = data.mensuales;
          this.oneVsOnePools = data.oneVSone;
          this.weeklyPools = data.semanales;
          console.log(this.privatePools, this.monthlyPools, this.oneVsOnePools, this.weeklyPools);

          this.dataSourceOneVsOne = new MatTableDataSource<any>(this.oneVsOnePools);
          this.dataSourceWeekly = new MatTableDataSource<any>(this.weeklyPools);
          this.dataSourceMonthly = new MatTableDataSource<any>(this.monthlyPools);
          this.dataSourceprivate = new MatTableDataSource<any>( this.privatePools);

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

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceOneVsOne.filter = filterValue.trim().toLowerCase();
  //   this.dataSourceWeekly.filter = filterValue.trim().toLowerCase();
  //   this.dataSourceMonthly.filter = filterValue.trim().toLowerCase();
  //   this.dataSourceprivate.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSourceOneVsOne.paginator) {
  //     this.dataSourceOneVsOne.paginator.firstPage();
  //   }
  //   if (this.dataSourceWeekly.paginator) {
  //     this.dataSourceWeekly.paginator.firstPage();
  //   }
  //   if (this.dataSourceMonthly.paginator) {
  //     this.dataSourceMonthly.paginator.firstPage();
  //   }
  //   if (this.dataSourceprivate.paginator) {
  //     this.dataSourceprivate.paginator.firstPage();
  //   }
  // }

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
  }

  enterPool(id) {
    alert(id);
  }

  goToRegister(data) {
    alert(data);
  }

  registerToPool(data) {
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

      if (res !== undefined) {
        if (data.password === '' || data.password === null) {
          if (res === '') {
            this.callRegisterPool(data.id);
          } else {
            this.handleAlertsProvider.presentGenericAlert('Las Claves no coinciden!', 'Aviso');
          }
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
    this.showLoader = true;
    this.admin.getUsersByPool(id)
      .pipe(finalize(() => this.showLoader = false))
      .subscribe(data => {
        if (data.code === 'D200') {
          let participants = [];

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
    this.showLoader = true;
    this.admin.registerUserPool(id, sessionStorage.getItem('id')).subscribe(data => {
      console.log(data);
      this.showLoader = false;
      if (data.code === 'D200') {
        this.goToEditResults(id);
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    });
  }

  goToEditResults(poolId) {
    this.router.navigate([`/home/pools/pool-register/${poolId}`]);
  }
}
