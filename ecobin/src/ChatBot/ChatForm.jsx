import React, { useState, useEffect, useRef } from 'react';
import { faPaperPlane, faMicrophone, faImage, faTrash, faRecycle, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, isBotTyping }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Waste management quick actions
  const quickActions = [
    { icon: faTrash, text: "Collection schedule", prompt: "When is the next waste collection in my area?" },
    { icon: faRecycle, text: "Recycling guide", prompt: "What items can I recycle in my blue bin?" },
    { icon: faLeaf, text: "Compost tips", prompt: "How do I start composting at home?" }
  ];

  useEffect(() => {
    if (!isBotTyping) {
      inputRef.current?.focus();
    }
  }, [isBotTyping, chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || isBotTyping) return;

    const userMessage = { 
      role: "user", 
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setShowQuickActions(false);
    
    generateBotResponse([...chatHistory, userMessage]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      inputRef.current.focus();
    }
  };

  const handleQuickAction = (prompt) => {
    setMessage(prompt);
    inputRef.current.focus();
  };

  return (
    <div className="w-full relative">
      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="absolute bottom-16 left-0 right-0 bg-white rounded-xl shadow-xl border border-emerald-100 p-4 animate-slide-up">
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 group"
              >
                <div className="h-10 w-10 flex items-center justify-center bg-emerald-500 text-white rounded-full mb-2 group-hover:bg-emerald-600 transition-colors">
                  <FontAwesomeIcon icon={action.icon} className="text-lg" />
                </div>
                <span className="text-xs font-medium text-emerald-800">{action.text}</span>
              </button>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-l border-emerald-100 rotate-45"></div>
        </div>
      )}

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="flex items-center gap-2 w-full relative"
      >
        {/* Attachment and Quick Actions Button */}
        <div className="flex-shrink-0 flex gap-1">
          <button
            type="button"
            onClick={() => document.getElementById('file-upload').click()}
            className="h-12 w-12 flex items-center justify-center rounded-full text-emerald-600 hover:bg-emerald-100 transition-all duration-200 group relative"
            aria-label="Attach file"
          >
            <FontAwesomeIcon icon={faImage} className="text-lg" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 text-white text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              +
            </span>
          </button>
          <input type="file" id="file-upload" className="hidden" />

          <button
            type="button"
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={`h-12 w-12 flex items-center justify-center rounded-full transition-all duration-200 ${
              showQuickActions 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-emerald-600 hover:bg-emerald-100'
            }`}
            aria-label="Quick actions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        {/* Message Input */}
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full py-3 pl-5 pr-14 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 shadow-sm border border-gray-200 hover:border-emerald-300"
            placeholder={isBotTyping ? "AI is thinking..." : "Ask about waste collection, recycling..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowQuickActions(false)}
            required
            disabled={isBotTyping}
          />
          
          {/* Input Actions */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
            {message ? (
              <button
                type="button"
                onClick={() => setMessage('')}
                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                aria-label="Clear message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleRecording}
                className={`h-8 w-8 flex items-center justify-center rounded-full transition-all ${
                  isRecording 
                    ? 'text-red-500 bg-red-50 animate-pulse' 
                    : 'text-emerald-600 hover:bg-emerald-100'
                }`}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                <FontAwesomeIcon icon={faMicrophone} className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={!message.trim() || isBotTyping}
          className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full text-white transition-all duration-300 ${
            message.trim() && !isBotTyping 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transform hover:scale-105' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <div className="relative">
            <FontAwesomeIcon 
              icon={faPaperPlane} 
              className={`h-5 w-5 transition-transform duration-300 ${message.trim() ? 'rotate-12' : ''}`} 
            />
            {message.trim() && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full animate-ping opacity-75"></span>
            )}
          </div>
        </button>
      </form>

      {/* Microphone Animation when recording */}
      {isRecording && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-red-500 opacity-20 animate-ping absolute inset-0"></div>
            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faMicrophone} className="h-3 w-3" />
            </div>
          </div>
          <span className="ml-2 text-sm font-medium text-red-500">Listening...</span>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatForm;