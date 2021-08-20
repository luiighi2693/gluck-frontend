import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  @Output() toggleValue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  userOptions = false;
  token: string;
  isAdmin: boolean;
  name: string;
  @Input() coins;
  @Input() money;
  @Input() isExpanded;
  dateCreate: any;
  isMobile: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 992;
    this.token = sessionStorage.getItem('token');
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    this.name = sessionStorage.getItem('username');
    this.dateCreate = sessionStorage.getItem('dateCreate').slice(0, 10);
  }

  toggle() {
    if (this.isOpen) {
      console.log('i am closed!');
      this.toggleValue.emit(false);
    } else {
      console.log('i am opened!');
      this.toggleValue.emit(true);
    }
    this.isOpen = !this.isOpen;
    console.log(this.isExpanded);
  }

  editUser() {
    this.userOptions = false;
    if (this.isAdmin) {
      this.router.navigate(['/admin/edit-profile']);
    } else {
      this.router.navigate(['/home/profile']);
    }
  }

  logout() {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk('Quiere cerrar su sesion?', 'Aviso!');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.auth.logout(this.token).subscribe(response => {
          if (response.code === 'A200') {
            this.router.navigate(['/auth']);
          }
        }, err => {
          this.handleAlertsProvider.presentGenericAlert(err);
        });
      }
    }, error => {
      this.handleAlertsProvider.presentGenericAlert(error);
    });
  }
}
