import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';


export interface Client {
  rowid: string;
  image: string;
  amount: string;
  coins: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: number;
  date_Access: string;
}

@Component({
  selector: 'app-list-of-clients',
  templateUrl: './list-of-clients.component.html',
  styleUrls: ['./list-of-clients.component.css']
})
export class ListOfClientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'username', 'amount', 'coins', 'email', 'phone', 'status', 'date_Access', 'opts'];
  dataSource: MatTableDataSource<Client>;
  imagePath;
  amountToRecharge = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private dialog: MatDialog,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getUsers().subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.dataSource = new MatTableDataSource<Client>(data.data);
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

  editUser(id) {
    this.router.navigate([`/admin/clients/edit-client/${id}`]);
  }

  deleteUser(user) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${user.name}</b>?`, 'Aviso!');
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loaderValue.updateIsloading(true);
        this.admin.deleteUser(user.rowid).subscribe(res => {
          this.loaderValue.updateIsloading(false);
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

  recharge(type: string, id) {
    const dialogRef = this.handleAlertsProvider.presentInputDialog(
      `${type === 'glucks' ? 'Recargar Glucks' : 'Recargar Dinero'}`,
      this.amountToRecharge);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== undefined && result !== null) {
        this.loaderValue.updateIsloading(true);
        this.admin.recharge(id, type, result).subscribe(res => {
          this.loaderValue.updateIsloading(false);
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess(
              `Se ha recargado con exito la cantidad de ${result} ${type === 'amount' ? 'Dolares' : 'Coins'}`);
            this.setData();
          } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
            this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
            this.router.navigate(['/auth']);
          }
        }, err => {
          this.handleAlertsProvider.presentGenericAlert(err);
        });
      } else {
        this.handleAlertsProvider.presentGenericAlert('Por favor ingresa un monto', 'Aviso!');
      }
    });
  }
}

