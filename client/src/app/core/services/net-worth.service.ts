import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { SheetService } from './sheet.service';

@Injectable({
  providedIn: 'root',
})
export class NetWorthService extends SheetService {
  constructor(public http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  public getNetWorth(): Promise<any> {
    let URL = this.url + 'networth/get';
    return this.http
      .get(URL, this.getHttpOptions())
      .toPromise()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.handleError(error);
      });
  }
}
