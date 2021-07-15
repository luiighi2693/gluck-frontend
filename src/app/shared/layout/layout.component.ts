import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  isExpanded: boolean;
  poolsOptions = false;
  clientOptions = false;
  sportOptions = false;
  teamOptions = false;
  emailOptions = false;
  isAdmin: boolean;
  name: string;
  option = false;
  loaderValue = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isExpanded = true;
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    this.name = sessionStorage.getItem('username');
  }

  toggleSidenav($event) {
    this.isExpanded = $event;
    this.poolsOptions = false;
    this.clientOptions = false;
    this.emailOptions = false;
    this.sportOptions = false;
    this.teamOptions  = false;
  }

  togglePoolsOptions() {
    this.poolsOptions = !this.poolsOptions;
  }
  toggleEmailOptions() {
    this.emailOptions = !this.emailOptions;
  }

  toggleClientsOptions() {
    this.clientOptions = !this.clientOptions;
  }

  toggleSportsOptions() {
    this.sportOptions = !this.sportOptions;
  }

  toggleTeamsOptions() {
    this.teamOptions = !this.teamOptions;
  }

  showLoader($event: boolean) {
    this.loaderValue = $event;
  }
}
