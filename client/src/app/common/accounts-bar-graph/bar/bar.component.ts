import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() color: string;
  @Input() value: number;

  constructor() {}

  ngOnInit(): void {}

  blue() {
    return this.color === 'blue';
  }

  lightBlue() {
    return this.color === 'light-blue';
  }
}
