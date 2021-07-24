import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-of-pools',
  templateUrl: './list-of-pools.component.html',
  styleUrls: ['./list-of-pools.component.css']
})
export class ListOfPoolsComponent implements OnInit {

  pools = [
    {
      name: 'name 001',
      id: 'copa-america',
      color: 'blue',
      matches: '10',
      category: 'futbol',
      img: '../../../../assets/copa-america.png',
    },
    {
      name: 'name 002',
      id: 'la-liga',
      color: 'green',
      matches: '3',
      category: 'beisbol',
      img: '../../../../assets/la-liga.png',
    },
    {
      name: 'name 003',
      id: 'premiere-league',
      color: '',
      matches: '5',
      category: 'baloncesto',
      img: '../../../../assets/premier-league.png',
    },
    {
      name: 'name 004',
      id: 'bounders-liga',
      color: 'red',
      matches: '7',
      category: 'futbol',
      img: '../../../../assets/bundesliga.png',
    },
    {
      name: 'name 005',
      id: 'serie-a',
      color: 'black',
      matches: '5',
      category: 'futbol',
      img: '../../../../assets/serie-a.png',
    },
    {
      name: 'name 006',
      id: 'liga-1',
      color: 'brown',
      matches: '4',
      category: 'beisbol',
      img: '../../../../assets/ligue-1.png',
    },
    {
      name: 'name 007',
      id: 'champions-league',
      color: 'pink',
      matches: '6',
      category: 'baloncesto',
      img: '../../../../assets/uefa-champions-league.png',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
