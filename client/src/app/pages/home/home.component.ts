import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../core/models/category';
import { Transaction } from '../../core/models/transaction';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  transactionList: Transaction[] = [];
  recurring: boolean = false;
  categories: Category[] = [
    { value: 'Rent', parent: 'Home' },
    { value: 'Electricity', parent: 'Home' },
    { value: 'Car Payment', parent: 'Transportation' },
    { value: 'Fuel', parent: 'Transportation' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // TODO: Add validators
    this.form = this.formBuilder.group({
      name: [null],
      amount: [null],
      category: [null],
      date: [null],
    });
  }

  addTransaction(): void {
    let transaction = this.form.getRawValue();
    transaction['recurring'] = this.recurring;
    this.transactionList.push(transaction);
  }

  clearForm(): void {
    this.form.reset();
    this.recurring = false;
  }

  saveTransactions(): void {
    this.transactionService
      .saveTransactions(this.transactionList)
      .subscribe((res) => {
        console.log(res);
      });
  }

  setRecurring(recurring: boolean): void {
    this.recurring = recurring;
  }

  save() {
    this.saveTransactions();
  }

  submit() {
    if (!this.form.valid) {
      // TODO: Add toast to say form invalid
      console.error('Form invalid!');
      return;
    }
    this.addTransaction();
    this.clearForm();
  }
}
