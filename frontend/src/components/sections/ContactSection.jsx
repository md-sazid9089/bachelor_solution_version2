import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faClock, 
  faMapMarkerAlt,
  faComments,
  faPaperPlane,
  faUser,
  faRobot,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ContactSection = ({ id }) => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Bachelor Solution assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const contactMethods = [
    {
      icon: faPhone,
      title: 'Phone Support',
      primary: '+880 1711 123456',
      secondary: '+880 1911 654321',
      description: 'Call us for immediate assistance in Bangladesh'
    },
    {
      icon: faEnvelope,
      title: 'Email Support',
      primary: 'support@bachelorsolution.com.bd',
      secondary: 'info@bachelorsolution.com.bd',
      description: 'Send us your queries anytime'
    },
    {
      icon: faClock,
      title: 'Business Hours',
      primary: 'Sat - Thu: 9:00 AM - 8:00 PM',
      secondary: 'Friday: 10:00 AM - 6:00 PM',
      description: 'We respond within 2-4 hours'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Office Location',
      primary: 'Dhanmondi, Dhaka',
      secondary: 'Dhaka, Bangladesh - 1209',
      description: 'Visit us for in-person support'
    }
  ];

  const quickResponses = [
    "How do I find housing?",
    "What services do you offer?",
    "How to register?",
    "Pricing information",
    "Technical support"
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(newMessage);
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('housing') || lowerMessage.includes('property')) {
      return "I can help you find housing! We have various options including PGs, shared apartments, and studio flats. You can browse our housing section or contact our team for personalized recommendations.";
    } else if (lowerMessage.includes('register') || lowerMessage.includes('signup')) {
      return "Registration is easy! Just scroll to our 'Get Started' section and fill out the form with your details. You'll get access to save properties and contact owners directly.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our platform is free to use! Property prices vary by location and type. You can filter by your budget in the housing section. For premium features, contact our team.";
    } else if (lowerMessage.includes('maid') || lowerMessage.includes('service')) {
      return "We connect you with verified domestic help services including cleaning, cooking, and laundry. Check our Maid section to browse available services and their rates.";
    } else if (lowerMessage.includes('shop') || lowerMessage.includes('store')) {
      return "Our platform lists nearby essential shops including groceries, pharmacies, and restaurants. Use the location filter to find services near your area.";
    } else {
  return "Thanks for your message! For detailed assistance, please contact our support team at +880 1711 123456 or support@bachelorsolution.com.bd. We're here to help!";
    }
  };

  const handleQuickResponse = (response) => {
    setNewMessage(response);
  };

  return (
    <section id={id} className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>Get in Touch</h2>
          <p>We're here to help you find your perfect home and services</p>
        </motion.div>

        <div className="contact-methods-grid">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="contact-method-card"
            >
              <div className="contact-icon">
                <FontAwesomeIcon icon={method.icon} />
              </div>
              <div className="contact-details">
                <h3>{method.title}</h3>
                <div className="contact-primary">{method.primary}</div>
                <div className="contact-secondary">{method.secondary}</div>
                <p>{method.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chatbot Toggle Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="chatbot-toggle"
          onClick={() => setChatbotOpen(!chatbotOpen)}
        >
          <FontAwesomeIcon icon={chatbotOpen ? faTimes : faComments} />
        </motion.button>

        {/* Chatbot Modal */}
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="chatbot-modal"
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <span>Bachelor Solution Assistant</span>
              </div>
              <button 
                className="chatbot-close"
                onClick={() => setChatbotOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="chatbot-messages">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-avatar">
                    <FontAwesomeIcon icon={message.sender === 'user' ? faUser : faRobot} />
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString('en-BD', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-responses">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  className="quick-response-btn"
                  onClick={() => handleQuickResponse(response)}
                >
                  {response}
                </button>
              ))}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;