import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { ColorScheme } from 'src/app/core/models/color-scheme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  colorScheme: typeof ColorScheme;
  account: typeof Account;
  constructor() {
    this.colorScheme = ColorScheme;
    this.account = Account;
  }

  ngOnInit(): void {}
}
