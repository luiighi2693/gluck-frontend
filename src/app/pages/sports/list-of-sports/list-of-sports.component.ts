import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

export interface SportData {
  rowid: string;
  name: string;
  status: number;
  date_Create: string;
}

const sports: SportData[] = [];


@Component({
  selector: 'app-list-of-sports',
  templateUrl: './list-of-sports.component.html',
  styleUrls: ['./list-of-sports.component.css']
})
export class ListOfSportsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'name', 'status', 'date_Create', 'opts'];
  dataSource: MatTableDataSource<SportData>;
  showLoader = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showLoader = true;
    this.admin.getSports().subscribe(data => {
      console.log(data);
      this.showLoader = false;
      this.dataSource = new MatTableDataSource<SportData>(data.data);
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

  editSport(id) {
    this.router.navigate([`/admin/sports/edit-sport/${id}`]);
  }

  deleteSport(sport) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${sport.name}</b>?`, 'Aviso!');
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el user ${sport.name} con exito!`);
      }
    }, error => {
      console.error(error);
    });
  }

}
