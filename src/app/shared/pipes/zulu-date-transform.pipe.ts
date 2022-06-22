import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zuluDateTransform'
})
export class ZuluDateTransformPipe implements PipeTransform {

  transform(value: string): string {
    const date = value.substring(0, value.indexOf('T'));
    const time = value.substring(value.indexOf('T') + 1, value.indexOf('.') );
    const textToReturn = `${date} - ${time}`;
    console.log(date);
    return textToReturn;
  }

}
