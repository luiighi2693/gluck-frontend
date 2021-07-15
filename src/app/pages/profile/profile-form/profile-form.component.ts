import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {AdminService} from '../../../services/admin.service';
import {HandleAlertsProvider} from '../../../utilities/providers/handle-alerts-provider';
import {Router} from '@angular/router';
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
  userData = null;
  imageData = null;
  isLoaded = false;
  id: string;

  @ViewChild('inputFiles', { static: true }) inputFiles: ElementRef;

  constructor(private admin: AdminService, private handleAlertsProvider: HandleAlertsProvider, private router: Router) {
    this.admin.initToken();
    // this.filteredSports = this.sportsCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.allSports.slice()));
  }

  private createForm() {
    this.updateProfileForm = new FormGroup({
      rowid: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      fk_sport: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required),
      ranking: new FormControl(null, Validators.required),
      date_Access: new FormControl(null, Validators.required),
      date_Create: new FormControl(null, Validators.required),
      contador: new FormControl(null, Validators.required),
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

  }
  ngOnInit(): void {
    this.id =  sessionStorage.getItem('id');
    this.createForm();
    this.isLoaded = true;
    this.admin.getUser(this.id).subscribe(response => {
      this.isLoaded = false;
      if (response.code === 'D200') {
        this.userData = response.data;
        this.updateProfileForm.setValue(this.userData);

        if (this.userData.img !== null) {
          this.isLoaded = true;
          this.admin.getFile(this.userData.img).subscribe(responseImg => {
            this.isLoaded = false;
            this.imageData = responseImg;
          }, err => {
            this.handleAlertsProvider.presentGenericAlert(err);
          });
        }
      }  else if (response.code === 'A401' || response.code === 'A302' || response.code === 'A403') {
        this.handleAlertsProvider.presentGenericAlert('Por favor inicie sesion de nuevo...', 'Su Sesion Expiro!');
        this.router.navigate(['/auth']);
      }
    }, err => {
      this.handleAlertsProvider.presentGenericAlert(err);
    });
  }

  submitForm() {
    alert(JSON.stringify(this.updateProfileForm.value));
    console.warn(this.updateProfileForm.value);
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // const imageCompressed = await this.compressImage(reader.result, 1200, 600);
      this.imageData = reader.result;
      // this.imageType = event.target.files[0].type;
    };
  }

  openUploadFiles() {
    const el: HTMLElement = this.inputFiles.nativeElement as HTMLElement;
    el.click();
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
