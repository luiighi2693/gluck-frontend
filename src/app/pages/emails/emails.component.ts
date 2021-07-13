import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  emailForm: FormGroup;

  constructor(
    private admin: AdminService,
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.emailForm = new FormGroup({
      category: new FormControl('', Validators.required),
      groupToSend: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  private updateForm() {

  }

  sendEmail() {
    console.log(this.emailForm.value);
    // this.showLoader = true;
    // const emailForm = this.emailForm.value;
    // console.warn(emailForm);
    // this.admin.sendEmail(emailForm.category, emailForm.groupToSend, emailForm.subject, emailForm.message).subscribe(res => {
    //   this.showLoader = false;
    //   if (res.code === 'D200') {
    //     this.handleAlertsProvider.presentSnackbarSuccess('Se ha enviado el mensaje con exito!');
    //   } else if (res.code === 'D401' || res.code === 'D302' || res.code === 'D403') {
    //     this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
    //     this.router.navigate(['/auth']);
    //   }
    // }, err => {
    //   this.handleAlertsProvider.presentGenericAlert(err);
    // });
  }


}
