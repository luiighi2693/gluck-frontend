import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  isExpanded: boolean;
  footballPoolsOptions: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isExpanded = true;
    this.footballPoolsOptions = false;
  }

  toggleValue($event) {
    this.isExpanded = $event;
  }

  showFootballPoolsOptions() {
    this.footballPoolsOptions = !this.footballPoolsOptions;
  }
}
