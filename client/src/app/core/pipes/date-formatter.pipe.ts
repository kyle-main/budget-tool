import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  transform(day: number, month: number, year: number): string {
    let date = new Date(year, month, day);
    let longMonth = date.toLocaleString('en-us', { month: 'long' });
    let stringDate = `${longMonth} ${day}, ${year}`;
    return stringDate;
  }
}
