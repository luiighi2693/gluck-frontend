import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 19) {
      return value.substring(0, 20).concat('...');
    } else {
      return value;
    }
  }

}
