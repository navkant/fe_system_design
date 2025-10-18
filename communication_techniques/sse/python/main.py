from flask import Flask, jsonify, session, request, make_response, make_response
import json
from flask_cors import CORS, cross_origin
import time
import flask


app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(app, supports_credentials=True)


@app.route("/sse")
def test_route():
    def generate_events():
        messages = [
            {"message": "Connection successfull", "status": 0},
            {"message": "First message", "status": 0}, 
            {"message": "Second message", "status": 0}
        ]
        for index, msg in enumerate(messages):
            yield f"data: {json.dumps(msg)}\n\n"
            time.sleep(5)  # Simulate some processing delay

        end_stream = ["event: ENDSTREAM\n", "data: This is the end of stream\n\n"]
        yield end_stream[0]
        yield end_stream[1]

    return flask.Response(generate_events(), headers={"X-Accel-Buffering": "no"}, mimetype='text/event-stream')


if __name__ == "__main__":
    app.run(debug=True, port=8080)
