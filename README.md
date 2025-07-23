# AITut

An AI-powered tutoring chatbot designed to help students learn and study across multiple subjects.

## Features

- **Multi-Subject Support**: Math, Science, Reading, History, Language, and General topics
- **Conversational Memory**: Maintains context within each session
- **Subject-Specific Responses**: Tailored explanations for different academic areas
- **Friendly Interface**: Encouraging and patient tutoring approach
- **Real-time Chat**: Instant responses with typing indicators
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Backend (Python Flask)

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up your OpenAI API key:
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. Run the Flask server:
   ```bash
   python server.py
   ```

### Frontend (React + TypeScript)

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Usage

1. Select a subject from the tabs at the top
2. Type your question in the chat input
3. The AI tutor will provide helpful, subject-specific responses
4. Continue the conversation - the AI remembers the context!

## Architecture

- **Frontend**: React + TypeScript with Vite
- **Backend**: Python Flask API
- **AI**: OpenAI GPT-3.5-turbo
- **Styling**: Custom CSS with modern design principles

## Subject Specializations

- **Math**: Step-by-step problem solving, clear explanations
- **Science**: Concept explanations with real-world examples
- **Reading**: Comprehension help, vocabulary, literature analysis
- **History**: Engaging historical context and connections
- **Language**: Grammar, vocabulary, cultural context
- **General**: Ready to help with any topic

## Contributing

Feel free to contribute by:
- Adding new subjects
- Improving the UI/UX
- Enhancing the AI prompts
- Adding new features

## License

MIT License - feel free to use this project for educational purposes!
