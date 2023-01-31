import { Component, OnInit } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';
import { DropdownValue } from '../dropdown/dropdown.component';

enum Period {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

@Component({
  selector: 'app-accounts-bar-graph',
  templateUrl: './accounts-bar-graph.component.html',
  styleUrls: ['./accounts-bar-graph.component.scss'],
})
export class AccountsBarGraphComponent implements OnInit {
  period: Period;
  dropdownValues: DropdownValue[] = [
    new DropdownValue('Monthly', 'Monthly'),
    new DropdownValue('Yearly', 'Yearly'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
  }

  ngOnInit(): void {}

  action(event: any) {
    console.log(event);
  }
}
