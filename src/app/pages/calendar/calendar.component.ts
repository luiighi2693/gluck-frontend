import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {LoaderProvider} from '../../utilities/providers/loader-provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions;

  // showLoader = false;


  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private loaderValue: LoaderProvider
  ) {
  }

  ngOnInit(): void {
    this.loaderValue.updateIsloading(true);
    this.admin.getEventsForUser(sessionStorage.getItem('id')).subscribe(res => {
      this.loaderValue.updateIsloading(false);
      // this.showLoader = false;
      if (res.code === 'D200') {
        const events = [];
        res.data.forEach(e => {
          const date = e.date_Sport + 'T' + e.hour + '.000Z';
          events.push({
            title: e.name + ' ' + e.label,
            date,
            id: e.rowid,
            allDay: false,
            editable: false,
            backgroundColor: e.color,
            // eventBorderColor: '#e4a101ff',
            // eventTextColor: '#fff',
            description: e.name + ' ' + e.label
          });
        });

        this.calendarOptions = {
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev next today',
            center: 'title',
            right: 'dayGridMonth dayGridWeek dayGridDay'
          },
          dayMaxEvents: true,
          contentHeight: '950px',
          events,
          eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          },

          // tslint:disable-next-line:only-arrow-functions
          eventClick: ((info) => {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            console.log(info.event.id);
            if (sessionStorage.getItem('isAdmin') === 'true') {
              this.router.navigate([`/admin/pools/edit-pool/${info.event.id}`]);
            } else {
              this.router.navigate([`/home/pools/list-of-pools`]);

            }
          }),

          // tslint:disable-next-line:only-arrow-functions
          eventDidMount: ((info) => {
            // var tooltip = new Tooltip(info.el, {
            //   title: info.event.extendedProps.description,
            //   placement: 'top',
            //   trigger: 'hover',
            //   container: 'body'
            // });
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
