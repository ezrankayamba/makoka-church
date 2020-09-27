import smtplib
from email.message import EmailMessage
import os

EMAIL_ADDRESS = 'twiga.nezatech@gmail.com'
EMAIL_PASSWORD = 'gjkrloqotkbehwqp'


def send_assign(id, dest, base_url='http://localhost:8000'):
    msg = EmailMessage()
    msg['Subject'] = 'Customer Complaint Assigned'
    msg['From'] = f'Twiga - CCMS<{EMAIL_ADDRESS}>'
    msg['To'] = dest
    msg.set_content('HTML disabled?')

    with open('assign.html', 'r') as f:
        html = f.read()
        html = html.replace('RECORD_ID', f'{id}')
        html = html.replace('DETAIL_URL', base_url)
    msg.add_alternative(html, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


def send_registered(id, dest, def_pass, base_url='http://localhost:8000'):
    msg = EmailMessage()
    msg['Subject'] = 'User Registration'
    msg['From'] = f'Twiga - CCMS<{EMAIL_ADDRESS}>'
    msg['To'] = dest
    msg.set_content('HTML disabled?')

    with open('registered.html', 'r') as f:
        html = f.read()
        html = html.replace('DEFAULT_PASS', f'{id}')
        html = html.replace('DETAIL_URL', base_url)
    msg.add_alternative(html, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


def send_feedback(complaint, cc=None):
    msg = EmailMessage()
    msg['Subject'] = f'Customer Feedback #{complaint.id}'
    msg['From'] = f'Twiga - CCMS<{EMAIL_ADDRESS}>'
    msg['To'] = complaint.feedback.email
    msg['CC'] = cc
    msg.set_content('HTML disabled?')

    with open('feedback.html', 'r') as f:
        html = f.read()
        html = html.replace('RECORD_ID', f'{complaint.id}')
        html = html.replace('REMARKS', f'{complaint.feedback.remarks}')
    msg.add_alternative(html, subtype='html')
    for doc in complaint.feedback.docs.all():
        with open(doc.file.path, 'rb') as file:
            file_data = file.read()
            file_name = os.path.basename(doc.file.name)
            msg.add_attachment(file_data,
                               maintype='application',
                               subtype='octet-stream',
                               filename=file_name)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
    print(f'Feedback sent to: {complaint.feedback.email}')