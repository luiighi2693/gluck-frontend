import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-battle-home-step',
  templateUrl: './battle-home-step.component.html',
  styleUrls: ['./battle-home-step.component.css']
})
export class BattleHomeStepComponent implements OnInit {
  @Input() match: any;
  @Output() rivalToShow: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(rival) {
    this.rivalToShow.emit(rival);
  }
}
