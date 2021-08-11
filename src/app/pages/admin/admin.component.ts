import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HandleAlertsProvider} from '../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {LoaderProvider} from '../../utilities/providers/loader-provider';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  emailForm: FormGroup;
  users = [];
  exampleData = [
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
    {
      name: 'exampleName',
      sport: 'exampleSpport',
      matches: '6 (partidos)',
      timeRemaining: '13 Dias'
    },
  ];

  constructor(
    private handleAlertsProvider: HandleAlertsProvider,
    private router: Router,
    private admin: AdminService,
    private fb: FormBuilder,
    private loaderValue: LoaderProvider,
  ) {
    this.admin.initToken();
  }

  ngOnInit(): void {
    this.setUsersData();
    this.createForm();
  }

  createForm() {
    this.emailForm = this.fb.group({
      category: ['', Validators.required],
      subject: ['', Validators.required],
      manualSelection: [''],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    // console.log(this.emailForm.value);
    this.loaderValue.updateIsloading(true);
    const emailForm = this.emailForm.value;
    // console.warn(emailForm);
    this.admin.sendEmail(emailForm.category, emailForm.subject, emailForm.manualSelection, emailForm.message).subscribe(res => {
      this.loaderValue.updateIsloading(false);
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
    this.loaderValue.updateIsloading(true);
    this.admin.getUsers().subscribe(res => {
      this.loaderValue.updateIsloading(false);
      if (res.code === 'D200') {
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
