import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'src'))

from main import app

def handler(event, context):
    """Netlify function handler for Flask app"""
    from werkzeug.wrappers import Request, Response
    from werkzeug.serving import WSGIRequestHandler
    import json
    
    # Convert Netlify event to WSGI environ
    environ = {
        'REQUEST_METHOD': event.get('httpMethod', 'GET'),
        'PATH_INFO': event.get('path', '/'),
        'QUERY_STRING': event.get('queryStringParameters', ''),
        'CONTENT_TYPE': event.get('headers', {}).get('content-type', ''),
        'CONTENT_LENGTH': str(len(event.get('body', ''))),
        'wsgi.input': event.get('body', ''),
        'wsgi.version': (1, 0),
        'wsgi.url_scheme': 'https',
        'wsgi.errors': sys.stderr,
        'wsgi.multithread': False,
        'wsgi.multiprocess': True,
        'wsgi.run_once': False,
        'SERVER_NAME': 'localhost',
        'SERVER_PORT': '443',
    }
    
    # Add headers to environ
    for key, value in event.get('headers', {}).items():
        key = 'HTTP_' + key.upper().replace('-', '_')
        environ[key] = value
    
    # Create response
    response_data = []
    
    def start_response(status, headers):
        response_data.append(status)
        response_data.append(headers)
    
    # Call Flask app
    result = app(environ, start_response)
    
    # Format response for Netlify
    return {
        'statusCode': int(response_data[0].split()[0]),
        'headers': dict(response_data[1]),
        'body': ''.join(result)
    }
