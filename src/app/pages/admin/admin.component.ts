import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  emailForm: FormGroup;
  showLoader = false;

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.emailForm = new FormGroup({
      category: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  sendEmail() {
    console.log(this.emailForm.value);
    this.showLoader = true;
    const emailForm = this.emailForm.value;
    console.warn(emailForm);
    this.admin.sendEmail(emailForm.category, emailForm.subject, emailForm.message).subscribe(res => {
      this.showLoader = false;
      if (res.code === 'D200') {
        this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el mensaje con exito!');
        this.emailForm.reset();
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

}
