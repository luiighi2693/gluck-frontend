import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import * as moment from 'moment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

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

  displayedColumns: string[] = ['name', 'dollarPrice', 'gCoinPrice', 'prize', 'participants', 'remainingTime', 'opts'];

  dataSourceRegistered = new MatTableDataSource<PeriodicElement>();
  dataSourceProgress = new MatTableDataSource<PeriodicElement>();
  dataSourceHistorical = new MatTableDataSource<PeriodicElement>();

  user: string;

  registered: PeriodicElement[] = [];
  progress: PeriodicElement[] = [];
  historical: PeriodicElement[] = [];

  timers = [];

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('username');
    this.setMyPoolsData();
  }

  setMyPoolsData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getMyPools(sessionStorage.getItem('id')).subscribe(data => {
      this.loaderValue.updateIsloading(false);
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
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  startCounter(list, dataSource) {
    list.forEach((item, i) => {
      // console.log(moment.duration(moment().diff(item.remainingTime)));
      const eventTime = item.remainingTime === null ? moment() : moment(item.remainingTime);
      const currentTime = moment();
      const leftTime = eventTime.valueOf() - currentTime.valueOf();
      let duration = moment.duration(leftTime, 'milliseconds');
      // console.log('duration', duration.asSeconds());
      // console.log('remainingTime', item.remainingTime);

      this.timers[i] = setInterval(() => {

        // Time Out check
        if (duration.asSeconds() > 0) {
          duration = moment.duration(duration.asSeconds() - 1, 'seconds');
          // tslint:disable-next-line:max-line-length
          item.remainingTime = (duration.months() > 0 ? (duration.months() + ' mes(es) ') : '') + (duration.days() > 0 ? (duration.days() + ' dia(s) ') : '') + this.formatDate(duration.hours()) + ':' + this.formatDate(duration.minutes()) + ':' + this.formatDate(duration.seconds());
        } else {
          this.admin.updatePoolStatusToInProcess(item.id).subscribe(_ => {
            clearInterval(this.timers[i]);
            item.remainingTime = '00:00:00';

          });
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
    sessionStorage.setItem('poolName', name);
    this.router.navigate([`/pools/pools-results/${id}`]);
  }

  private formatDate(n: number) {
    return n < 10 ? ('0' + n) : n;
  }

  goToEditResult(id) {
    this.router.navigate([`/pools/pool-register/${id}`]);
  }

  goToRanking(id) {
    this.router.navigate([`/pools/ranking/${id}`]);
  }

  isEnoughSpace(participants: any) {
    const peopleIn = Number(participants.split('/')[0]);
    const maxPeople = Number(participants.split('/')[1]);

    return peopleIn < maxPeople;
  }


  generateUrl(row) {
    console.log(row);
    this.loaderValue.updateIsloading(true);
    this.admin.getGeneratedLinkByPool(row.id).subscribe(res => {
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentGeneratedUrlDialog(res.link);
      }
      this.loaderValue.updateIsloading(false);
    });
    // this.handleAlertsProvider.presentGeneratedUrlDialog('http://localhost:4200/admin/pools/list-of-pools');
  }
}
