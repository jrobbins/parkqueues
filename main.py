import logging
import flask

import settings
from api import basehandlers
from api import parks_api
from api import park_api


api_routes = [
    ('/parks', parks_api.ParksAPI),
    ('/parks/<string:park_uid>', park_api.ParkAPI)
    ]

app = basehandlers.FlaskApplication(
    __name__, api_routes, '/api/v0')


@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/node_modules/<path:filename>')
def node_modules(filename):
    logging.info('request for node_modules %r' % filename)
    return flask.send_from_directory(
        app.root_path + '/node_modules/', filename)


@app.route('/', defaults={'path': ''})
@app.route("/<string:path>") 
@app.route('/<path:path>')
def spa_pages(path):
    logging.info('serving spa page: %r', path)
    return app.send_static_file("index.html")

