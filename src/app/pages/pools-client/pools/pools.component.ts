import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  pools = [
    {
      name: 'Futbol',
      value: 'football',
      img: '../../../../assets/futbol-gluck.png',
      disabled: false,
    },
    {
      name: 'Beisbol (MLB)',
      value: 'baseball',
      img: '../../../../assets/baseball.png',
      disabled: true,
    },
    {
      name: 'Baloncesto (NBA)',
      value: 'basketball',
      img: '../../../../assets/nba.png',
      disabled: true,
    },
    {
      name: 'Formula 1',
      value: 'formula-1',
      img: '../../../../assets/f1.png',
      disabled: true,
    },
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToCategory(path) {
    this.router.navigate([`/pools/pool-category/${path}`]);
  }
}
