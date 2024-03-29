import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormatter',
})
export class MoneyFormatterPipe implements PipeTransform {
  transform(number: number): string {
    let prefix = number < 0 ? '-$' : '$';
    let absNumber = Math.abs(number);
    return prefix + absNumber.toLocaleString();
  }
}
