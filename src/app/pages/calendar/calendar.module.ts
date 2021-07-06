import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { CalendarComponent } from './calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { MaterialModule } from '../../material/material.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    RouterModule.forChild([{path: '', component: CalendarComponent}]),
  ]
})
export class CalendarModule { }
