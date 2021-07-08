import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {

  // selectable = true;
  // removable = true;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // sportsCtrl = new FormControl();
  // filteredSports: Observable<string[]>;
  // sports: string[] = ['Futbol'];
  // allSports: string[] = ['Futbol', 'Beisbol', 'Baloncesto', 'Formula 1'];

  // @ViewChild('sportsInput') sportsInput: ElementRef<HTMLInputElement>;

  updateProfileForm: FormGroup;
  hide = true;

  constructor() {
    this.createForm();
    // this.filteredSports = this.sportsCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allSports.slice()));
  }

  private createForm() {
    this.updateProfileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    });

  }
  ngOnInit(): void {
  }

  submitForm() {
    alert(JSON.stringify(this.updateProfileForm.value));
    console.warn(this.updateProfileForm.value);
  }

  // addSport(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //
  //   // Add our fruit
  //   if (value) {
  //     this.sports.push(value);
  //   }
  //
  //   // Clear the input value
  //   event.chipInput!.clear();
  //
  //   this.sportsCtrl.setValue(null);
  // }

  // removeSport(sport: string): void {
  //   const index = this.sports.indexOf(sport);
  //
  //   if (index >= 0) {
  //     this.sports.splice(index, 1);
  //   }
  // }
  //
  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.sports.push(event.option.viewValue);
  //   this.sportsInput.nativeElement.value = '';
  //   this.sportsCtrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.allSports.filter(fruit => fruit.toLowerCase().includes(filterValue));
  // }
}
