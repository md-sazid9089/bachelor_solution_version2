import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faTimes, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContact = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-contact">
      {/* Floating Contact Button */}
      <motion.button
        className="floating-contact-btn"
        onClick={toggleContact}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faComments} />
        )}
      </motion.button>

      {/* Contact Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-contact-panel"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="contact-panel-header">
              <div className="header-content">
                <FontAwesomeIcon icon={faHeadset} className="header-icon" />
                <div>
                  <h3>Need Help?</h3>
                  <p>We're here to assist you!</p>
                </div>
              </div>
            </div>

            <div className="contact-panel-body">
              <div className="contact-options">
                <motion.a
                  href="tel:+8801712345678"
                  className="contact-option"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="option-icon phone">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="option-content">
                    <h4>Call Us</h4>
                    <p>+880 171 234 5678</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:support@bachelorsolution.com"
                  className="contact-option"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="option-icon email">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="option-content">
                    <h4>Email Us</h4>
                    <p>support@bachelorsolution.com</p>
                  </div>
                </motion.a>

                <div className="contact-option">
                  <div className="option-icon location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="option-content">
                    <h4>Visit Us</h4>
                    <p>Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="contact-option">
                  <div className="option-icon hours">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="option-content">
                    <h4>Business Hours</h4>
                    <p>9 AM - 9 PM (Daily)</p>
                  </div>
                </div>
              </div>

              <div className="quick-message">
                <h4>Send Quick Message</h4>
                <textarea 
                  placeholder="Type your message here..."
                  rows="3"
                  className="message-input"
                />
                <motion.button
                  className="send-message-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </div>

            <div className="contact-panel-footer">
              <p>We typically respond within 5 minutes</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContact;