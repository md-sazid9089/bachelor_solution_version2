import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faBed, faBath, faRupeeSign, faFilter } from '@fortawesome/free-solid-svg-icons';

const HousingSection = ({ id, user }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    location: 'all',
    propertyType: 'all'
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max) {
          return property.rent >= min && property.rent <= max;
        } else {
          return property.rent >= min;
        }
      });
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <section id={id} className="section housing-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2> YOUR JOURNEY TO THE RIGHT HOME STARTS HERE </h2>
          <p>Affordable, Comfortable Housing for Students and Professionals</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="filters"
        >
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} />
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">All Price Ranges</option>
              <option value="0-10000">Under ৳10,000</option>
              <option value="10000-15000">৳10,000 - ৳15,000</option>
              <option value="15000-20000">৳15,000 - ৳20,000</option>
              <option value="20000">Above ৳20,000</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="dhanmondi">Dhanmondi</option>
              <option value="uttara">Uttara</option>
              <option value="mirpur">Mirpur</option>
              <option value="banani">Banani</option>
              <option value="mohakhali">Mohakhali</option>
              <option value="gulshan">Gulshan</option>
            </select>

            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Studio">Studio</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="PG">PG</option>
              <option value="Shared">Shared</option>
            </select>
          </div>
        </motion.div>

        <div className="properties-grid">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="property-card"
              onClick={() => setSelectedProperty(property)}
            >
              <div className="property-type">{property.type}</div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <div className="property-details">
                  <div className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{property.location}</span>
                  </div>
                  <div className="specs">
                    <span><FontAwesomeIcon icon={faBed} /> {property.beds}</span>
                    <span><FontAwesomeIcon icon={faBath} /> {property.baths}</span>
                  </div>
                </div>
                <div className="property-footer">
                  <div className="rent">
                    <span>৳{property.rent.toLocaleString()}/month</span>
                  </div>
                  {user ? (
                    <div className="contact">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{property.contact}</span>
                    </div>
                  ) : (
                    <div className="contact-placeholder">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>Login to view contact</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedProperty && (
          <div className="property-modal" onClick={() => setSelectedProperty(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedProperty(null)}>×</button>
              {/* Image removed */}
              <div className="modal-info">
                <h3>{selectedProperty.title}</h3>
                <p>{selectedProperty.description}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <span>৳{selectedProperty.rent.toLocaleString()}/month</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faBed} />
                    <span>{selectedProperty.beds} Bedroom{selectedProperty.beds > 1 ? 's' : ''}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faBath} />
                    <span>{selectedProperty.baths} Bathroom{selectedProperty.baths > 1 ? 's' : ''}</span>
                  </div>
                  {user ? (
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{selectedProperty.contact}</span>
                    </div>
                  ) : (
                    <div className="detail-item login-required">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>Login to view landlord contact</span>
                    </div>
                  )}
                </div>
                {user ? (
                  <button className="contact-owner-btn">Contact Owner</button>
                ) : (
                  <button className="login-required-btn" disabled>
                    Login to Contact Owner
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HousingSection;