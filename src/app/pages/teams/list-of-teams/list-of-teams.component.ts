import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {AuthService} from '../../../services/auth.service';

export interface TeamData {
  rowid: string;
  name: string;
  status: number;
  date_Create: string;
}

const sports: TeamData[] = [];


@Component({
  selector: 'app-list-of-teams',
  templateUrl: './list-of-teams.component.html',
  styleUrls: ['./list-of-teams.component.css']
})
export class ListOfTeamsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rowid', 'shield', 'name', 'sport', 'status', 'date_Create', 'opts'];
  dataSource: MatTableDataSource<TeamData>;
  showLoader = false;
  token: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private auth: AuthService,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.showLoader = true;
    this.admin.getTeams().subscribe(data => {
      if (data.code === 'D200') {
        this.showLoader = false;
        this.dataSource = new MatTableDataSource<TeamData>(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  editTeam(id) {
    this.router.navigate([`/admin/teams/edit-team/${id}`]);
  }

  deleteTeam(team) {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk(`Esta seguro de eliminar el usuario <b>${team.name}</b>?`, 'Aviso!');
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.showLoader = true;
        this.admin.deleteTeam(team.rowid).subscribe(res => {
          this.showLoader = false;
          if (res.code === 'D200') {
            this.handleAlertsProvider.presentSnackbarSuccess(`Se ha eliminado el Team ${team.name} con exito!`);
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
