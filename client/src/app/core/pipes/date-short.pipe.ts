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
    console.log(date);
    let shortMonth = monthNames[date.getMonth()].slice(0, 3);
    console.log(date.getFullYear());
    let shortYear = date.getFullYear().toString().slice(2, 4) + "'";
    return shortMonth + ' ' + shortYear;
  }
}
