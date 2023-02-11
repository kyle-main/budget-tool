import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NetWorthService } from 'src/app/core/services/net-worth.service';
import { DropdownValue } from '../dropdown/dropdown.component';

enum Period {
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
  YEARLY = 'Yearly',
}

let temp_data = [
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
  @Input() rawData: any[];
  @Output() periodChange: EventEmitter<any>;
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

  constructor() {
    this.periodChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.period = this.getCurrentPeriod();
    this.data_old = temp_data;
    this.color = this.getCurrentColorAsString();
    this.lightColorCounter = 0;
  }

  ngOnChanges(): void {
    this.valueRange = this.setValueRange();
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

  setValueRange() {
    console.log('setValueRange()');
    console.log(this.timeline);
    console.log(this.rawData);
    if (this.timeline) {
      console.log('test');
      let min = NaN;
      let max = NaN;
      console.log(this.rawData.length);
      for (let i = 0; i < this.rawData.length; i++) {
        console.log('another test');
        console.log(i);
      }
    }
    return [100000, 200000, 300000, 400000, 500000].reverse();
  }

  setTimeline(period: Period) {
    let timeline = [];
    let month = new Date().getMonth() - 1;
    let year = new Date().getFullYear();
    switch (period) {
      case Period.MONTHLY:
        for (let i = 0; i < 12; i++) {
          if (month < 0) {
            year = year - 1;
            month = 11;
          }
          timeline.push(new Date(year, month, 1));
          month = month - 1;
        }
        this.timeline = timeline.reverse();
        break;
      case Period.QUARTERLY:
        // start at last full quarter
        if (month <= 2) {
          // Q4
          month = 11;
          year = year - 1;
        } else if (month <= 5) {
          // Q1
          month = 2;
        } else if (month <= 8) {
          // Q2
          month = 5;
        } else {
          // Q3
          month = 8;
        }
        for (let i = 0; i < 12; i++) {
          if (month < 0) {
            year = year - 1;
            month = 11;
          }
          timeline.push(new Date(year, month, 1));
          month = month - 3;
        }
        this.timeline = timeline.reverse();
        break;
      case Period.YEARLY:
        year = year - 1;
        for (let i = 0; i < 12; i++) {
          timeline.push(new Date(year, 0, 1));
          year = year - 1;
        }
        this.timeline = timeline.reverse();
        break;
    }

    this.periodChange.emit(this.timeline);
  }

  matchDates(stringDate: string, date: Date): boolean {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const stringMonth = stringDate.split(', ')[0];
    const stringYear = stringDate.split(', ')[1];
    const dateMonth = months[date.getMonth()];
    const dateYear = date.getFullYear().toString();
    console.log(stringMonth);
    console.log(dateMonth);
    console.log(stringYear);
    console.log(dateYear);
    const x = stringMonth === dateMonth && stringYear === dateYear;
    return x;
  }
}
