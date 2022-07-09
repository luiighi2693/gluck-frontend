import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {LoaderProvider} from '../../utilities/providers/loader-provider';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {PeriodicElement} from '../pools-client/my-pools/my-pools.component';

export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  amount: number;
  status: number;
  coins: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  emailForm: FormGroup;
  exampleData = null;
  counter = 0;
  inProcessList = [];
  finishedList = [];

  // timer settings
  inProcessTimers = [];
  inProcessTimerControllers = [];

  displayedColumns: string[] = ['username', 'email', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private fb: FormBuilder,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.setUsersData();
    this.setPoolData();
    this.createForm();
  }

  createForm() {
    this.emailForm = this.fb.group({
      category: ['', Validators.required],
      subject: ['', Validators.required],
      manualSelection: [''],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    this.loaderValue.updateIsloading(true);
    const emailForm = this.emailForm.value;
    emailForm.manualSelection = this.selection.selected;
    this.admin.sendEmail(emailForm.category, emailForm.subject, emailForm.manualSelection, emailForm.message).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el mensaje con exito!');
        this.emailForm.reset();
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  setUsersData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getUsers().subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.dataSource = new MatTableDataSource<UserData>(res.data);
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  setPoolData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPoolsForAdmin().subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.inProcessList = res.pools.filter(x => x.result === 'IN PROCESS');
        console.log('resres' , this.inProcessList);
        this.finishedList = res.pools.filter(x => x.result === 'FINISHED');
        this.inProcessList.forEach((e, i) => {
          this.inProcessTimerControllers[i] = setInterval(() => {
            const futureDate = new Date(e.timeRemaining).getTime();
            // const futureDate = new Date('2022-08-06 17:00:00').getTime();
            const today = new Date().getTime();
            const distance = futureDate - today;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 ));
            const sec = Math.floor((distance % (1000 * 60)) / (1000));

            const timer = `${days} : ${hours} : ${min} : ${sec}`;
            this.inProcessTimers[i] = timer;
            if (distance < 0) {
              clearInterval(this.inProcessTimerControllers[i]);
              this.inProcessTimers[i] = 'Finalizado...';
            }
          }, 1000);
        });

        this.finishedList.forEach((e, i) => {
          e.timeRemaining = moment(e.timeRemaining).format('LL');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private startCounter(list) {
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
      }, 1000);
    });
    this.exampleData = list;
  }

  private formatDate(n: number) {
    return n < 10 ? ('0' + n) : n;
  }

  getPools(pools: any, isProgress: boolean) {
    this.counter = this.counter + 1;
    if (isProgress) {
      console.log(this.counter);
      return pools.filter(x => x.result === 'IN PROCESS');
    } else {
      return pools.filter(x => x.result === 'FINISHED');
    }
  }

  catchSport(sport: any) {
    if (sport === 'Futbol') {
      return 'assets/soccer-ball-variant.svg';
    }
  }

  goToDetailPool(id: number) {
    this.router.navigate([`/admin/pools/edit-pool/${id}`]);
  }
}
