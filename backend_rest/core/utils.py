import re


def resolve_template(tmpl, params=None):
    if not params:
        return tmpl
    res = tmpl
    for p in params.items():
        key = p[0]
        val = p[1]
        regex = f'{{{key}}}'
        res = re.sub(regex, val, res)

    return res


if __name__ == '__main__':
    tmpl = 'Shalom {#}. {#}, Leo tunakutaka kwenye kipindi chetu. Ibada itaanza saa mbili kamili. Pia tutapata utaratibu wa kambi letu la maombi litakaloanza alhamisi. Barikiwa'
    params = {
        '#': 'Ezra Nkayamba'
    }
    res = resolve_template(tmpl, params)
    print(res)
