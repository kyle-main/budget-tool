import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateYear',
})
export class DateYearPipe implements PipeTransform {
  transform(date: Date): string {
    const year = date.getFullYear() + 1;
    return year.toString();
  }
}
