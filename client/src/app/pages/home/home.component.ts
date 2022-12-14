import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  Category,
  CATEGORIES,
  PARENT_CATEGORIES,
} from '../../core/models/category';
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
  saveButtonDisabled: boolean = true;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // TODO: Add type validators to fields
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
      category: [null, Validators.required],
      date: [null, Validators.required],
    });
    this.categories = CATEGORIES;
  }

  addButtonDisabled(): boolean {
    return this.form.valid;
  }

  isExpense(parentCategory: string): boolean {
    return parentCategory !== PARENT_CATEGORIES.INCOME;
  }

  addTransaction(): void {
    let transaction = this.form.getRawValue();
    transaction['recurring'] = this.recurring;
    if (this.isExpense(transaction['category'].parent)) {
      transaction['amount'] = transaction['amount'] * -1;
    }
    this.transactionList.push(this.castTransaction(transaction));
    this.saveButtonDisabled = false;
  }

  castTransaction(list): Transaction {
    let date: Date = list['date'];
    let t: Transaction = {
      name: String(list['name']),
      amount: Number(list['amount']),
      category: list['category'],
      year: date.getFullYear(),
      month: date.getMonth(), // starting from zero
      day: date.getDate(),
      recurring: list['recurring'],
    };
    return t;
  }

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  clearForm(): void {
    this.formGroupDirective.resetForm();
    this.recurring = false;
  }

  saveTransactions(): void {
    let res = this.transactionService.saveTransactions(this.transactionList);
    this.transactionList = [];
    this.saveButtonDisabled = true;
  }

  setRecurring(recurring: boolean): void {
    this.recurring = recurring;
  }

  setFormTransaction(transaction: Transaction): void {
    this.clearForm();
    this.form.get('name').setValue(transaction.name);
    this.form.get('amount').setValue(transaction.amount);
    this.recurring = transaction.recurring;
    let categoryIndex = this.categories.indexOf(
      this.categories.find((t) => t.value === transaction.category.value)
    );
    this.form.get('category').setValue(this.categories[categoryIndex]);
    this.form
      .get('date')
      .setValue(new Date(transaction.year, transaction.month, transaction.day));
  }

  save() {
    this.saveTransactions();
    this.clearForm();
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
