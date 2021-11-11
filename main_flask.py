""" Main code entry point """
import json
from flask import Flask, request, jsonify
from models.transaction import Transaction
from sheets.transaction_sheet import TransactionSheet

app = Flask(__name__)

transaction_sheet = TransactionSheet()


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/add-transaction', methods=['GET'])
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


@app.route('/get-values', methods=['GET'])
def get_values():
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


@app.route('/load-view', methods=['GET'])
def load_view():
    args = request.args
    try:
        year = int(args.get('year', 0))
        month = int(args.get('month', 0))
    except Exception:
        print('Improper input values')
        return 'Input syntax error', 400
    success = transaction_sheet.populate_monthly_view_helper(year, month)
    return ('Success', 200) if success else ('Failed', 500)


def main():
    """ main function """
    print("""
        This is a Flask application.
        Please run 
            export FLASK_APP=main_flask && flask run
        to start the development server.
    """)


if __name__ == "__main__":
    main()
