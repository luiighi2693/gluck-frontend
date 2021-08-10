import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
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

@Component({
  selector: 'app-my-pools',
  templateUrl: './my-pools.component.html',
  styleUrls: ['./my-pools.component.css']
})
export class MyPoolsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['id', 'name', 'dollarPrice', 'gCoinPrice', 'prize', 'participants', 'remainingTime', 'opts'];

  dataSourceRegistered = new MatTableDataSource<PeriodicElement>();
  dataSourceProgress = new MatTableDataSource<PeriodicElement>();
  dataSourceHistorical = new MatTableDataSource<PeriodicElement>();

  showLoader = false;
  user: string;

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
      const eventTime = item.remainingTime === null ? moment() : moment(item.remainingTime);
      const currentTime = moment();
      const leftTime = eventTime.valueOf() - currentTime.valueOf();
      let duration = moment.duration(leftTime, 'milliseconds');

      setInterval(() => {

        // Time Out check
        if (duration.asSeconds() > 0) {
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');
          // tslint:disable-next-line:max-line-length
          item.remainingTime = (duration.days() > 0 ? (duration.days() + ' dia(s) ') : '') + this.formatDate(duration.hours()) + ':' + this.formatDate(duration.minutes()) + ':' + this.formatDate(duration.seconds());
        } else {
          item.remainingTime = '00:00:00';
        }

        dataSource = new MatTableDataSource<PeriodicElement>(list);


      }, 1000);
    });
  }

  ngAfterViewInit() {
  }

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
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
