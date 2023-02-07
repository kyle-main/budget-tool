import { Component, OnInit, Input } from '@angular/core';
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
  lightColorCounter: number;
  periodDropdownValues: DropdownValue[] = [
    new DropdownValue('monthly', 'Monthly'),
    new DropdownValue('quarterly', 'Quarterly'),
    new DropdownValue('yearly', 'Yearly'),
  ];
  colorDropdownValues: DropdownValue[] = [
    new DropdownValue('blue', 'Blue', 'blue'),
    new DropdownValue('yellow', 'Yellow', 'yellow'),
    new DropdownValue('red', 'Red', 'red'),
    new DropdownValue('green', 'Green', 'green'),
    new DropdownValue('purple', 'Purple', 'purple'),
  ];

  constructor(private netWorthService: NetWorthService) {}

  ngOnInit(): void {
    this.period = this.getCurrentPeriod();
    this.data_old = data;
    this.valueRange = [100000, 200000, 300000, 400000, 500000].reverse();
    this.color = this.getCurrentColorAsString();
    this.lightColorCounter = 0;
    this.setTimeline(Period.MONTHLY);
  }

  action(event: Period) {
    this.period = event;
    this.setTimeline(this.period);
  }

  nextColor(): any {
    let color = this.color;
    if (this.lightColorCounter % 2 == 1) {
      color = 'light-' + color;
    }
    this.lightColorCounter++;
    return color;
  }

  monthly(): boolean {
    return this.period === Period.MONTHLY;
  }
  quarterly(): boolean {
    return this.period === Period.QUARTERLY;
  }
  yearly(): boolean {
    return this.period === Period.YEARLY;
  }

  setColor(event: string): void {
    this.color = event.toLowerCase();
    localStorage.setItem('accent-color', this.color);
  }

  getCurrentColorAsString(): string {
    let accentColor = localStorage.getItem('accent-color');
    if (accentColor) {
      this.color = accentColor;
    } else {
      localStorage.setItem('accent-color', this.color);
    }
    return this.color;
  }

  getCurrentPeriod(): Period {
    let period = localStorage.getItem('period');
    if (period) {
      this.period = Period[period];
    } else {
      localStorage.setItem('period', this.period);
    }
    return this.period;
  }

  getValue(percent: string): number {
    let n = parseFloat(percent.slice(0, -1));
    return n * this.valueRange[0];
  }

  test() {
    let currentColor = this.getCurrentColorAsString();
    this.colorDropdownValues.forEach((color) => {
      if (color.value === currentColor) {
        console.log('test() returns: ' + color.value);
        return color;
      }
    });
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
