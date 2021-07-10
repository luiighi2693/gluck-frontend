import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HandleAlertsProvider } from '../../../utilities/providers/handle-alerts-provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = true;
  @Output() toggleValue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  userOptions = false;
  token: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private handleAlertsProvider: HandleAlertsProvider,
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
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

  }

  logout() {
    const dialogRef = this.handleAlertsProvider.presentErrorDialogOk('Quiere cerrar su sesion?', 'Aviso!');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.showLoader.emit(true);
        this.auth.logout(this.token).subscribe(response => {
          this.showLoader.emit(false);
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
