import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {finalize} from 'rxjs/operators';


export interface UserPool {
  poolName: string;
  id: string;
  sport: string;
  status: number;
  date: string;
}

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['id', 'poolName', 'sport', 'status', 'date', 'participants', 'remainingTime', 'opts'];
  dataSourceOneVsOne: MatTableDataSource<UserPool>;
  dataSourceWeekly: MatTableDataSource<UserPool>;
  dataSourceMonthly: MatTableDataSource<UserPool>;
  dataSourceprivate: MatTableDataSource<UserPool>;

  showLoader = false;
  user: string;
  password: any;
  userId: string;
  oneVsOnePools = [];
  privatePools = [];
  weeklyPools = [];
  monthlyPools = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
    this.admin.initToken();
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
          console.log(data.oneVSone)
          this.privatePools = data.privadas;
          this.monthlyPools = data.mensuales;
          this.oneVsOnePools = data.oneVSone;
          this.weeklyPools = data.semanales;
          this.dataSourceOneVsOne = new MatTableDataSource<UserPool>(this.oneVsOnePools);
          // this.dataSourceOneVsOne.paginator = this.paginator;
          // this.dataSourceOneVsOne.sort = this.sort;

          this.dataSourceWeekly = new MatTableDataSource<UserPool>(this.weeklyPools);
          // this.dataSourceWeekly.paginator = this.paginator;
          // this.dataSourceWeekly.sort = this.sort;

          this.dataSourceMonthly = new MatTableDataSource<UserPool>(this.monthlyPools);
          // this.dataSourceMonthly.paginator = this.paginator;
          // this.dataSourceMonthly.sort = this.sort;

          this.dataSourceprivate = new MatTableDataSource<UserPool>( this.privatePools);
          // this.dataSourceprivate.paginator = this.paginator;
          // this.dataSourceprivate.sort = this.sort;
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
      '50$',
      'chocolate',
      50,
      '../../../../../assets/example-user.png',
      '../../../../../assets/default-rules.png',
      this.password,
    );
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === undefined || res === null || res === '') {
        this.handleAlertsProvider.presentGenericAlert('Por Favor Ingrese una contrasena', 'Aviso');
      }
    });
  }

  showRemainingTime() {
    this.handleAlertsProvider.presentTimeRemainingDialog();
  }


  showParticipants() {
    const participants = [
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
      {
        username: 'alexperroloco2121',
        rowid: 32,
        image: '../../../../../assets/example-user.png',
      },
    ];
    this.handleAlertsProvider.presentParticipantsDialog(participants);
  }
}
