import React from 'react';
import { faUser, faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CompanyLogo from '../Home/images/Logo.png';

const ChatMessage = ({ chat, isBotTyping }) => {
  
  const isToday = new Date().toDateString() === new Date(chat.timestamp).toDateString();
  
  return (
    <div className={`flex gap-3 items-start ${chat.role === "user" ? 'justify-end' : ''} animate-fade-in`}>
      {chat.role === "model" && (
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-sm">
          <img 
            src={CompanyLogo} 
            alt="Company Logo" 
            className="h-8 w-8 rounded-full object-cover" 
          />
        </div>
      )}
      
      <div className={`max-w-[80%] ${chat.role === "user" ? 'flex flex-col items-end' : ''}`}>
        <div className={`
          px-4 py-3 rounded-xl text-sm relative
          transition-all duration-150
          ${chat.role === "model" 
            ? 'bg-emerald-50 rounded-tl-none text-emerald-800 border border-emerald-100 shadow-sm' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-tr-none text-white shadow-md'}
          ${chat.text === "Thinking..." ? 'min-w-[100px]' : ''}
        `}>
          {chat.text}
          
         
          {chat.role === "user" && (
            <span className="absolute -bottom-3 -right-1 flex items-center">
              <FontAwesomeIcon 
                icon={chat.read ? faCheckDouble : faCheck} 
                className={`h-3 w-3 ${chat.read ? 'text-blue-300' : 'text-gray-300'}`} 
              />
            </span>
          )}
        </div>
        
        {chat.timestamp && (
          <div className={`text-xs mt-1 flex items-center gap-1 ${
            chat.role === "user" 
              ? 'text-gray-400 mr-2' 
              : 'text-gray-500 ml-2'
          }`}>
            {isToday ? '' : new Date(chat.timestamp).toLocaleDateString() + ' '}
            {chat.timestamp}
          </div>
        )}
      </div>
      
      {chat.role === "user" && (
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-md">
          <FontAwesomeIcon 
            icon={faUser} 
            className="h-4 w-4 text-gray-600" 
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;