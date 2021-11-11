""" Main code entry point """
import json
from rich import print as pprint
from flask import Flask, request, jsonify
from models.transaction import Transaction
from sheets.transaction_sheet import TransactionSheet
from sheets.networth_sheet import NetworthSheet

app = Flask(__name__)

transaction_sheet = TransactionSheet()
networth_sheet = NetworthSheet()


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/transactions/add', methods=['GET'])
def add_transaction():
    data = json.loads(request.data)['transaction']
    name = data['name']
    amount = data['amount']
    category = data['category']
    month = data['month']
    year = data['year']
    day = data['day']
    recurring = data['recurring']
    transaction = Transaction(name, amount, category,
                              month, year, day, recurring)
    transaction_sheet.add_transaction(transaction.to_list())
    return str(transaction.to_list())


@app.route('/transactions/get', methods=['GET'])
def get_transactions():
    args = request.args
    try:
        year = int(args.get('year', 0))
        month = int(args.get('month', 0))
        day = int(args.get('day', 0))
    except Exception:
        print('Improper input values')
        return 'Input syntax error', 400
    values = transaction_sheet.get_transactions(year, month, day)
    return str(values)


@app.route('/transactions/load-view', methods=['GET'])
def transactions_load_view():
    args = request.args
    try:
        year = int(args.get('year', 0))
        month = int(args.get('month', 0))
    except Exception:
        print('Improper input values')
        return 'Input syntax error', 400
    success = transaction_sheet.populate_monthly_view_helper(year, month)
    return ('Success', 200) if success else ('Failed', 500)


@app.route('/networth/get', methods=['GET'])
def get_networth():
    args = request.args
    try:
        year = int(args.get('year', 0))
        month = int(args.get('month', 0))
    except Exception:
        print('Improper input values')
        return 'Input syntax error', 400
    values = networth_sheet.get_data()
    return str(values)


def main():
    """ main function """
    pprint(
        f"\n\tThis is a [link=https://flask.palletsprojects.com/en/2.0.x/quickstart/]Flask[/link] application.\n\tPlease run:\n\t\t[{'blue'}]export FLASK_APP=main_flask && flask run[/{'blue'}]\n\tto start the development server.\n")


if __name__ == "__main__":
    main()
