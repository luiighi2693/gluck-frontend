import {Component, OnInit} from '@angular/core';
import {LoaderProvider} from '../../utilities/providers/loader-provider';
import {Router} from '@angular/router';
import {EventBusService} from 'ng-simple-event-bus';

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
  isLoading: any;
  pageWidth: any;
  coins: any;
  money: any;

  constructor(
    private loaderValue: LoaderProvider,
    private router: Router,
    private event: EventBusService,
  ) {
  }

  ngOnInit(): void {
    this.event.on('getMoney', (payload: any) => {
      this.money = Number(this.money) + payload;
      sessionStorage.setItem('money', this.money);
    });
    this.event.on('getCoins', (payload: any) => {
      this.coins = Number(this.money) + payload;
      sessionStorage.setItem('coins', this.coins);
    });
    this.loaderValue.getIsLoadingValue().subscribe(res => {
      this.isLoading = res;
    });
    // this.isExpanded = false;
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    this.name = sessionStorage.getItem('username');
    this.coins = sessionStorage.getItem('coins');
    this.money = sessionStorage.getItem('money');
    this.pageWidth = window.innerWidth;
  }

  toggleSidenav($event) {
    this.isExpanded = $event;
    this.poolsOptions = false;
    this.clientOptions = false;
    this.emailOptions = false;
    this.sportOptions = false;
    this.teamOptions = false;
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

  catchValue(value: string) {
    alert(value);
  }

  backdropClick() {
    const toggleButton = document.getElementById('toogleButton');
    toggleButton.click();
  }
}
