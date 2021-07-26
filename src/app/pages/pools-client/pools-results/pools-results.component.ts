import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pools-results',
  templateUrl: './pools-results.component.html',
  styleUrls: ['./pools-results.component.css']
})
export class PoolsResultsComponent implements OnInit {
  exampleData = [
    {
      id: 5,
      user: 'Jose Grela',
      score: '10',
      goals: '50',
      img: '../../../../assets/example-user.png',
    },
    {
      id: 5,
      user: 'Jose Grela',
      score: '10',
      goals: '50',
      img: '../../../../assets/example-user.png',
    },
    {
      id: 5,
      user: 'Jose Grela',
      score: '10',
      goals: '50',
      img: '../../../../assets/example-user.png',
    },
    {
      id: 5,
      user: 'Jose Grela',
      score: '10',
      goals: '50',
      img: '../../../../assets/example-user.png',
    },
    {
      id: 5,
      user: 'Jose Grela',
      score: '10',
      goals: '50',
      img: '../../../../assets/example-user.png',
    },
  ];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    console.log(this.exampleData);
  }

  goToRoute(id) {
    this.router.navigate([`/home/pools/pool-result/${id}`]);
  }
}
