import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faCrown, faGift, faHeart } from '@fortawesome/free-solid-svg-icons';

const SubscriptionSection = ({ id, user, isLoggedIn }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedTier, setSelectedTier] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for exploring basic features',
      features: [
        'Browse properties',
        'View shop listings',
        'Basic maid services',
        'Community access',
        'Basic support'
      ],
      limitations: [
        'Limited property views (10/month)',
        'No premium listings',
        'Basic search filters',
        'Community ads'
      ],
      color: 'gray',
      icon: faGift,
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 499, yearly: 4990 },
      description: 'For serious bachelor life optimization',
      features: [
        'Unlimited property browsing',
        'Premium property listings',
        'Advanced search filters',
        'Priority maid bookings',
        'Ad-free experience',
        'Ex-bachelor hacks access',
        'Expense calculator pro',
        'Email support'
      ],
      limitations: [],
      color: 'blue',
      icon: faHeart,
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: { monthly: 999, yearly: 9990 },
      description: 'Ultimate bachelor solution experience',
      features: [
        'Everything in Premium',
        'Personal housing consultant',
        'Verified exclusive properties',
        'Priority customer support',
        'Custom expense reports',
        'Beta feature access',
        'Mobile app access',
        'Property visit scheduling',
        'Negotiation assistance'
      ],
      limitations: [],
      color: 'purple',
      icon: faCrown,
      popular: false
    }
  ];

  const handleSubscribe = (planId) => {
    if (!isLoggedIn) {
      alert('Please login to subscribe to a plan');
      return;
    }
    setSelectedTier(planId);
    // Here you would integrate with payment gateway
    alert(`Redirecting to payment for ${plans.find(p => p.id === planId)?.name} plan...`);
  };

  const getDiscountPercentage = (monthly, yearly) => {
    if (yearly === 0) return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  };

  return (
    <section id={id} className="section subscription-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Choose Your Bachelor Solution Plan</h2>
          <p>Unlock the full potential of bachelor life with our premium features</p>
        </motion.div>

        <div className="plan-toggle">
          <button
            className={`toggle-btn ${selectedPlan === 'monthly' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('monthly')}
          >
            Monthly
          </button>
          <button
            className={`toggle-btn ${selectedPlan === 'yearly' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('yearly')}
          >
            Yearly
            <span className="discount-badge">Save up to 17%</span>
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => {
            const price = plan.price[selectedPlan];
            const discountPercent = getDiscountPercentage(plan.price.monthly, plan.price.yearly);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${plan.color}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <FontAwesomeIcon icon={faHeart} />
                    Most Popular
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-icon">
                    <FontAwesomeIcon icon={plan.icon} />
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="pricing">
                  <div className="price">
                    {price === 0 ? (
                      <span className="price-amount">Free</span>
                    ) : (
                      <>
                        <span className="currency">৳</span>
                        <span className="price-amount">{price.toLocaleString()}</span>
                        <span className="period">/{selectedPlan === 'monthly' ? 'month' : 'year'}</span>
                      </>
                    )}
                  </div>
                  {selectedPlan === 'yearly' && plan.price.yearly > 0 && discountPercent > 0 && (
                    <div className="savings">
                      Save {discountPercent}% yearly
                    </div>
                  )}
                </div>

                <div className="features-list">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="feature-item included">
                      <FontAwesomeIcon icon={faCheck} />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="feature-item excluded">
                      <FontAwesomeIcon icon={faTimes} />
                      <span>{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`subscribe-btn ${plan.color}`}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={selectedTier === plan.id}
                >
                  {selectedTier === plan.id ? 'Processing...' : 
                   plan.id === 'free' ? 'Current Plan' : 
                   `Get ${plan.name}`}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="subscription-benefits">
          <h3>Why Go Premium?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>🏠 Better Housing Options</h4>
              <p>Access exclusive properties and get priority bookings for the best places.</p>
            </div>
            <div className="benefit-item">
              <h4>💰 Save Money</h4>
              <p>Advanced expense tracking and money-saving tips from experienced bachelors.</p>
            </div>
            <div className="benefit-item">
              <h4>⚡ Priority Support</h4>
              <p>Get faster responses and dedicated support for all your bachelor needs.</p>
            </div>
            <div className="benefit-item">
              <h4>🎯 Personalized Experience</h4>
              <p>Customized recommendations based on your preferences and budget.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;