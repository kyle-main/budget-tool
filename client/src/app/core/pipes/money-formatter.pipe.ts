import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormatter',
})
export class MoneyFormatterPipe implements PipeTransform {
  transform(number: number): string {
    let prefix = number < 0 ? '-$' : '$';
    let formattedString = prefix + Math.abs(number).toLocaleString();
    return formattedString;
  }
}
