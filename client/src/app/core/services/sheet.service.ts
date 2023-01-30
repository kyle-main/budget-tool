import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  public url = 'http://localhost:5000/';
  constructor(public http: HttpClient, public snackBar: MatSnackBar) {}

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

  public handleError(error: HttpErrorResponse): Promise<any> {
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
    this.openErrorDialog(error.name);
    return Promise.reject(error);
  }

  public openErrorDialog(message: string): void {
    this.openSnackBar('error', message);
  }

  public openSuccessDialog(message?: string): void {
    this.openSnackBar('success', message ? message : undefined);
  }

  public openSnackBar(status: string, message?: string): void {
    const config = new MatSnackBarConfig();
    let snack;
    config.duration = 5000;
    if (status === 'success') {
      config.panelClass = ['snackbar-success'];
      snack = 'Success';
    } else {
      config.panelClass = ['snackbar-failure'];
      snack = message ? message : 'Unknown error ocurred.';
    }
    this.snackBar.open(snack, 'Dismiss', config);
  }
}
