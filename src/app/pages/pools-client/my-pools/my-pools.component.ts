import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';

export interface PeriodicElement {
  name: string;
  id: string;
  dollarPrice: string;
  gCoinPrice: string;
  prize: string;
  participants: string;
  remainingTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '1',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '2',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '3',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '4',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '5',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '6',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '7',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '8',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '9',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
  {
    id: '10',
    name: 'Hola como estas bien y tu?',
    dollarPrice: '$5',
    gCoinPrice: '(G) 5',
    prize: '$400',
    participants: '30/200',
    remainingTime: '2:00:54'
  },
];

@Component({
  selector: 'app-my-pools',
  templateUrl: './my-pools.component.html',
  styleUrls: ['./my-pools.component.css']
})
export class MyPoolsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['id', 'name', 'dollarPrice', 'gCoinPrice', 'prize', 'participants', 'remainingTime', 'opts'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  dataSourceRegistered = new MatTableDataSource<PeriodicElement>();
  dataSourceProgress = new MatTableDataSource<PeriodicElement>();
  dataSourceHistorical = new MatTableDataSource<PeriodicElement>();

  showLoader = false;
  user: string;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  registered: PeriodicElement[] = [];
  progress: PeriodicElement[] = [];
  historical: PeriodicElement[] = [];

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    this.showLoader = true;
    this.admin.getMyPools(sessionStorage.getItem('id')).subscribe(data => {
      console.log(data);
      this.showLoader = false;
      if (data.code === 'D200') {

        data.registered.forEach(row => {
          this.registered.push({
            id: row.id,
            name: row.name,
            dollarPrice: row.amountInput,
            gCoinPrice: row.coinsInput,
            prize: row.awardValue,
            participants: row.participants,
            remainingTime: row.timeRemaining
          });
        });

        data.progress.forEach(row => {
          this.progress.push({
            id: row.id,
            name: row.name,
            dollarPrice: row.amountInput,
            gCoinPrice: row.coinsInput,
            prize: row.awardValue,
            participants: row.participants,
            remainingTime: row.timeRemaining
          });
        });

        data.historical.forEach(row => {
          this.historical.push({
            id: row.id,
            name: row.name,
            dollarPrice: row.amountInput,
            gCoinPrice: row.coinsInput,
            prize: row.awardValue,
            participants: row.participants,
            remainingTime: row.timeRemaining
          });
        });

        console.log(this.registered);
        console.log(this.progress);
        console.log(this.historical);

        this.dataSourceRegistered = new MatTableDataSource<PeriodicElement>(this.registered);
        this.dataSourceProgress = new MatTableDataSource<PeriodicElement>(this.progress);
        this.dataSourceHistorical = new MatTableDataSource<PeriodicElement>(this.historical);

        this.startCounter(this.registered, this.dataSourceRegistered);
        this.startCounter(this.progress, this.dataSourceProgress);
        this.startCounter(this.historical, this.dataSourceHistorical);

      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });


  }

  startCounter(list, dataSource) {
    list.forEach(item => {
      let eventTime = item.remainingTime === null ? moment() : moment(item.remainingTime);
      let currentTime = moment();
      const leftTime = eventTime.valueOf() - currentTime.valueOf();
      let duration = moment.duration(leftTime, 'milliseconds');

      setInterval(() => {

        // Time Out check
        if (duration.asSeconds() > 0) {
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');
          item.remainingTime = (duration.days() > 0 ? (duration.days() + ' dia(s) ') : '') + this.formatDate(duration.hours()) + ':' + this.formatDate(duration.minutes()) + ':' + this.formatDate(duration.seconds());
        } else {
          item.remainingTime = '00:00:00';
        }

        dataSource = new MatTableDataSource<PeriodicElement>(list);


      }, 1000);
    });
    // let eventTime = moment('2021-08-05 23:44:00');
    // let currentTime = moment();
    // console.log(eventTime, currentTime);
    // const leftTime = eventTime.valueOf() - currentTime.valueOf();
    // let duration = moment.duration(leftTime, 'milliseconds');
    // console.log(duration.hours() + ':' + duration.minutes() + ':' + duration.seconds());
    //
    // setInterval(() => {
    //
    //   // Time Out check
    //   if (duration.asSeconds() > 0) {
    //     duration = moment.duration(duration.asSeconds() - 1, 'seconds');
    //     ELEMENT_DATA[0].remainingTime = (duration.days() > 0 ? (duration.days() + ' dia(s) ') : '') + this.formatDate(duration.hours()) + ':' + this.formatDate(duration.minutes()) + ':' + this.formatDate(duration.seconds());
    //     this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    //   } else {
    //     ELEMENT_DATA[0].remainingTime = '00:00:00';
    //   }
    //
    // }, 1000);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSourceRegistered.paginator = this.paginator;
    // this.dataSourceRegistered.sort = this.sort;
    // this.dataSourceProgress.paginator = this.paginator;
    // this.dataSourceProgress.sort = this.sort;
    // this.dataSourceHistorical.paginator = this.paginator;
    // this.dataSourceHistorical.sort = this.sort;
    // this.setData();
  }

  // setData() {
  //   this.showLoader = true;
  //   this.admin.getUsers().subscribe(data => {
  //     if (data.code === 'D200') {
  //       this.showLoader = false;
  //       this.dataSource = new MatTableDataSource<UserData>(data.data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
  //       this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
  //       this.router.navigate(['/auth']);
  //     }
  //   }, error => {
  //     this.showLoader = false;
  //     this.handleAlertsProvider.presentGenericAlert(error);
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
  }

  // deleteUser(user) {
  //   const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${user.name}</b>?`, 'Aviso!');
  //   dialogRef.afterClosed().subscribe(response => {
  //     if (response) {
  //       this.showLoader = true;
  //       this.admin.deleteUser(user.rowid).subscribe(res => {
  //         this.showLoader = false;
  //         if (res.code === 'D200') {
  //           this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${user.name} con exito!`);
  //           this.setData();
  //         } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
  //           this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
  //           this.router.navigate(['/auth']);
  //         }
  //       }, err => {
  //         this.handleAlertsProvider.presentGenericAlert(err);
  //       });
  //     }
  //   }, error => {
  //     this.handleAlertsProvider.presentGenericAlert(error);
  //   });
  // }

  showRemainingTime(id) {
    alert(id);

  }

  showParticipants(id) {
    alert(id);
  }

  enterPool(id) {
    alert(id);
  }

  goToRegister(data) {
    alert(data);
  }

  registerToPool(id, name) {
    console.log(id, name);
    sessionStorage.setItem('poolName', name);
    this.router.navigate([`/home/pools/pools-results/${id}`]);
  }

  private formatDate(n: number) {
    return n < 10 ? ('0' + n) : n;
  }
}
