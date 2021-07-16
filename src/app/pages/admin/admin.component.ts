import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  emailForm: FormGroup;

  constructor() {
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
  }

}
