import requests
import configparser
from django.conf import settings
import os

config = configparser.ConfigParser()


def send_sms(receiver, msg, recipient_id=1):
    config.read(os.path.join(settings.BASE_DIR, 'credentials.ini'))
    beem = config['BEEMSMS']
    data = {
        'source_addr': beem['SENDER_ID'],
        'message': msg,
        'encoding': '0',
        'recipients': [
            {
                'recipient_id': recipient_id,
                'dest_addr': receiver
            }
        ]
    }
    res = requests.post(beem['URL'], json=data, auth=(beem['API_KEY'], beem['API_SECRET']))
    print(receiver, res.text)


if __name__ == '__main__':
    print('Send SMS')
    nums = ['255767859954', '255713123066', '255687457652']
    for num in nums:
        send_sms(num, 'Test message')
