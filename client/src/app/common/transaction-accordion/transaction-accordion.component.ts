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
  @Input('transactions') transactions: Transaction[] = [];
  constructor() {}

  ngOnInit(): void {}

  deleteTransaction(transaction: any): void {
    console.log(transaction);
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1);
    }
  }
}
