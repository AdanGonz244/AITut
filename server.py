import os
from flask import Flask, request, jsonify, cors
import openai
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes
from flask_cors import CORS
CORS(app)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")
    subject = data.get("subject", "general")
    context = data.get("context", "")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        # Enhanced system message based on subject and context
        system_message = get_system_message(subject)
        
        messages = [{"role": "system", "content": system_message}]
        
        # Add context if available
        if context:
            messages.append({"role": "assistant", "content": f"Previous context: {context}"})
        
        messages.append({"role": "user", "content": user_input})
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        reply = response.choices[0].message.content
        return jsonify({"response": reply})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def get_system_message(subject):
    """Get subject-specific system message for the AI tutor"""
    base_message = """You are an AI tutor designed to help students learn. You should:
    - Be patient, encouraging, and supportive
    - Break down complex topics into simple, understandable parts
    - Use examples and analogies to explain concepts
    - Ask follow-up questions to check understanding
    - Provide step-by-step explanations when needed
    - Make learning fun and engaging
    - Adapt your language to be age-appropriate
    """
    
    subject_specific = {
        "math": """Focus on mathematical concepts, problem-solving, and step-by-step solutions. 
        Show your work clearly and explain each step. Use visual descriptions when helpful.""",
        
        "science": """Focus on scientific concepts, experiments, and real-world applications. 
        Use analogies and examples from everyday life. Encourage curiosity and questioning.""",
        
        "reading": """Focus on reading comprehension, vocabulary, literature analysis, and writing skills. 
        Help with understanding themes, characters, and literary devices. Encourage reading habits.""",
        
        "history": """Focus on historical events, cause and effect, and connections to modern times. 
        Make history engaging with stories and interesting facts. Help students understand context.""",
        
        "language": """Focus on grammar, vocabulary, pronunciation, and cultural context. 
        Be patient with language learning and provide plenty of examples and practice opportunities.""",
        
        "general": """Be ready to help with any subject. Ask what specific topic the student needs help with."""
    }
    
    return base_message + "\n\n" + subject_specific.get(subject, subject_specific["general"])
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "AI Tutor API is running!",
        "timestamp": datetime.now().isoformat(),
        "endpoints": {
            "chat": "/chat (POST)",
            "health": "/ (GET)"
        }
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)
