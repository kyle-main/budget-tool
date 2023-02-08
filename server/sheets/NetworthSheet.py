import os
from .Sheet import Sheet
from dotenv import load_dotenv
load_dotenv()

NETWORTH_SPREADSHEET_ID = os.getenv('NETWORTH_SPREADSHEET_ID')
NETWORTH_SHEET_RANGE = 'Networth Raw!A1:L'


class NetworthSheet(Sheet):
    """ Provides access to the Networth Sheet """

    def __init__(self):
        super().__init__()

    def add_record(self, value: list) -> None:
        return None

    def get_data(self) -> list:
        """ Get all the values from our spread sheet in a range """
        result = self.sheet.values().get(spreadsheetId=NETWORTH_SPREADSHEET_ID,
                                         range=NETWORTH_SHEET_RANGE).execute()
        res = []
        values = self.unicode_normalize_2d_list(result.get('values', []))
        for i, rec in enumerate(values):
            x = {}
            if len(rec) >= 23:
                # TODO: impl networth record data class to handle this functionality more cleanly
                x['date'] = rec[0]
                x['net_worth'] = rec[1]
                x['net_worth_delta'] = rec[2]
                x['assets'] = rec[4]
                x['assets_delta'] = rec[5]
                x['checking'] = rec[6]
                x['savings'] = rec[7]
                x['hsa'] = rec[8]
                x['401k_w_match'] = rec[9]
                x['401k_vested_difference'] = rec[10]
                x['401k_vested'] = rec[11]
                x['ira'] = rec[12]
                x['stocks'] = rec[13]
                x['debt'] = rec[15]
                x['debt_delta'] = rec[16]
                x['apple_credit'] = rec[17]
                x['chase_credit'] = rec[18]
                x['citi_credit'] = rec[19]
                x['secu_credit'] = rec[20]
                x['student_loans'] = rec[21]
                x['car_loan'] = rec[22]
                x = {k: self.financial_string_to_decimal(
                    v) for (k, v) in x.items()}
                res.append(x)
        return res

    def financial_string_to_decimal(self, s: str):
        import re

        # If the string contains letters leave it alone
        if any(char.isalpha() for char in s):
            return s

        # Check if the string starts with a parenthesis
        negative = False
        if s[0] == "(":
            negative = True
            s = s[1:-1]

        # Remove the comma separators
        s = re.sub(",", "", s)

        # Convert the string to a decimal number
        number = float(s)

        # Make the number negative if needed
        if negative:
            number = -number

        # Return the number with 2 decimal places
        return str(round(number, 2))
