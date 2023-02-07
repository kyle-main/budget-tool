import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  @Input() values: DropdownValue[] = [];
  @Input() identifier: string;
  @Output() currentSelectionChange: EventEmitter<any>;
  @ViewChild('mydropdown') private mydropdown: ElementRef;
  showDropdown: boolean;
  currentSelection: BehaviorSubject<DropdownValue> =
    new BehaviorSubject<DropdownValue>(this.values[0]);

  constructor() {
    this.currentSelectionChange = new EventEmitter();
  }

  ngOnInit(): void {
    const storedValue = localStorage.getItem(this.identifier);
    if (storedValue) {
      this.currentSelection.next(this.getDropdownValueWithValue(storedValue));
    } else {
      this.currentSelection.next(this.values[0]);
    }
    this.currentSelection.subscribe((value) => {
      localStorage.setItem(this.identifier, value.value);
    });
    this.selectItem(this.currentSelection.getValue());
  }

  selectItem(value: DropdownValue) {
    this.currentSelection.next(value);
    this.currentSelectionChange.emit(value.label);
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

  getDropdownValueWithValue(value: string): DropdownValue {
    let x: DropdownValue = this.values[0];
    this.values.forEach((dropdownValue) => {
      let val = dropdownValue.value;
      if (val === value) {
        x = dropdownValue;
      }
    });
    return x;
  }
}
