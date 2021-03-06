import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {environment} from '../../../../environments/environment';

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
  userImage = '';
  imagePath;

  constructor(
    private router: Router,
    private auth: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
  ) {
    this.imagePath = environment.basePath;
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 992;
    this.userImage = sessionStorage.getItem('img');
    this.token = sessionStorage.getItem('token');
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
    this.name = sessionStorage.getItem('username');
    this.dateCreate = sessionStorage.getItem('dateCreate').slice(0, 10);
  }

  toggle() {
    if (this.isOpen) {
      this.toggleValue.emit(false);
    } else {
      this.toggleValue.emit(true);
    }
    this.isOpen = !this.isOpen;
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
