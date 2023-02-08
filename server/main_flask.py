""" Main code entry point """
import json
import csv

from rich import print as pprint
from flask import Flask, request

from sheets import NetworthSheet
from sheets import TransactionSheet
from dashboard import create_dashboard

app = Flask(__name__)

transaction_sheet = TransactionSheet()
networth_sheet = NetworthSheet()


@app.after_request
def enable_cors(response):
    origin = request.headers.get('Origin', '')
    white_list = ['http://localhost:4200']
    if any([substr in origin for substr in white_list]):
        response.headers.add('Access-Control-Allow-Origin', origin)
        response.headers.add('Access-Control-Allow-Headers', '*')
    return response


@app.route('/', methods=['GET'])
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/transactions/add', methods=['POST'])
def add_transactions():
    # category field currently broken
    transactions = json.loads(request.data.decode('utf-8'))
    transaction_sheet.add_transactions(
        transaction_sheet.clean_transactions(transactions)
    )
    transactions_make_local_backup()
    return ('Success', 200)


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
        return ('Input syntax error', 400)
    success = transaction_sheet.populate_monthly_view_helper(year, month)
    return ('Success', 200) if success else ('Failed', 500)


@app.route('/transactions/make-local-backup', methods=['GET'])
def transactions_make_local_backup():
    all_transactions = transaction_sheet.get_transactions()
    print(len(all_transactions))
    with open('local_transactions.csv', 'w') as f:
        write = csv.writer(f)
        write.writerow(transaction_sheet.get_headers())
        write.writerows(all_transactions)
    return ('Success', 200)


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
    return values


@app.route('/dashboards/', methods=['GET'])
def create_dashboard():
    try:
        year = int(request.args.get('year'))
        month = int(request.args.get('month'))
    except Exception:
        print('Improper input values')
        return 'Input syntax error', 400
    values = eval(get_transactions())
    create_dashboard.create_monthly_dashboard(values)
    return ('Success', 200) if values else ('Failed', 500)


def main():
    """main function"""
    pprint(
        f"\n\tThis is a [link=https://flask.palletsprojects.com/en/2.0.x/quickstart/]Flask[/link] application.\n\tPlease run:\n\t\t[{'blue'}]export FLASK_APP=main_flask && flask run[/{'blue'}]\n\tto start the development server.\n"
    )


if __name__ == "__main__":
    main()
