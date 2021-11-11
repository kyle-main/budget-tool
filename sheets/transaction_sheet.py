import os
from .sheet import Sheet
from dotenv import load_dotenv
load_dotenv()

TRANSACTIONS_SPREADSHEET_ID = os.getenv('TRANSACTIONS_SPREADSHEET_ID')
TRANSACTION_SHEET_RANGE = 'Transactions!A2:H'
VIEW_SHEET_RANGE = 'Monthly View Helper!A2:H'


class TransactionSheet(Sheet):
    """ Provides access to the Transaction Sheet """

    def __init__(self):
        super().__init__()

    def add_transaction(self, values: list, range_: str = TRANSACTION_SHEET_RANGE) -> None:
        self.add_transactions([values], range_)

    def add_transactions(self, values: list, range_: str = TRANSACTION_SHEET_RANGE) -> None:
        """ Given a transaction add it to our sheet """
        # RAW, USER_ENTERED, INPUT_VALUE_OPTION_UNSPECIFIED
        value_input_option = 'USER_ENTERED'
        # OVERWRITE, INSERT_ROWS
        insert_data_option = 'OVERWRITE'

        value_range_body = {
            "values": values
        }
        request = self.service.spreadsheets().values().append(
            spreadsheetId=TRANSACTIONS_SPREADSHEET_ID, range=range_,
            valueInputOption=value_input_option,
            insertDataOption=insert_data_option, body=value_range_body)
        request.execute()

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

    def populate_monthly_view_helper(self, year: int, month: int) -> bool:
        """ Clear the helper sheet and add new filtered data """
        try:
            request = self.service.spreadsheets().values().clear(
                spreadsheetId=TRANSACTIONS_SPREADSHEET_ID, range=VIEW_SHEET_RANGE)
            res = request.execute()
            if not res.get('clearedRange'):
                return False
            values = self.get_transactions(year, month)
            self.add_transactions(values, VIEW_SHEET_RANGE)
            return True
        except Exception:
            return False
