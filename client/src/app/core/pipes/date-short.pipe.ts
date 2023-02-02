import { Pipe, PipeTransform } from '@angular/core';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
@Pipe({
  name: 'dateShort',
})
export class DateShortPipe implements PipeTransform {
  transform(date: Date): string {
    let month = date.getMonth();
    let shortMonth = monthNames[month].slice(0, 3);
    let shortYear = date.getFullYear().toString().slice(2, 4) + "'";
    return shortMonth + ' ' + shortYear;
  }
}
