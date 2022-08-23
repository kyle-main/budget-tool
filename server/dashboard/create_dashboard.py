import pandas as pd
import matplotlib.pyplot as plt
from typing import List

from models.transaction import Transaction


def create_monthly_dashboard(transactions: List[Transaction]) -> None:
    columns = ['Name', 'Amount', 'Category',
               'Month', 'Year', 'Day', 'Recurring', 'ID']
    df = pd.DataFrame(transactions, columns=columns)
    categorical_spending = df.groupby(
        'Category').sum().sort_values(by='Amount')
    return None
