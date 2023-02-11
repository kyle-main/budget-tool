""" Networth dataclass will be the obj that is uploaded to google sheets """
from dataclasses import dataclass
from rich import print as pprint


class Networth:
    """ Class for each individual transaction """

    def __init__(self, inputs: list):
        inputs = [
            self.financial_string_to_decimal(i) for i in inputs]

        self.date: str = inputs[0]
        self.net_worth = inputs[1]
        self.net_worth_delta = inputs[2]
        self.assets = inputs[4],
        self.assets_delta = inputs[5],
        self.checking = inputs[6],
        self.savings = inputs[7],
        self.hsa = inputs[8],
        self.k401_w_match = inputs[9],
        self.k401_vested_difference = inputs[10],
        self.k401_vested = inputs[11],
        self.ira = inputs[12],
        self.stocks = inputs[13],
        self.debt = inputs[15],
        self.debt_delta = inputs[16],
        self.apple_credit = inputs[17],
        self.chase_credit = inputs[18],
        self.citi_credit = inputs[19],
        self.secu_credit = inputs[20],
        self.student_loans = inputs[21],
        self.car_loan = inputs[22]

    def to_list(self) -> list:
        """ Return dataclass as a list structure """
        return [
            self.date,
            self.net_worth,
            self.net_worth_delta,
        ]

    def to_dict(self) -> dict:
        x = {}
        x['date'] = self.date
        x['net_worth'] = self.net_worth
        x['net_worth_delta'] = self.net_worth_delta
        return x

    def financial_string_to_decimal(self, s: str) -> str:
        import re

        # If the string contains letters leave it alone
        if any(char.isalpha() for char in s) or not s:
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
