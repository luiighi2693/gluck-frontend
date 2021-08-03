import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {MatTableDataSource} from '@angular/material/table';
import {UserData} from '../pools/pools-results-detail/pools-results-detail.component';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events = [
    {
      title: 'exmaple title 0',
      date: new Date(),
    },
    {
      title: 'exmaple title 1',
      date: '2021-08-14',
    },
    {
      title: 'exmaple title 2',
      date: '2021-08-13',
    },
    {
      title: 'exmaple title 3',
      date: '2021-08-12',
    },
    {
      title: 'exmaple title 4',
      date: '2021-08-11',
    },
  ] ;
  calendarOptions: CalendarOptions;
  showLoader = false;


  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) { }

  ngOnInit(): void {
    this.admin.getEventsForUser(sessionStorage.getItem('id')).subscribe(res => {
      this.showLoader = false;
      if (res.code === 'D200') {
        const events = [];
        res.data.forEach(e => {
          const date = e.date_Sport + 'T' + e.hour + '.000Z';
          events.push({
            title: e.label,
            date,
            id: e.rowid
          });
        });

        this.calendarOptions = {
          initialView: 'datGridMonth',
          // eventClick: this.onDateClick.bind(this),
          events,
          // tslint:disable-next-line:only-arrow-functions
          eventClick: ((info) => {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            console.log(info.event.id);
            if (sessionStorage.getItem('isAdmin') === 'true') {
              this.router.navigate([`/admin/pools/edit-pool/${info.event.id}`]);
            } else {
              this.router.navigate([`/home/pools/list-of-pools`]);

            }
          })
        };
      } else if (res.code === 'A401' || res.code === 'A302' || res.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  onDateClick(res) {
    alert(`You clicked on date: ${JSON.stringify(res)}`);
  }

}
