import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';

const GetStartedSection = ({ id, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(formData.email)) {
      newErrors.email = 'Email must be a Gmail address (e.g., name@gmail.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 11 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
  const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setShowSuccess(true);
      setIsSubmitting(false);
      // Call parent's onRegister function
      setTimeout(() => {
        onRegister({ name: formData.name, email: formData.email, phone: formData.phone });
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      if (err.response && err.response.data && err.response.data.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  if (showSuccess) {
    return (
      <section id={id} className="section get-started-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="success-message"
          >
            <div className="success-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <h2>Welcome to Bachelor Solution!</h2>
            <p>Your account has been created successfully. You're being redirected to your profile...</p>
            <div className="loading-spinner"></div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="section get-started-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>Get Started Today</h2>
          <p>Join thousands of students and professionals finding their perfect home</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="registration-container"
        >
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group no-leading-icon">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <div className="input-group no-leading-icon">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-group no-leading-icon">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <div className="input-group no-leading-icon">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <div className="input-group no-leading-icon">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" className="terms-link">Terms and Conditions</a> and <a href="#" className="terms-link">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>

            {errors.general && <span className="error-message">{errors.general}</span>}
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner-small"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="benefits-section">
            <h3>Why Join Bachelor Solution?</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Access to verified housing options</span>
              </div>
              <div className="benefit-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Connect with trusted service providers</span>
              </div>
              <div className="benefit-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Save time with smart filters and search</span>
              </div>
              <div className="benefit-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Get personalized recommendations</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStartedSection;