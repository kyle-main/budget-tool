# Personal Budget Tool

### Description:

Personal budget tool using an Angular SPA and a Python Flask back-end with the Google Sheets API as a data store.

## Getting started:

Clone the repo to your local with

```bash
git clone git@github.com:kyle-main/budget-tool.git
```

With python 3.9 or higher run

```bash
mkdir .venv
python3 -m venv .venv
. .venv/bin/activate
pip3 install -r requirements.txt
```

Next install npm ~x.x.x and angular cli ~x.x.x

Download client dependencies with

```bash
cd client
npm -i -y
```

## Running Locally:

To start our flask server run

```bash
export FLASK_APP=main_flask && flask run
```

To start our angular app, in the client directory run

```bash
npm start
```

## Authorization

To use this project with your own data you will need:

- Google Sheet access credentials
- A Google Sheet to connect to

[**How to get access credentials**](https://developers.google.com/workspace/guides/create-credentials)

When you have your credentials.json file

```bash
mkdir auth
mv ~/credentials.json auth/
```

Next create a .env file in the root directory of the project.
Inside it should look like this:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./auth/credentials.json
TRANSACTION_SPREADSHEET_ID=<code_at_end_of_google_sheets_url>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
