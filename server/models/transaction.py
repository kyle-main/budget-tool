""" Transaction dataclass will be the obj that is uploaded to google sheets """
from dataclasses import dataclass
from rich import print as pprint


@dataclass
class Transaction:
    """ Class for each individual transaction """
    name: str
    amount: float
    category: str
    month: int
    year: int
    day: int = 0
    recurring: bool = False

    def print_transaction(self) -> None:
        """ Pretty print a transaction """
        name = f"[bold blue]{self.name}[/bold blue]"
        amount_color = 'green' if self.amount >= 0 else 'red'
        trimmed_amount = str(self.amount).replace("-", "")
        amount = f"[{amount_color}]{trimmed_amount}[/{amount_color}]"
        pprint(f"{name}: {amount}")

    def to_list(self) -> list:
        """ Return dataclass as a list structure """
        return [
            self.name,
            self.amount,
            self.category,
            self.month,
            self.year,
            self.day,
            self.recurring
        ]
