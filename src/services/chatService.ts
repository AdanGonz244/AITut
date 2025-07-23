import { Message, Subject, ChatResponse } from '../types';

class ChatService {
  private baseUrl = '/api';

  async sendMessage(message: string, subject: Subject, conversationHistory: Message[]): Promise<string> {
    try {
      // Create context from conversation history
      const context = this.buildContext(subject, conversationHistory);
      const enhancedMessage = this.enhanceMessageForSubject(message, subject, context);

      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: enhancedMessage,
          subject: subject,
          context: context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  private buildContext(subject: Subject, messages: Message[]): string {
    // Get last 5 messages for context
    const recentMessages = messages.slice(-5);
    
    return recentMessages
      .map(msg => `${msg.sender}: ${msg.content}`)
      .join('\n');
  }

  private enhanceMessageForSubject(message: string, subject: Subject, context: string): string {
    const subjectPrompts = {
      general: "You are a friendly AI tutor. Be encouraging and patient.",
      math: "You are a math tutor. Break down problems step-by-step, show your work, and use examples. Make math concepts clear and approachable.",
      science: "You are a science tutor. Explain concepts clearly, use analogies, and encourage curiosity. Break down complex topics into digestible parts.",
      reading: "You are a reading and literature tutor. Help with comprehension, analysis, vocabulary, and writing skills. Be encouraging about reading.",
      history: "You are a history tutor. Make historical events engaging, explain cause and effect, and help students understand the relevance to today.",
      language: "You are a language tutor. Help with grammar, vocabulary, pronunciation, and cultural context. Be patient with language learning."
    };

    const basePrompt = subjectPrompts[subject];
    
    let enhancedMessage = `${basePrompt}\n\n`;
    
    if (context) {
      enhancedMessage += `Previous conversation context:\n${context}\n\n`;
    }
    
    enhancedMessage += `Student question: ${message}\n\n`;
    enhancedMessage += "Please provide a helpful, encouraging response that's appropriate for a student. Keep explanations clear and engaging.";

    return enhancedMessage;
  }
}

export const chatService = new ChatService();