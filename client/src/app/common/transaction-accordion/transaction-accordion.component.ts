import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Transaction } from '../../core/models/transaction';

@Component({
  selector: 'app-transaction-accordion',
  templateUrl: './transaction-accordion.component.html',
  styleUrls: ['./transaction-accordion.component.scss'],
})
export class TransactionAccordionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  t: Transaction = {
    name: 'Chipotle',
    amount: -12.45,
    category: 'Food',
    year: 2021,
    month: 12,
    day: 16,
    recurring: false,
  };
  @Input('transactions') trasactions: Transaction[] = [];
  constructor() {}

  ngOnInit(): void {
    this.trasactions.push(this.t);
  }
}
