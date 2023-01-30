import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { TransactionAccordionComponent } from './common/transaction-accordion/transaction-accordion.component';
import { MoneyFormatterPipe } from './core/pipes/money-formatter.pipe';
import { DateFormatterPipe } from './core/pipes/date-formatter.pipe';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AccountSummaryComponent } from './common/account-summary/account-summary.component';
import { AccountsBarGraphComponent } from './common/accounts-bar-graph/accounts-bar-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TransactionAccordionComponent,
    MoneyFormatterPipe,
    DateFormatterPipe,
    DashboardComponent,
    TransactionsComponent,
    AccountSummaryComponent,
    AccountsBarGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
