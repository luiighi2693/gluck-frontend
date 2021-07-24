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
    },
    {
      name: 'La Liga',
      id: 'la-liga',
      img: '../../../../assets/la-liga.png',
    },
    {
      name: 'Premiere League',
      id: 'premiere-league',
      img: '../../../../assets/premier-league.png',
    },
    {
      name: 'Bounders Liga',
      id: 'bounders-liga',
      img: '../../../../assets/bundesliga.png',
    },
    {
      name: 'Serie A',
      id: 'serie-a',
      img: '../../../../assets/serie-a.png',
    },
    {
      name: 'Liga 1',
      id: 'liga-1',
      img: '../../../../assets/ligue-1.png',
    },
    {
      name: 'Champions League',
      id: 'champions-league',
      img: '../../../../assets/uefa-champions-league.png',
    },
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToPool(id) {
    this.router.navigate([`/home/pools/pool/${id}`]);
  }
}

