import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  Events: [
    {
      title: 'exmaple title 1',
      start: '2021-07-14',
    },
    {
      title: 'exmaple title 2',
      start: '2021-07-13',
    },
    {
      title: 'exmaple title 3',
      start: '2021-07-12',
    },
    {
      title: 'exmaple title 4',
      start: '2021-07-11',
    },
  ] ;
  calendarOptions: CalendarOptions;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'datGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
      console.log(this.Events);
    }, 2500);
  }

  onDateClick(res) {
    alert(`You clicked on date: ${res.dateStr}`);
  }

}
