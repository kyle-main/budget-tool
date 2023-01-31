import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class DropdownValue {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() values: DropdownValue[];
  @Output() select: EventEmitter<any>;
  current: DropdownValue;

  constructor() {
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
    this.current = this.values[0];
  }

  selectItem(value) {
    this.current = value;
    this.select.emit(value.label);
  }

  toggleDropdown() {
    document.getElementById('myDropdown').classList.toggle('show');
  }
}
