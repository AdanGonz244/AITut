import React, { useState, useRef, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import SubjectSelector from './components/SubjectSelector';
import Header from './components/Header';
import { Message, Subject } from './types';
import { chatService } from './services/chatService';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI tutor, ready to help you learn and explore any subject. What would you like to study today?",
      sender: 'ai',
      timestamp: new Date(),
      subject: 'general'
    }
  ]);
  const [currentSubject, setCurrentSubject] = useState<Subject>('general');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      subject: currentSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(content, currentSubject, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        subject: currentSubject
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
        subject: currentSubject
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectChange = (subject: Subject) => {
    setCurrentSubject(subject);
    
    const subjectChangeMessage: Message = {
      id: Date.now().toString(),
      content: `Great! I've switched to ${subject} mode. How can I help you with ${subject} today?`,
      sender: 'ai',
      timestamp: new Date(),
      subject: subject
    };
    
    setMessages(prev => [...prev, subjectChangeMessage]);
  };

  return (
    <div className="app">
      <Header />
      <SubjectSelector 
        currentSubject={currentSubject} 
        onSubjectChange={handleSubjectChange} 
      />
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}

export default App;