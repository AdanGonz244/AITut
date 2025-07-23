import os
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # GPT Model
            messages=[{"role": "user", "content": user_input}]
        )
        reply = response.choices[0].message.content
        return jsonify({"response": reply}) # Response Thingy

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "AITut is workin!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
