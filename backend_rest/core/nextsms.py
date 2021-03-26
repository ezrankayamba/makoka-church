import requests


TOKEN = 'bmV4dC5hcGk6TXNjY0AyMDIx'


def send_sms(to='255713123066'):
    url = "https://messaging-service.co.tz/api/sms/v1/test/text/single"
    headers = {
        'Authorization': f'Basic {TOKEN}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    payload = {
        'from': 'NEXTSMS', 'to': to, 'text': 'Test message'
    }
    response = requests.request("POST", url, headers=headers, json=payload)
    print(response.text.encode('utf8'))


def get_status(messageId=None):
    url = "https://messaging-service.co.tz/api/sms/v1/reports"
    if messageId:
        url = f'https://messaging-service.co.tz/api/sms/v1/reports?messageId={messageId}'

    payload = {}
    headers = {
        'Authorization': f'Basic {TOKEN}',
        'Accept': 'application/json'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text.encode('utf8'))
