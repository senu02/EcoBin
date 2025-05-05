import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faComment, faTimes, faMinus, faExpand, faTrash, faRecycle, faLeaf } from '@fortawesome/free-solid-svg-icons';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import Logo from '../Home/images/Logo.png';

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBodyRef = useRef();
  const popupRef = useRef();

  
  const primaryColor = 'from-emerald-600';
  const secondaryColor = 'to-teal-600';
  const accentColor = 'bg-emerald-500';
  const lightAccent = 'bg-emerald-50';
  const darkAccent = 'bg-emerald-700';
  const textColor = 'text-emerald-800';
  const wasteGreen = 'bg-green-600';
  const wasteBlue = 'bg-blue-500';
  const wasteBrown = 'bg-amber-700';
  
  const vibrateStyle = {
    animation: 'vibrate 2s infinite ease-in-out',
    transformOrigin: 'center'
  };

  // Add custom animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes vibrate {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.05) rotate(-2deg); }
        50% { transform: scale(1.08) rotate(2deg); }
        75% { transform: scale(1.05) rotate(-2deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      @keyframes trashBounce {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(5deg); }
        50% { transform: translateY(-10px) rotate(0deg); }
        75% { transform: translateY(-5px) rotate(-5deg); }
      }
      @keyframes leafFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(5deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const generateBotResponse = async (history) => {
    setIsBotTyping(true);
    
    const updateHistory = (text) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        {
          role: "model",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsBotTyping(false);
    };

    updateHistory("Thinking...");

    try {
      history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history })
      };

      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      updateHistory("Sorry, I'm having trouble connecting. Please try again later.");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (showChatbot && popupRef.current) {
      const popup = popupRef.current;
      const viewportHeight = window.innerHeight;
      const popupHeight = popup.offsetHeight;

      if (popupHeight > viewportHeight - 150) {
        popup.style.maxHeight = `${viewportHeight - 150}px`;
      }
    }
  }, [showChatbot]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setIsMinimized(false);
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
    setShowChatbot(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Initial Welcome Screen */}
      {!showChatbot && !isMinimized && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br ${primaryColor} ${secondaryColor}`}>
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated floating waste items */}
            <div className="absolute top-1/4 left-1/5">
              <FontAwesomeIcon 
                icon={faTrash} 
                className="text-3xl text-white/30 animate-leafFloat" 
                style={{ animationDuration: '8s' }}
              />
            </div>
            <div className="absolute top-1/3 right-1/4">
              <FontAwesomeIcon 
                icon={faRecycle} 
                className="text-4xl text-white/20 animate-leafFloat" 
                style={{ animationDuration: '10s', animationDelay: '1s' }}
              />
            </div>
            <div className="absolute bottom-1/4 left-1/3">
              <FontAwesomeIcon 
                icon={faLeaf} 
                className="text-5xl text-white/15 animate-leafFloat" 
                style={{ animationDuration: '12s', animationDelay: '2s' }}
              />
            </div>
          </div>
          
          <div
            className="flex flex-col items-center justify-center cursor-pointer pointer-events-auto animate-fade-in relative z-10"
            onClick={toggleChatbot}
          >
            <div className="relative group">
              <img
                src={Logo}
                alt="Company Logo"
                className="h-[250px] w-[250px] rounded-full object-cover mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform-gpu"
                style={vibrateStyle}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">WasteWise AI Assistant</h2>
            <p className="text-white/80 text-lg max-w-md text-center mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              Click to chat about waste collection, recycling, and sustainability
            </p>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${wasteGreen} flex items-center justify-center text-white mb-1 animate-bounce`}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <span className="text-white/80 text-xs">Collection</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${wasteBlue} flex items-center justify-center text-white mb-1 animate-bounce`} style={{ animationDelay: '0.2s' }}>
                  <FontAwesomeIcon icon={faRecycle} />
                </div>
                <span className="text-white/80 text-xs">Recycling</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${wasteBrown} flex items-center justify-center text-white mb-1 animate-bounce`} style={{ animationDelay: '0.4s' }}>
                  <FontAwesomeIcon icon={faLeaf} />
                </div>
                <span className="text-white/80 text-xs">Compost</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chatbot Button */}
      {isMinimized && (
        <div
          className={`fixed bottom-8 right-8 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br ${primaryColor} ${secondaryColor} text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto z-50 animate-bounce`}
          onClick={toggleChatbot}
        >
          <div className="relative">
            <FontAwesomeIcon icon={faComment} className="text-2xl" />
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 rounded-full text-xs font-bold animate-ping"></span>
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 rounded-full text-xs font-bold"></span>
          </div>
        </div>
      )}

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-emerald-800/90 backdrop-blur-sm ${isFullscreen ? 'p-0' : 'p-4'}`}>
          <div
            className={`${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-2xl mx-4 h-[80vh] rounded-2xl'} flex flex-col bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-out pointer-events-auto border-2 border-emerald-300`}
            ref={popupRef}
          >
            {/* Chat Header */}
            <div className={`flex p-4 items-center justify-between bg-gradient-to-r ${primaryColor} ${secondaryColor} text-white relative`}>
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <img
                    src={Logo}
                    alt="Company Logo"
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full w-3 h-3 border border-white animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">WasteWise Assistant</h2>
                  <p className="text-xs opacity-90">
                    {isBotTyping ? 'Typing...' : 'Online now'}
                    {isBotTyping && (
                      <span className="ml-1 inline-flex space-x-1">
                        <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  <FontAwesomeIcon icon={faExpand} className="text-sm" />
                </button>
                <button
                  className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={minimizeChatbot}
                  aria-label="Minimize chat"
                >
                  <FontAwesomeIcon icon={faMinus} className="text-sm" />
                </button>
                <button
                  className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={toggleChatbot}
                  aria-label="Close chat"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            </div>
            
            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className={`flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gradient-to-b from-white to-gray-50 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent ${isFullscreen ? 'h-[calc(100vh-132px)]' : ''}`}
            >
              {/* Welcome Message */}
              <div className="flex gap-3 items-start">
                <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br ${primaryColor} ${secondaryColor} rounded-full shadow-sm`}>
                  <img 
                    src={Logo} 
                    alt="Company Logo" 
                    className="h-8 w-8 rounded-full object-cover" 
                  />
                </div>
                <div className="max-w-[80%]">
                  <div className={`px-4 py-3 ${lightAccent} rounded-xl rounded-tl-none text-sm ${textColor} shadow-sm border border-emerald-100 animate-fade-in`}>
                    <p className="font-medium">Hello! I'm your Waste Management Assistant. 🌱</p>
                    <p className="mt-1">I can help with:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li>Collection schedules</li>
                      <li>Recycling guidelines</li>
                      <li>Waste disposal questions</li>
                      <li>Sustainability tips</li>
                    </ul>
                    <p className="mt-2">How can I assist you today?</p>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 ml-1">Just now</div>
                </div>
              </div>

              {/* Chat Messages */}
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} isBotTyping={isBotTyping} />
              ))}

              {/* Typing Indicator */}
              {isBotTyping && chatHistory[chatHistory.length - 1]?.text === "Thinking..." && (
                <div className="flex gap-3 items-start">
                  <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br ${primaryColor} ${secondaryColor} rounded-full shadow-sm`}>
                    <img 
                      src={Logo} 
                      alt="Company Logo" 
                      className="h-8 w-8 rounded-full object-cover" 
                    />
                  </div>
                  <div className="max-w-[80%]">
                    <div className={`px-4 py-3 ${lightAccent} rounded-xl rounded-tl-none text-sm ${textColor} shadow-sm border border-emerald-100`}>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs">Researching waste solutions...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Form */}
            <div className="bg-white p-4 border-t border-gray-100 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-emerald-200">
                Ask about waste management
              </div>
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
                isBotTyping={isBotTyping}
              />
              <div className="flex justify-center mt-2 gap-4">
                <button className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
                  <FontAwesomeIcon icon={faTrash} className="text-xs" /> Collection
                </button>
                <button className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
                  <FontAwesomeIcon icon={faRecycle} className="text-xs" /> Recycling
                </button>
                <button className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
                  <FontAwesomeIcon icon={faLeaf} className="text-xs" /> Compost
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;