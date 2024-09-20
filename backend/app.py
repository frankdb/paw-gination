from flask import Flask, jsonify, request, make_response
import requests
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


@app.route("/api/dogs")
def get_dogs():
    page = request.args.get("page", default=1, type=int)
    try:
        response = requests.get(
            f"https://interview-wheat.vercel.app/api/dogs?page={page}"
        )
        response.raise_for_status()

        data = response.json()
        app.logger.info(f"Successfully parsed JSON data. First few items: {data[:2]}")

        return jsonify(data)
    except requests.RequestException as e:
        app.logger.error(f"Error fetching data: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.logger.info("Starting Flask server")
    print("Flask server is running on http://127.0.0.1:5000")
    app.run(debug=True)
