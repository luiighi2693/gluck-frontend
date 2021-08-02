import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {finalize} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

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
  imagePath;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute,
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
    this.getCurrentPool = this.route.params.subscribe(params => {
      this.currentPool = params.pool;
    });
    this.getCurrentUser = this.route.params.subscribe(params => {
      this.currentUser = params.id;
    });
  }

  getData() {
    this.showLoader = true;
    console.log(this.showLoader);
    this.admin.getResultsByPoolAndUser(this.currentUser, this.currentPool).subscribe(data => {
      this.showLoader = false;
      console.log(this.showLoader);
      console.log(data);
      if (data.code === 'D200') {
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
}

