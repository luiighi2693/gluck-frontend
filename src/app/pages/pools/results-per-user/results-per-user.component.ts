import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {environment} from '../../../../environments/environment';
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

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
  currentPool: any;
  currentUser: any;
  tableData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
    this.imagePath = environment.basePath;
  }

  ngOnInit() {
    this.getParams();
    this.getData();
  }

  ngAfterViewInit() {
    this.setData();
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.currentPool = params.pool;
    });
    this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });
  }

  getData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getResultsByPoolAndUser(this.currentUser, this.currentPool).subscribe(data => {
      this.loaderValue.updateIsloading(false);
      if (data.code === 'D200') {
        this.tableData = data;
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

  setData() {
    this.dataSource = new MatTableDataSource<UserData>(this.tableData.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

