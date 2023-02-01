import { Component, OnInit } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';
import { DropdownValue } from '../dropdown/dropdown.component';

enum Period {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

let data = [
  { size: '10%' },
  { size: '50%' },
  { size: '90%' },
  { size: '10%' },
  { size: '50%' },
  { size: '90%' },
  { size: '10%' },
  { size: '50%' },
  { size: '90%' },
  { size: '10%' },
  { size: '50%' },
  { size: '90%' },
];

@Component({
  selector: 'app-accounts-bar-graph',
  templateUrl: './accounts-bar-graph.component.html',
  styleUrls: ['./accounts-bar-graph.component.scss'],
})
export class AccountsBarGraphComponent implements OnInit {
  period: Period;
  data: any;
  dropdownValues: DropdownValue[] = [
    new DropdownValue('Monthly', 'Monthly'),
    new DropdownValue('Yearly', 'Yearly'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
    this.data = data;
  }

  ngOnInit(): void {}

  action(event: any) {
    console.log(event);
  }
}
