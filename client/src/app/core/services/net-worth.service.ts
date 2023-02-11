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

  public async getNetWorth(month: number, year: number): Promise<any> {
    let URL = this.url + 'networth/get';
    try {
      const data = await this.http
        .get(
          URL,
          this.getHttpOptions({
            month: month,
            year: year,
          })
        )
        .toPromise();
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getNetWorthWithDates(dates: Date[]): Promise<any[]> {
    let res = [];
    dates.forEach(async (date) => {
      let month = date.getMonth();
      let year = date.getFullYear();
      let data = await this.getNetWorth(month, year);
      res.push(data);
    });
    return res;
  }
}
