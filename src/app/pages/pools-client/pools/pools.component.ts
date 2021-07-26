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
    },
    {
      name: 'Beisbol (MLB)',
      value: 'baseball',
      img: '../../../../assets/beisbol-gluck.png',
    },
    {
      name: 'Baloncesto (NBA)',
      value: 'basketball',
      img: '../../../../assets/baloncesto-gluck.png',
    },
    {
      name: 'Formula 1',
      value: 'formula-1',
      img: '../../../../assets/formula-1-gluck.png',
    },
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToCategory(path) {
    this.router.navigate([`/home/pools/pool-category/${path}`]);
  }
}
