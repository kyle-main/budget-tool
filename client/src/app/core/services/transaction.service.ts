import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction';
import { SheetService } from './sheet.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends SheetService {
  constructor(public http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  public saveTransactions(transactions: Transaction[]): Promise<any> {
    let URL = this.url + 'transactions/add';
    // python transaction interface has
    //   category as a string, so we have
    //   to convert it here from Category.
    let body = transactions.map((t) => {
      return {
        ...t,
        category: t.category.value,
      };
    });
    return this.http
      .post(URL, body, this.getHttpOptions())
      .toPromise()
      .then((data) => {
        this.openSuccessDialog();
        return data;
      })
      .catch((error) => {
        this.handleError(error);
      });
  }
}
