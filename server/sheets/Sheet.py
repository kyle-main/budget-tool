import os
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.auth.exceptions import RefreshError

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
RETRIED = False


class Sheet:
    def __init__(self):
        """ Handle authentication and connection """
        global RETRIED
        creds = None
        # The file token.json stores the user's access and refresh tokens,
        # and is created automatically when the authorization flow
        # completes for the first time.
        os.chdir('../auth/')
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                try:
                    creds.refresh(Request())
                except RefreshError:
                    if RETRIED:
                        print('Retry failed. Exiting.')
                        raise
                    RETRIED = True
                    print(
                        'Error refreshing token.\nDeleting token.json and trying again.')
                    os.remove('token.json')
                    os.chdir('../')
                    return self.__init__()
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w', encoding='utf-8') as token:
                token.write(creds.to_json())
        self.service = build('sheets', 'v4', credentials=creds)
        self.sheet = self.service.spreadsheets()
        os.chdir('../server/')
