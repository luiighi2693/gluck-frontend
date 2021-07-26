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

const users: UserData[] = [];


@Component({
  selector: 'app-pools-results-detail',
  templateUrl: './pools-results-detail.component.html',
  styleUrls: ['./pools-results-detail.component.css']
})
export class PoolsResultsDetailComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['rowid', 'name', 'email', 'phone', 'score', 'goalsScored', 'date_Access'];
  dataSource: MatTableDataSource<UserData>;
  showLoader = false;
  currentPool: any;
  getCurrentPool: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    // this.currentPool = this.route.params._value.id

    this.getCurrentPool = this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.showLoader = true;
    this.admin.getResultsByPool(this.currentPool).subscribe(res => {
      this.showLoader = false;
      if (res.code === 'D200') {
        console.log('res', res);
        this.dataSource = new MatTableDataSource<UserData>(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetail(userID: any) {
    this.router.navigate([`/admin/pools/results-per-user/${userID}/${this.currentPool}`]);
  }
}
