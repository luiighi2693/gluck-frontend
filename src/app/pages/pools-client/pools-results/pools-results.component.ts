import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-pools-results',
  templateUrl: './pools-results.component.html',
  styleUrls: ['./pools-results.component.css']
})
export class PoolsResultsComponent implements OnInit {

  data = [
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
    {
      id: 15,
      user: 'Alex Rodriguez',
      image: '../../../../assets/example-user.png',
      goals: '5',
      result: '10',
    },
  ];
  showLoader = false;
  // currentPool: any;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.getCurrentPool();
  }

  // getCurrentPool() {
  //   this.route.params.subscribe(res => {
  //     this.currentPool = res.id;
  //   });
  // }

  goToRoute(id) {
    this.router.navigate([`/home/pools/my-results/${id}`]);
  }

  goToMyResults(id) {
    this.router.navigate([`/home/pools/my-results/${id}`]);
  }
}
