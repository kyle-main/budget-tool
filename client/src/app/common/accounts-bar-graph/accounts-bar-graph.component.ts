import { Component, OnInit } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';
import { DropdownValue } from '../dropdown/dropdown.component';

enum Period {
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
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

let colors = ['blue', 'light-blue'];

@Component({
  selector: 'app-accounts-bar-graph',
  templateUrl: './accounts-bar-graph.component.html',
  styleUrls: ['./accounts-bar-graph.component.scss'],
})
export class AccountsBarGraphComponent implements OnInit {
  period: Period;
  data: any;
  valueRange: any;
  timeline: Date[];
  currentColor: number;
  dropdownValues: DropdownValue[] = [
    new DropdownValue('Monthly', 'Monthly'),
    new DropdownValue('Quarterly', 'Quarterly'),
    new DropdownValue('Yearly', 'Yearly'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
    this.data = data;
    this.valueRange = [100000, 200000, 300000, 400000, 500000].reverse();
    this.currentColor = 0;
    this.timeline = [
      new Date(2021, 0, 1),
      new Date(2021, 1, 1),
      new Date(2021, 2, 1),
      new Date(2021, 3, 1),
      new Date(2021, 4, 1),
      new Date(2021, 5, 1),
      new Date(2021, 6, 1),
      new Date(2021, 7, 1),
      new Date(2021, 8, 1),
      new Date(2021, 9, 1),
      new Date(2021, 10, 1),
      new Date(2021, 11, 1),
    ];
  }

  ngOnInit(): void {}

  action(event: any) {
    console.log(event);
  }
  nextColor(): any {
    let color = colors[this.currentColor];
    this.currentColor = (this.currentColor + 1) % colors.length;
    return color;
  }
}
