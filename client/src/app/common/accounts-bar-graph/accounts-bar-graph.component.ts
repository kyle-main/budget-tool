import { Component, OnInit } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';
import { DropdownValue } from '../dropdown/dropdown.component';

enum Period {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

let data = [
  { size: '10%' },
  { size: '25%' },
  { size: '23%' },
  { size: '36%' },
  { size: '45%' },
  { size: '51%' },
  { size: '53%' },
  { size: '67%' },
  { size: '56%' },
  { size: '63%' },
  { size: '71%' },
  { size: '83%' },
];

@Component({
  selector: 'app-accounts-bar-graph',
  templateUrl: './accounts-bar-graph.component.html',
  styleUrls: ['./accounts-bar-graph.component.scss'],
})
export class AccountsBarGraphComponent implements OnInit {
  period: Period;
  data: any;
  valueRange: any;
  dropdownValues: DropdownValue[] = [
    new DropdownValue('Monthly', 'Monthly'),
    new DropdownValue('Yearly', 'Yearly'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
    this.data = data;
    this.valueRange = [10000, 20000, 30000, 40000, 50000];
  }

  ngOnInit(): void {}

  action(event: any) {
    console.log(event);
  }
}
