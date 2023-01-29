import { Component, OnInit, Input } from '@angular/core';
import { ColorScheme } from 'src/app/core/models/color-scheme';
import { Account } from 'src/app/core/models/account';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
})
export class AccountSummaryComponent implements OnInit {
  @Input() accountType: Account | null;
  @Input() amount: number;
  @Input() delta: number;
  @Input() colorScheme: ColorScheme;

  constructor() {
    this.accountType = null;
    this.amount = 0.0;
    this.delta = 0.0;
    this.colorScheme = ColorScheme.LIGHT;
  }

  ngOnInit(): void {}

  public deltaIsPositive(): boolean {
    return this.delta > 0;
  }

  public deltaIsNegative(): boolean {
    return this.delta < 0;
  }

  public deltaIsZero(): boolean {
    return this.delta == 0;
  }

  public deltaABS(): number {
    return Math.abs(this.delta);
  }

  public greenBlue(): boolean {
    // return whether the color scheme is green to blue gradient
    return this.colorScheme == ColorScheme.GREEN_BLUE;
  }

  public purpleRed(): boolean {
    // return whether the color scheme is purple to red gradient
    return this.colorScheme == ColorScheme.PURPLE_RED;
  }

  public yellowOrange(): boolean {
    // return whether the color scheme is yellow to orange gradient
    return this.colorScheme == ColorScheme.YELLOW_ORANGE;
  }

  public gradient(): boolean {
    return !(
      this.colorScheme == ColorScheme.DARK ||
      this.colorScheme == ColorScheme.LIGHT
    );
  }

  public dark(): boolean {
    return this.colorScheme == ColorScheme.DARK;
  }

  public isSavingsAccount(): boolean {
    return (
      this.accountType == Account.HSA || this.accountType == Account.SAVINGS
    );
  }

  public isCreditCard(): boolean {
    return this.accountType == Account.CREDIT_CARD;
  }

  public isInvestmentAccount(): boolean {
    return (
      this.accountType == Account['K401'] ||
      this.accountType == Account['INVESTMENT'] ||
      this.accountType == Account['IRA']
    );
  }
}
