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
  isAdmin: boolean;
  option = false;
  loaderValue = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isExpanded = true;
    const isAdmin = sessionStorage.getItem('isAdmin');
    this.isAdmin = !!isAdmin;
  }

  toggleSidenav($event) {
    this.isExpanded = $event;
    this.poolsOptions = false;
  }

  togglePoolsOptions() {
    this.poolsOptions = !this.poolsOptions;
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
