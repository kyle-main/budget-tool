import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export class DropdownValue {
  value: string;
  label: string;
  color: string | null;

  constructor(value: string, label: string, color?: string) {
    this.value = value;
    this.label = label;
    this.color = color ? color : null;
  }
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: { '(document:click)': 'handleClick($event)' },
})
export class DropdownComponent implements OnInit {
  @Input() values: DropdownValue[];
  @Output() select: EventEmitter<any>;
  @ViewChild('mydropdown') private mydropdown: ElementRef;
  current: DropdownValue;
  showDropdown: boolean;

  constructor() {
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
    this.current = this.values[0];
  }

  selectItem(value) {
    console.log('selectItem');
    this.current = value;
    this.select.emit(value.label);
  }

  handleClick(event) {
    if (this.showDropdown) {
      let clickedComponent = event.target;
      if (clickedComponent !== this.mydropdown.nativeElement) {
        this.showDropdown = false;
      }
    }
  }

  toggleDropdown() {
    this.showDropdown = this.showDropdown === true ? false : true;
  }
}
