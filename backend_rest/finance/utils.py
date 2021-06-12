import datetime
import re

regex_camel_to_snake = re.compile(r'(?<!^)(?=[A-Z])')


def camel_to_underscore(camel):
    return regex_camel_to_snake.sub('_', camel).lower()


def params_entry_filter(kwargs_in):
    print(kwargs_in)
    params = {}
    kwargs = dict((camel_to_underscore(k), v) for k, v in kwargs_in.items())
    if 'entity' in kwargs:
        params['entity_id'] = kwargs['entity']
    if 'entry_type' in kwargs:
        params['entry_type'] = kwargs['entry_type']
    if 'date_from' in kwargs:
        params['created_at__gt'] = kwargs['date_from']
    else:
        params['created_at__gt'] = datetime.date.today()
    if 'date_to' in kwargs:
        params['created_at__lt'] = datetime.datetime.strptime(kwargs['date_to']) + datetime.timedelta(days=1)
    else:
        params['created_at__lt'] = datetime.date.today() + datetime.timedelta(days=1)

    return params
