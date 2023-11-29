import logging
import requests




def main():
    print('e')
    r = requests.get('https://www.python.org')
    r.status_code

if __name__ == "__main__":
    main()



def upload_bc3():
    logging.info('Python HTTP trigger function processed a request.')

    if not name:
        try:
            req_body = 'a'
        except ValueError:
            pass
        else:
            name = req_body.get('name')


  