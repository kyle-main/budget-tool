import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormatterSmall',
})
export class MoneyFormatterSmallPipe implements PipeTransform {
  transform(number: number): string {
    let prefix = number < 0 ? '-$' : '$';
    let absNumber = Math.abs(number);
    let unit = ' K';
    let roundNumber = absNumber.toString().slice(0, -3);
    if (absNumber >= 1000000) {
      unit = ' M';
      roundNumber = roundNumber.slice(0, -3);
    }
    return prefix + roundNumber + unit;
  }
}
