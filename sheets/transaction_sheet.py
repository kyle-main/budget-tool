"""
SheetsConnector class handles the connection and IO of our Transaction sheet.
"""
from __future__ import print_function
import os.path

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from dotenv import load_dotenv

load_dotenv()

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
# The ID and range of a sample spreadsheet.

TRANSACTIONS_SPREADSHEET_ID = os.getenv('TRANSACTIONS_SPREADSHEET_ID')
TRANSACTION_SHEET_RANGE = 'Transactions!A2:H'
VIEW_SHEET_RANGE = 'Monthly View Helper!A2:H'


class TransactionSheet():
    """ Connects to our transaction sheet and provides access to the
    document."""

    def __init__(self):
        creds = None
        # The file token.json stores the user's access and refresh tokens,
        # and is created automatically when the authorization flow
        # completes for the first time.
        os.chdir('./auth/')
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w', encoding='utf-8') as token:
                token.write(creds.to_json())
        self.service = build('sheets', 'v4', credentials=creds)
        self.sheet = self.service.spreadsheets()
        os.chdir('../')

    def get_transactions(self, year: int = 0, month: int = 0, day: int = 0) -> list:
        """ Get all the values from our spread sheet in a range """
        result = self.sheet.values().get(spreadsheetId=TRANSACTIONS_SPREADSHEET_ID,
                                         range=TRANSACTION_SHEET_RANGE).execute()
        values = result.get('values', [])
        if year > 0:
            values = [x for x in values if int(x[4]) == year]
        if month > 0:
            values = [x for x in values if int(x[3]) == month]
        if day > 0:
            values = [x for x in values if int(x[5]) == day]
        return values

    def print_transactions(self) -> None:
        """ Print all the values of our sheet from column A to H """
        values = self.get_transactions()
        if not values:
            print('No data found.')
        else:
            print('Name, Amount, Category, Month, Year, Id:')
            for row in values:
                # Print columns A through H
                print(
                    f"({row[0]}, {row[1]}, {row[2]}, {row[3]}, {row[4]}, {row[5]}, {row[6]}, {row[7]})")

    def add_transaction(self, values: list) -> None:
        """ Given a transaction add it to our sheet """
        range_ = TRANSACTION_SHEET_RANGE
        # RAW, USER_ENTERED, INPUT_VALUE_OPTION_UNSPECIFIED
        value_input_option = 'RAW'
        # OVERWRITE, INSERT_ROWS
        insert_data_option = 'OVERWRITE'

        value_range_body = {
            "values": [values]
        }
        request = self.service.spreadsheets().values().append(
            spreadsheetId=TRANSACTIONS_SPREADSHEET_ID, range=range_,
            valueInputOption=value_input_option,
            insertDataOption=insert_data_option, body=value_range_body)
        request.execute()

    def add_transactions(self, values: list) -> None:
        """ Given a list of transactions add it to our sheet """
        for transaction in values:
            self.add_transaction(transaction)
