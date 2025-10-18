from flask import Flask, jsonify, session, request, make_response, make_response
import json
from flask_cors import CORS, cross_origin
import time
import flask


app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(app, supports_credentials=True)


@app.route("/", methods=["GET"])
def index():
    # if request.method == "OPTIONS": # CORS preflight
    #     return _build_cors_preflight_response()
    print(request.cookies)
    time.sleep(4)

    if "count" not in session:
        session["count"] = 1
    else:
        session["count"] += 1

    return jsonify(
        {"message": "Hello world!",
         "status": 1,
         "visit_count": session["count"]
         }
    )


# @app.after_request
# def set_session_cookie(response):
#     # Check if a session cookie already exists
#     if "session" in request.cookies:
#         return response

#     # Set the session cookie
#     breakpoint()
#     response.set_cookie("session", session, httponly=True)
#     return response


# def _build_cors_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "127.0.0.1")
#     response.headers.add('Access-Control-Allow-Headers', "*")
#     response.headers.add('Access-Control-Allow-Methods', "*")
#     return response


@app.route("/restaurants/", methods=["GET"])
def restaurant_list():
    rest_list_data = json.load(open("rest_list.json", "r"))
    for item in rest_list_data["data"]["cards"]:
        if "id" in item["card"]["card"].keys():
            if item["card"]["card"]["id"] == "top_brands_for_you":
                rest_list = item["card"]["card"]["gridElements"]["infoWithStyle"]["restaurants"]

    return jsonify(
        {
            "status": 1,
            "restaurant_list": rest_list
        }
    )


@app.route("/restaurant/<restaurant_id>/")
def get_restaurant(restaurant_id):
    rest_list_data = json.load(open("rest_list.json", "r"))
    for item in rest_list_data["data"]["cards"]:
        if "id" in item["card"]["card"].keys():
            if item["card"]["card"]["id"] == "top_brands_for_you":
                rest_list = item["card"]["card"]["gridElements"]["infoWithStyle"]["restaurants"]

    for restaurant in rest_list:
        if restaurant["info"]["id"] == restaurant_id:
            return jsonify(
                {
                    "status": 1,
                    "restaurant_data": restaurant,
                }
            )
        else:
            continue

    return jsonify(
        {
            "status": 0,
            "message": "restaurant  not found"
        }
    )

@app.route("/test_route")
def test_route():
    def generate_events():
        messages = [{"message": "Hello", "status": 0}, {"message": "from", "status": 0}, {"message": "Flask SSE!", "status": 1}]
        for msg in messages:
            time.sleep(40)  # Simulate some processing delay
            yield f"data: {msg}\n\n"

        end_stream = ["event: ENDSTREAM\n", "data: This is the end of stream\n\n"]
        yield end_stream[0]
        yield end_stream[1]

    return flask.Response(generate_events(), headers={"X-Accel-Buffering": "no"}, mimetype='text/event-stream')


if __name__ == "__main__":
    app.run(debug=True, port=8080)
