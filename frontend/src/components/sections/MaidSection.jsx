import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faPhone, faStar, faRupeeSign, faClock, faFilter } from '@fortawesome/free-solid-svg-icons';

const MaidSection = ({ id }) => {
  const [maids, setMaids] = useState([]);
  const [filteredMaids, setFilteredMaids] = useState([]);
  const [selectedService, setSelectedService] = useState('all');

  const serviceTypes = [
    { id: 'all', label: 'All Services' },
    { id: 'cleaning', label: 'House Cleaning' },
    { id: 'cooking', label: 'Cooking' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'babysitting', label: 'Baby Sitting' }
  ];

  useEffect(() => {
    // Fetch maids from backend
    axios.get('http://localhost:5000/api/maids')
      .then(res => {
        setMaids(res.data);
        setFilteredMaids(res.data);
      })
      .catch(err => {
        setMaids([]);
        setFilteredMaids([]);
        // Optionally handle error
      });
  }, []);

  useEffect(() => {
    if (selectedService === 'all') {
      setFilteredMaids(maids);
    } else {
      setFilteredMaids(maids.filter(maid => maid.services.includes(selectedService)));
    }
  }, [selectedService, maids]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const getServiceLabels = (services) => {
    return services.map(service => {
      const serviceType = serviceTypes.find(st => st.id === service);
      return serviceType ? serviceType.label : service;
    }).join(', ');
  };

  useEffect(() => {
    // Fetch maid data from backend
    axios.get('http://localhost:5000/api/maids')
      .then(res => {
        setMaids(res.data);
        setFilteredMaids(res.data);
      })
      .catch(() => {
        setMaids([]);
        setFilteredMaids([]);
      });
  }, []);

  return (
    <section id={id} className="section maid-section">
      <div className="container">
        {/* ...existing header and filter code... */}
        <div className="maids-grid">
          {filteredMaids.map((maid, index) => (
            <motion.div
              key={maid._id || maid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="maid-card"
            >
              <div className="maid-rating" style={{marginBottom: '1rem'}}>
                {renderStars(maid.rating)}
                <span>{maid.rating}</span>
              </div>
              <div className="maid-info">
                <h3>{maid.name}</h3>
                <p className="maid-description">{maid.description}</p>
                <div className="maid-details">
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faUserTie} />
                    <span>Services: {getServiceLabels(maid.services)}</span>
                  </div>
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    <span>₹{maid.hourlyRate}/hour</span>
                  </div>
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Experience: {maid.experience}</span>
                  </div>
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{maid.contact}</span>
                  </div>
                </div>
                <div className="availability">
                  <strong>Available:</strong> {maid.availability}
                </div>
                <div className="book-maid-btn" style={{textAlign: 'center', fontWeight: 'bold'}}>
                  Contact: {maid.contact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredMaids.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <p>No service providers found for the selected service type.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MaidSection;