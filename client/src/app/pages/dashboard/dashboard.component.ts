import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { GradientColorScheme } from 'src/app/core/models/color-scheme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  colorScheme: typeof GradientColorScheme;
  account: typeof Account;
  constructor() {
    this.colorScheme = GradientColorScheme;
    this.account = Account;
  }

  ngOnInit(): void {}
}
