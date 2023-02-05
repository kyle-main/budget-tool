import { Component, OnInit, Input } from '@angular/core';
import { List } from 'postcss/lib/list';
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
  @Input() data: any;
  color: string;
  period: Period;
  data_old: any;
  valueRange: number[];
  timeline: Date[];
  currentColor: number;
  periodDropdownValues: DropdownValue[] = [
    new DropdownValue('Monthly', 'Monthly'),
    new DropdownValue('Quarterly', 'Quarterly'),
    new DropdownValue('Yearly', 'Yearly'),
  ];
  colorDropdownValues: DropdownValue[] = [
    new DropdownValue('Blue', 'Blue', 'blue'),
    new DropdownValue('Yellow', 'Yellow', 'yellow'),
    new DropdownValue('Red', 'Red', 'red'),
    new DropdownValue('Green', 'Green', 'green'),
    new DropdownValue('Purple', 'Purple', 'purple'),
  ];

  constructor(private netWorthService: NetWorthService) {
    this.period = Period.MONTHLY;
    this.data_old = data;
    this.valueRange = [100000, 200000, 300000, 400000, 500000].reverse();
    this.currentColor = 0;
    this.setTimeline(Period.MONTHLY);
  }

  ngOnInit(): void {}

  action(event: Period) {
    console.log('action');
    this.period = event;
    this.setTimeline(this.period);
  }

  nextColor(): any {
    let color = colors[this.currentColor];
    this.currentColor = (this.currentColor + 1) % colors.length;
    return color;
  }

  setColor(event: string): void {
    this.color = event;
  }

  getValue(percent: string): number {
    let n = parseFloat(percent.slice(0, -1));
    return n * this.valueRange[0];
  }

  setTimeline(period: Period) {
    switch (period) {
      case Period.MONTHLY:
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
        break;
      case Period.QUARTERLY:
        this.timeline = [
          new Date(2019, 2, 1),
          new Date(2019, 5, 1),
          new Date(2019, 8, 1),
          new Date(2019, 11, 1),
          new Date(2020, 2, 1),
          new Date(2020, 5, 1),
          new Date(2020, 8, 1),
          new Date(2020, 11, 1),
          new Date(2021, 2, 1),
          new Date(2021, 5, 1),
          new Date(2021, 8, 1),
          new Date(2021, 11, 1),
        ];
        break;
      case Period.YEARLY:
        this.timeline = [
          new Date(2011, 11, 1),
          new Date(2012, 11, 1),
          new Date(2013, 11, 1),
          new Date(2014, 11, 1),
          new Date(2015, 11, 1),
          new Date(2016, 11, 1),
          new Date(2017, 11, 1),
          new Date(2018, 11, 1),
          new Date(2019, 11, 1),
          new Date(2020, 11, 1),
          new Date(2021, 11, 1),
          new Date(2022, 11, 1),
        ];
        break;
    }
  }
}
