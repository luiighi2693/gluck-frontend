import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-to-pool',
  templateUrl: './register-to-pool.component.html',
  styleUrls: ['./register-to-pool.component.css']
})
export class RegisterToPoolComponent implements OnInit {
  pools = [
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
    {
      match: 'PARTIDO 1',
      team1: 'nombre de equipo # 1',
      team2: 'nombre de equipo # 2',
      date: 'Fecha: 9/02/2022',
      time: 'Hora: 2:00 P.M (EST)'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
