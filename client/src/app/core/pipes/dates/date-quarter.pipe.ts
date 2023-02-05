import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateQuarter',
})
export class DateQuarterPipe implements PipeTransform {
  transform(date: Date): string {
    const month = date.getMonth();
    const year = date.getFullYear() + 1;
    let quarter = '';
    if (month <= 2) {
      quarter = 'Q1';
    } else if (month <= 5) {
      quarter = 'Q2';
    } else if (month <= 8) {
      quarter = 'Q3';
    } else {
      quarter = 'Q4';
    }
    return `${year.toString().slice(-2)}' ${quarter}`;
  }
}
