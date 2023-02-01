import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() height: number;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}

  heightBetween(min: number, max: number): boolean {
    return this.height > min && this.height <= max;
  }

  blue() {
    return this.color === 'blue';
  }

  lightBlue() {
    return this.color === 'light-blue';
  }
}
