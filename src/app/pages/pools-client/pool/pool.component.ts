import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';


export interface PeriodicElement {
  poolName: string;
  id: string;
  sport: string;
  status: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', poolName: 'Hydrogen', sport: 'futbol', status: 1, date: '12-05-2021'},
  {id: '2', poolName: 'Helium', sport: 'futbol', status: 0, date: '12-05-2021'},
  {id: '3', poolName: 'Lithium', sport: 'futbol', status: 0, date: '12-05-2021'},
  {id: '4', poolName: 'Beryllium', sport: 'futbol', status: 0, date: '12-05-2021'},
  {id: '5', poolName: 'Boron', sport: 'futbol', status: 1, date: '12-05-2021'},
  {id: '6', poolName: 'Carbon', sport: 'futbol', status: 1, date: '12-05-2021'},
  {id: '7', poolName: 'Nitrogen', sport: 'futbol', status: 1, date: '12-05-2021'},
  {id: '8', poolName: 'Oxygen', sport: 'futbol', status: 1, date: '12-05-2021'},
  {id: '9', poolName: 'Fluorine', sport: 'futbol', status: 0, date: '12-05-2021'},
  {id: '10', poolName: 'Neon', sport: 'futbol', status: 1, date: '12-05-2021'},
];

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  displayedColumns: string[] = ['id', 'poolName', 'sport', 'status', 'date', 'participants', 'remainingTime', 'opts'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  showLoader = false;
  user: string;

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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  registerToPool(data) {
    this.handleAlertsProvider.registerPoolDialog(
      data.id,
      data.poolName,
      this.user,
      '50$',
      'chocolate',
      50,
      '../../../../../assets/example-user.png',
    );
  }
}