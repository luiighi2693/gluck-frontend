import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.css']
})
export class AddPoolComponent implements OnInit {
  config: FormGroup;
  // users: FormGroup;
  // matches: FormGroup;
  // results: FormGroup;
  showLoader = false;

  constructor() { }

  ngOnInit(): void {
    this.createForms();
  }

  private createForms() {
    this.config = new FormGroup({
      name: new FormControl('', Validators.required),
      sport: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      matches: new FormControl('', Validators.required),
      usersLimit: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      penalty: new FormControl('', Validators.required),
      groups: new FormControl('', Validators.required),
      teamsPerMatch: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      league: new FormControl('', Validators.required)
    });
  }

}
