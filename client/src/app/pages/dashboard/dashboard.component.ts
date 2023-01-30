import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account';
import { ColorScheme } from 'src/app/core/models/color-scheme';
import { NetWorthService } from 'src/app/core/services/net-worth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  colorScheme: typeof ColorScheme;
  account: typeof Account;
  constructor(private netWorthService: NetWorthService) {
    this.colorScheme = ColorScheme;
    this.account = Account;
  }

  ngOnInit(): void {
    let netWorth = this.netWorthService.getNetWorth();
    console.log(netWorth);
  }
}
