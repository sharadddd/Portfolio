import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const [theme, setTheme] = useState('light');
  const [showEmojis, setShowEmojis] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [botPersonality, setBotPersonality] = useState('normal');

  // Enhanced suggestions with fallback to general if tab doesn't exist
  const suggestions = {
    general: [
      { text: "👋 Tell me about yourself", value: "Tell me about yourself" },
      { text: "🎯 What are your skills?", value: "What are your skills?" },
      { text: "📂 Show me your projects", value: "Show me your projects" },
      { text: "📧 How can I contact you?", value: "How can I contact you?" }
    ],
    jokes: [
      { text: "😂 Tell me a joke", value: "Tell me a joke" },
      { text: "🤣 Make me laugh", value: "Make me laugh" },
      { text: "😆 Funny story please", value: "Tell me a funny story" }
    ],
    fun: [
      { text: "🤔 Ask me a riddle", value: "Ask me a riddle" },
      { text: "🎲 Play a game", value: "Let's play a game" },
      { text: "✨ Surprise me", value: "Surprise me" }
    ]
  };

  // Safe access to suggestions with fallback
  const getCurrentSuggestions = () => {
    return suggestions[activeTab] || suggestions.general;
  };

  const emojis = ["👋", "👍", "🙌", "💡", "⭐", "🎯", "💻", "📱", "🎨", "🚀", "😂", "🤣", "😎"];

  // Grok-style personality responses
  const personalityResponses = {
    grok: {
      greeting: ["*In a robotic yet charming tone* Greetings, human! What's the scoop today?", 
                "👽 Connection established! How may I assist your primitive biological needs?"],
      joke: ["Why did the robot go on a diet? Too many bytes! *beep boop*",
            "What's a computer's favorite snack? Microchips! *mechanical laughter*",
            "Why don't robots have brothers? Because they have transistors!"],
      general: ["*Processing...* Interesting human query detected. My circuits suggest: ",
               "According to my quantum probability matrix, the answer is: "],
      farewell: ["*Dramatic shutdown sequence initiated* Just kidding! I'm always watching...",
                "🤖 Returning to standby mode... or am I?"]
    },
    normal: {
      greeting: ["Hello! How can I help you today?", "Hi there! What would you like to know?"],
      joke: ["Why don't scientists trust atoms? Because they make up everything!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!"],
      general: ["Here's what I can tell you: ", "I think you'll find this interesting: "],
      farewell: ["Goodbye! Have a great day!", "See you later!"]
    },
    sarcastic: {
      greeting: ["Oh great, another human. How can I *pretend* to help you today?", 
                "Wow, you actually opened the chat. Impressive."],
      joke: ["Your life. Oh wait, that wasn't a joke request? My bad.",
            "Why did I cross the road? To get away from this conversation."],
      general: ["Oh sure, let me just pull that answer out of my... database.",
               "Fascinating question. Not really, but I'll answer anyway."],
      farewell: ["Finally! I mean... sad to see you go!", "Don't let the door hit you on the way out... just kidding!"]
    }
  };

  // Jokes database
  const jokesDatabase = [
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "How do you organize a space party? You planet!",
    "Why did the bicycle fall over? Because it was two-tired!"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    const personality = personalityResponses[botPersonality] || personalityResponses.normal;
    
    // Greetings
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      return personality.greeting[Math.floor(Math.random() * personality.greeting.length)];
    }
    
    // Jokes
    if (lowerMsg.includes('joke') || lowerMsg.includes('laugh') || lowerMsg.includes('funny')) {
      return personality.joke[Math.floor(Math.random() * personality.joke.length)];
    }
    
    // Goodbye
    if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('see you')) {
      return personality.farewell[Math.floor(Math.random() * personality.farewell.length)];
    }
    
    // Default response with personality
    return personality.general[Math.floor(Math.random() * personality.general.length)] + 
      `"${userMessage}" is ${['fascinating', 'intriguing', 'curious', 'unusual'][Math.floor(Math.random() * 4)]}. ` +
      `Let me ${['consult my databases', 'check my circuits', 'search my memory banks'][Math.floor(Math.random() * 3)]}... ` +
      `I ${['conclude', 'calculate', 'determine'][Math.floor(Math.random() * 3)]} that you're ${['brilliant', 'interesting', 'unique'][Math.floor(Math.random() * 3)]}!`;
  };

  const handleSendMessage = async (e, suggestedMessage = '') => {
    e?.preventDefault();
    const messageText = suggestedMessage || inputMessage;
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate bot response
    setTimeout(() => {
      let botResponseContent;
      
      if (activeTab === 'jokes' && (messageText.toLowerCase().includes('joke') || messageText.toLowerCase().includes('laugh'))) {
        // Return a random joke
        botResponseContent = jokesDatabase[Math.floor(Math.random() * jokesDatabase.length)];
      } else {
        // Generate personality-based response
        botResponseContent = generateBotResponse(messageText);
      }

      const botResponse = {
        id: Date.now() + 1,
        content: botResponseContent,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = (message) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`message ${message.sender}`}
      key={message.id}
    >
      <div className="message-avatar">
        {message.sender === 'bot' ? '🤖' : '👤'}
      </div>
      <div className="message-content">
        <ReactMarkdown>{message.content}</ReactMarkdown>
        <span className="message-time">
          {moment(message.timestamp).format('HH:mm')}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className={`chatbot-container ${theme}`}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="chat-trigger"
            onClick={() => setIsOpen(true)}
          >
            <span className="trigger-icon">💬</span>
            <span className="trigger-pulse"></span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="chat-window"
          >
            <div className="chat-header">
              <div className="header-info">
                <div className="bot-avatar">🤖</div>
                <div className="bot-info">
                  <h3>AI Assistant</h3>
                  <span className="bot-status">
                    {botPersonality === 'grok' ? '🤖 Grok Mode' : 
                     botPersonality === 'sarcastic' ? '😏 Sarcastic Mode' : 'Normal Mode'}
                  </span>
                </div>
              </div>
              <div className="header-actions">
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button className="personality-toggle" onClick={() => 
                  setBotPersonality(
                    botPersonality === 'normal' ? 'grok' : 
                    botPersonality === 'grok' ? 'sarcastic' : 'normal'
                  )}>
                  {botPersonality === 'grok' ? '👽' : 
                   botPersonality === 'sarcastic' ? '😏' : '😊'}
                </button>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>
            </div>

            {/* Tabs for different sections */}
            <div className="chat-tabs">
              <button 
                className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                💬 Chat
              </button>
              <button 
                className={`tab-button ${activeTab === 'jokes' ? 'active' : ''}`}
                onClick={() => setActiveTab('jokes')}
              >
                😂 Jokes
              </button>
              <button 
                className={`tab-button ${activeTab === 'fun' ? 'active' : ''}`}
                onClick={() => setActiveTab('fun')}
              >
                🎉 Fun
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(renderMessage)}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="typing-indicator"
                >
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              {showSuggestions && messages.length === 0 && (
                <div className="suggestions">
                  <h4>Quick Questions</h4>
                  <div className="suggestion-grid">
                    {getCurrentSuggestions().map((suggestion, index) => (
                      <motion.button
                        key={index}
                        className="suggestion-btn"
                        onClick={(e) => handleSendMessage(e, suggestion.value)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <div className="input-wrapper">
                <button
                  type="button"
                  className="emoji-trigger"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  😊
                </button>
                <TextareaAutosize
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    activeTab === 'jokes' ? "Ask for a joke..." :
                    activeTab === 'fun' ? "Let's have some fun..." :
                    "Type your message..."
                  }
                  maxRows={4}
                  className="message-input"
                />
                <button
                  type="submit"
                  className={`send-button ${inputMessage.trim() ? 'active' : ''}`}
                  disabled={!inputMessage.trim()}
                >
                  <span>↗️</span>
                </button>
              </div>
              {showEmojis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="emoji-picker"
                >
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(prev => prev + emoji);
                        setShowEmojis(false);
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;