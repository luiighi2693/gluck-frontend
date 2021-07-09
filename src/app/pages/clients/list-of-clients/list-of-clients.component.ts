import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

export interface UserData {
  rowid: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: number;
  date_Access: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const users: UserData[] = [
  // {
  //   id: '1',
  //   username: 'admin',
  //   name: 'admin',
  //   email: 'admin@admin.com',
  //   phone: '123456789123456',
  //   status: 1,
  //   lastLogin: '08-10-2020',
  // },
  // {
  //   id: '2',
  //   username: 'client',
  //   name: 'client',
  //   email: 'client@client.com',
  //   phone: '12345678912',
  //   status: 0,
  //   lastLogin: '08-10-2020',
  // }
];

@Component({
  selector: 'app-list-of-clients',
  templateUrl: './list-of-clients.component.html',
  styleUrls: ['./list-of-clients.component.css']
})
export class ListOfClientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'username', 'name', 'email', 'phone', 'status', 'date_Access', 'opts'];
  dataSource: MatTableDataSource<UserData>;
  showLoader = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private user: AdminService,
  ) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showLoader = true;
    this.user.getUsers().subscribe(data => {
      this.showLoader = false;
      this.dataSource = new MatTableDataSource<UserData>(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.showLoader = false;
      console.error(error);
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
        this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${user.name} con exito!`);
      }
    }, error => {
      console.error(error);
    });
  }
}

