import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = true;
  @Output() toggleValue: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    if (this.isOpen) {
      this.toggleValue.emit(false);
    } else {
      this.toggleValue.emit(true);
    }
    this.isOpen = !this.isOpen;
  }
}
