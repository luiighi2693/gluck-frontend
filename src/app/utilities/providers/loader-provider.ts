import { Injectable, } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderProvider {
  private isLoadingValue = new Subject();

  constructor() { }

  getIsLoadingValue() {
    return this.isLoadingValue;
  }

  updateIsloading(value: boolean) {
    this.isLoadingValue.next(value);
  }

}
