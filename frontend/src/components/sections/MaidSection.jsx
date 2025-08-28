import React, { useState, useEffect } from 'react';
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
    // Mock data for maid services
    const mockMaids = [
      {
        id: 1,
        name: "Priya Sharma",
        services: ["cleaning", "laundry"],
        hourlyRate: 150,
        rating: 4.8,
        contact: "+91 98765 43210",
        experience: "5 years",
        availability: "Mon-Sat, 9 AM - 6 PM",
        description: "Experienced in maintaining clean and organized homes. Punctual and trustworthy.",
        image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
      },
      {
        id: 2,
        name: "Lakshmi Devi",
        services: ["cooking", "cleaning"],
        hourlyRate: 200,
        rating: 4.9,
        contact: "+91 87654 32109",
        experience: "8 years",
        availability: "Daily, 7 AM - 2 PM",
        description: "Expert cook specializing in South Indian cuisine. Also provides cleaning services.",
        image: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg"
      },
      {
        id: 3,
        name: "Sunita Kumari",
        services: ["babysitting", "cleaning"],
        hourlyRate: 180,
        rating: 4.6,
        contact: "+91 76543 21098",
        experience: "3 years",
        availability: "Flexible timings",
        description: "Caring and responsible babysitter with experience in child care and light housekeeping.",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
      },
      {
        id: 4,
        name: "Meera Patel",
        services: ["laundry", "cleaning"],
        hourlyRate: 120,
        rating: 4.4,
        contact: "+91 65432 10987",
        experience: "4 years",
        availability: "Tue-Sun, 10 AM - 5 PM",
        description: "Thorough cleaning and laundry services with attention to detail.",
        image: "https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg"
      },
      {
        id: 5,
        name: "Radha Krishna",
        services: ["cooking"],
        hourlyRate: 250,
        rating: 4.7,
        contact: "+91 54321 09876",
        experience: "10 years",
        availability: "Daily, 6 AM - 12 PM",
        description: "Professional cook with expertise in multiple cuisines. Maintains kitchen hygiene.",
        image: "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg"
      },
      {
        id: 6,
        name: "Anjali Singh",
        services: ["cleaning", "laundry", "cooking"],
        hourlyRate: 220,
        rating: 4.5,
        contact: "+91 43210 98765",
        experience: "6 years",
        availability: "Mon-Fri, 8 AM - 4 PM",
        description: "All-round domestic help with experience in various household tasks.",
        image: "https://images.pexels.com/photos/1181689/pexels-photo-1181689.jpeg"
      }
    ];
    setMaids(mockMaids);
    setFilteredMaids(mockMaids);
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

  return (
    <section id={id} className="section maid-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>Domestic Help Services</h2>
          <p>Reliable and professional domestic help for your daily needs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="service-filters"
        >
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {serviceTypes.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="maids-grid">
          {filteredMaids.map((maid, index) => (
            <motion.div
              key={maid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="maid-card"
            >
              <div className="maid-image">
                <img src={maid.image} alt={maid.name} />
                <div className="maid-rating">
                  {renderStars(maid.rating)}
                  <span>{maid.rating}</span>
                </div>
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

                <button className="book-maid-btn">Book Service</button>
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