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
  option = false;
  loaderValue = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isExpanded = true;
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
  }

  toggleSidenav($event) {
    this.isExpanded = $event;
    this.poolsOptions = false;
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

  toggleOptions(option) {
    this.option = !this.option;
  }

  showLoader($event: boolean) {
    this.loaderValue = $event;
  }
}
