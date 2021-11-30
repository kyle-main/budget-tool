import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  saveTransactions(transactions: Transaction[]): void {}
}
