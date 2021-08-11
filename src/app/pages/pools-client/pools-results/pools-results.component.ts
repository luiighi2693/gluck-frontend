import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';
import {MatTableDataSource} from "@angular/material/table";
import {UserData} from "../../pools/pools-results-detail/pools-results-detail.component";
import {environment} from "../../../../environments/environment";
import {LoaderProvider} from '../../../utilities/providers/loader-provider';

@Component({
  selector: 'app-pools-results',
  templateUrl: './pools-results.component.html',
  styleUrls: ['./pools-results.component.css']
})
export class PoolsResultsComponent implements OnInit, AfterViewInit {

  data = [];
  currentPool;
  imagePath;
  poolName;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute,
    private loaderValue: LoaderProvider,
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.poolName = sessionStorage.getItem('poolName');
    this.getParam();
  }

  getParam() {
    this.route.params.subscribe(params => {
      this.currentPool = params.id;
    });
  }

  ngAfterViewInit() {
    this.setData();
  }

  setData() {
    this.loaderValue.updateIsloading(true);
    this.admin.getResultsByPool(this.currentPool).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
        this.data = res.data;
      } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  goToMyResults() {
    this.router.navigate([`/home/pools/my-results/${this.currentPool}`]);
  }
}
