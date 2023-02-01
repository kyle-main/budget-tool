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
    new DropdownValue('Yearly', 'Yearly'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
    this.data = data;
    this.valueRange = [10000, 20000, 30000, 40000, 50000];
    this.currentColor = 0;
    this.timeline = [
      new Date('2021-01-01'),
      new Date('2021-02-01'),
      new Date('2021-03-01'),
      new Date('2021-04-01'),
      new Date('2021-05-01'),
      new Date('2021-06-01'),
      new Date('2021-07-01'),
      new Date('2021-08-01'),
      new Date('2021-09-01'),
      new Date('2021-10-01'),
      new Date('2021-11-01'),
      new Date('2021-12-01'),
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
