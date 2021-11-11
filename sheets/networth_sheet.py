import os
from .sheet import Sheet
from dotenv import load_dotenv
load_dotenv()

NETWORTH_SPREADSHEET_ID = os.getenv('NETWORTH_SPREADSHEET_ID')
NETWORTH_SHEET_RANGE = 'Networth Raw!A1:L'


class NetworthSheet(Sheet):
    """ Provides access to the Networth Sheet """

    def __init__(self):
        super().__init__()

    def get_data(self) -> list:
        """ Get all the values from our spread sheet in a range """
        result = self.sheet.values().get(spreadsheetId=NETWORTH_SPREADSHEET_ID,
                                         range=NETWORTH_SHEET_RANGE).execute()
        values = result.get('values', [])
        return values
