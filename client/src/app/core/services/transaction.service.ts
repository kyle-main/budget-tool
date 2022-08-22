import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _url = 'http://localhost:5000/';

  constructor(private _http: HttpClient) {}

  public getHttpOptions(queryParams?) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let params = new HttpParams();
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        params = params.append(key, encodeURIComponent(queryParams[key]));
      });
    }
    return {
      headers,
      params,
      responseType: 'text' as 'json',
    };
  }

  public saveTransactions(transactions: Transaction[]): Promise<any> {
    let URL = this._url + 'transactions/add';
    // python transaction interface has
    //   category as a string, so we have
    //   to convert it here from Category.
    let body = transactions.map((t) => {
      return {
        ...t,
        category: t.category.value,
      };
    });
    return this._http
      .post(URL, body, this.getHttpOptions())
      .toPromise()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return Promise.reject(error);
  }
}
