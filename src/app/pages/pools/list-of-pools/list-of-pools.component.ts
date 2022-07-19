import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

export interface PoolList {
  rowid: string;
  name: string;
  status: number;
  date_Create: string;
  color: string;
  sport: object;
}

@Component({
  selector: 'app-list-of-pools',
  templateUrl: './list-of-pools.component.html',
  styleUrls: ['./list-of-pools.component.css']
})
export class ListOfPoolsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'name', 'sport', 'status', 'date_Create', 'color', 'opts'];
  dataSource: MatTableDataSource<PoolList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getPools().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.dataSource = new MatTableDataSource<PoolList>(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (data.code === 'A401' || data.code === 'A302' || data.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, error => {
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

  editPool(id) {
    this.router.navigate([`/admin/pools/edit-pool/${id}`]);
  }

  clonePool(id) {
    this.router.navigate([`/admin/pools/clone-pool/${id}`]);
  }

  deletePool(pool) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${pool.name}</b>?`, 'Aviso!');
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loaderValue.updateIsloading(true);
        this.admin.deletePool(pool.rowid).subscribe(res => {
          this.loaderValue.updateIsloading(false);
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${pool.name} con exito!`);
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

  goToDetail(status, id) {
    this.router.navigate([`admin/pools/pools-results/${id}`]);

    // if (status !== 1) {
    //   this.router.navigate([`admin/pools/pools-results/${id}`]);
    // } else {
    //   this.handleAlertsProvider.presentSnackbarError('Esta Quiniela esta en Proceso...');
    // }
  }

  generateUrl(row) {
    console.log(row);
    this.loaderValue.updateIsloading(true);
    this.admin.getGeneratedLinkByPool(row.rowid).subscribe(res => {
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentGeneratedUrlDialog(res.link);
      }
      this.loaderValue.updateIsloading(false);
    });
    // this.handleAlertsProvider.presentGeneratedUrlDialog('http://localhost:4200/admin/pools/list-of-pools');
  }
}
