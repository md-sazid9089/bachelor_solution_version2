import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faFacebook, url: '#', label: 'Facebook' },
    { icon: faTwitter, url: '#', label: 'Twitter' },
    { icon: faInstagram, url: '#', label: 'Instagram' },
    { icon: faLinkedin, url: '#', label: 'LinkedIn' },
    { icon: faYoutube, url: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'About Us', url: '#' },
    { label: 'How It Works', url: '#' },
    { label: 'Pricing', url: '#' },
    { label: 'FAQ', url: '#' },
    { label: 'Blog', url: '#' },
    { label: 'Careers', url: '#' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' },
    { label: 'Cookie Policy', url: '#' },
    { label: 'Refund Policy', url: '#' }
  ];

  const services = [
    { label: 'Housing Finder', url: '#housing' },
    { label: 'Shop Directory', url: '#shops' },
    { label: 'Maid Services', url: '#maid' },
    { label: 'Location Maps', url: '#map' },
    { label: 'Expense Calculator', url: '#expense-calculator' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <h3>Bachelor Solution</h3>
                <p>Your one-stop solution for student and bachelor living needs</p>
              </div>
              <div className="footer-contact-info">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>Harun Mansion,Mogbazar,Dhaka</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>+88 01645016880</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>mdsazid9089@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4>Our Services</h4>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href={service.url}>{service.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-section">
              <h4>Legal</h4>
              <ul className="footer-links">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4>Stay Updated</h4>
              <p>Subscribe to get the latest updates and offers</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  Subscribe
                </button>
              </div>
              <div className="social-links">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} Bachelor Solution. All rights reserved. 
                Made for students and bachelors.
              </p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#cookies">Cookies</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;