import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pool-category',
  templateUrl: './pool-category.component.html',
  styleUrls: ['./pool-category.component.css']
})
export class PoolCategoryComponent implements OnInit {

  pools = [
    {
      name: 'Copa America',
      id: 'copa-america',
      img: '../../../../assets/copa-america.png',
      disabled: false,
    },
    {
      name: 'Champions League',
      id: 'champions-league',
      img: '../../../../assets/uefa-champions-league.png',
      disabled: false,
    },
    {
      name: 'La Liga',
      id: 'la-liga',
      img: '../../../../assets/la-liga.png',
      disabled: false,
    },
    {
      name: 'Premier League',
      id: 'premiere-league',
      img: '../../../../assets/premier-league.png',
      disabled: false,
    },
    {
      name: 'Bundes Liga',
      id: 'bounders-liga',
      img: '../../../../assets/bundesliga.png',
      disabled: false,
    },
    {
      name: 'Serie A',
      id: 'serie-a',
      img: '../../../../assets/serie-a.png',
      disabled: false,
    },
    {
      name: 'Liga 1',
      id: 'liga-1',
      img: '../../../../assets/ligue-1.png',
      disabled: false,
    },

  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToPool(id, name) {
    sessionStorage.setItem('poolCategory', name);
    this.router.navigate([`/home/pools/pool/${id}`]);
  }
}

