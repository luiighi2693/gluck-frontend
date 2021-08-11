import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';


@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  showLoader = false;
  users = [];
  emailForm: FormGroup;

  constructor(
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.setUsersData();
    this.createForm();
  }

  private createForm() {
    this.emailForm = this.fb.group({
      category: ['', Validators.required],
      manualSelection: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    console.log(this.emailForm.value);
    this.showLoader = true;
    const emailForm = this.emailForm.value;
    console.warn(emailForm);
    this.admin.sendEmail(emailForm.category, emailForm.subject, emailForm.manualSelection, emailForm.message).subscribe(res => {
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

  setUsersData() {
    this.showLoader = true;
    this.admin.getUsers().subscribe(res => {
      this.showLoader = false;
      if (res.code === 'D200') {
        console.log('res: ', res);
        this.users = res.data;
      } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }


}
