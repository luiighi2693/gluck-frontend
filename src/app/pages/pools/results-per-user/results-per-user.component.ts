import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: number;
  date_Access: string;
}

@Component({
  selector: 'app-results-per-user',
  templateUrl: './results-per-user.component.html',
  styleUrls: ['./results-per-user.component.css']
})
export class ResultsPerUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['game', 'userResults', 'finalResults', 'score'];
  dataSource: MatTableDataSource<UserData>;
  showLoader = false;
  currentPool: any;
  currentUser: any;
  getCurrentPool: any;
  getCurrentUser: any;
  tableData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.setData();
  }

  getData() {
    this.showLoader = true;
    this.getCurrentPool = this.route.params.subscribe(params => {
      this.currentPool = params.pool;
    });
    this.getCurrentUser = this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });
    this.admin.getResultsByPoolAndUser(this.currentUser, this.currentPool).subscribe(data => {
      console.log(data);
      if (data.code === 'D200') {
        this.showLoader = false;
        this.tableData = data;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
      this.showLoader = false;
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setData() {
    this.dataSource = new MatTableDataSource<UserData>(this.tableData.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
  }

  deleteUser(user) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${user.name}</b>?`, 'Aviso!');
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.showLoader = true;
        this.admin.deleteUser(user.rowid).subscribe(res => {
          this.showLoader = false;
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${user.name} con exito!`);
            this.setData();
          } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        }, err => {
          this.handleAlertsProvider.presentGenericAlert(err);
        });
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }
}

