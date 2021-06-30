import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  isExpanded: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isExpanded = true;
  }

  toggleValue($event) {
    this.isExpanded = $event;
  }
}
