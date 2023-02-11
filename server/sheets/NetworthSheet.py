import os
import time
import logging
from typing import Tuple
from .Sheet import Sheet
from models.networth import Networth
from dotenv import load_dotenv
load_dotenv()

NETWORTH_SPREADSHEET_ID = os.getenv('NETWORTH_SPREADSHEET_ID')
NETWORTH_SHEET_RANGE = 'Net Worth!B3:X68'

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.WARNING)
logger = logging.getLogger(__name__)


class NetworthSheet(Sheet):
    """ Provides access to the Networth Sheet """

    def __init__(self):
        super().__init__()
        self.data: list = []
        self.locked: bool = False

    def get_all_data(self) -> list:
        """ Get all the networth records from the spread sheet and cache them """
        if not self.data:
            if self.locked:
                logger.info('data locked! waiting...')
                time.sleep(1)
                return self.get_all_data()
            self.locked = True
            logger.info('no cached data. fetching from google sheets')
            # because this operation can take some time,
            # we must use a lock to prevent calling the api simultaniously
            result = self.sheet.values().get(spreadsheetId=NETWORTH_SPREADSHEET_ID,
                                             range=NETWORTH_SHEET_RANGE).execute()
            values = self.unicode_normalize_2d_list(result.get('values', []))
            self.data = values
            self.locked = False
        logger.info('data cached.')
        return self.data

    def get_data(self, month: int, year: int) -> dict:
        """ Get all the values from our spread sheet in a range """
        data = self.get_all_data()
        res = {}
        for i, rec in enumerate(data):
            if self.dates_match(rec[0], (month, year)):
                print(rec[0])
                nw = Networth(rec)
                res = nw.to_dict()
                print(res)

        return res

    def dates_match(self, date: str, date_values: Tuple[int, int]) -> bool:
        match = False
        months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        month, year = date_values
        str_month, str_year = date.split(', ')
        if (months[month] == str_month) and (str(year) == str_year):
            match = True
        return match
