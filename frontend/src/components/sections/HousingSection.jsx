import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faBed, faBath, faRupeeSign, faFilter } from '@fortawesome/free-solid-svg-icons';

const HousingSection = ({ id }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    location: 'all',
    propertyType: 'all'
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    // Mock data for properties
    const mockProperties = [
      {
        id: 1,
        title: "Cozy Studio Apartment",
        rent: 12000,
        location: "Koramangala",
        type: "Studio",
        beds: 1,
        baths: 1,
        contact: "+91 98765 43210",
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        description: "Perfect for students and working professionals. Fully furnished with modern amenities."
      },
      {
        id: 2,
        title: "Spacious 2BHK",
        rent: 18000,
        location: "HSR Layout",
        type: "2BHK",
        beds: 2,
        baths: 2,
        contact: "+91 87654 32109",
        images: ["https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg"],
        description: "Ideal for sharing with roommates. Close to IT parks and metro station."
      },
      {
        id: 3,
        title: "Budget-Friendly PG",
        rent: 8000,
        location: "Marathahalli",
        type: "PG",
        beds: 1,
        baths: 1,
        contact: "+91 76543 21098",
        images: ["https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg"],
        description: "Affordable accommodation with meals included. Great for students."
      },
      {
        id: 4,
        title: "Luxury 1BHK",
        rent: 15000,
        location: "Indiranagar",
        type: "1BHK",
        beds: 1,
        baths: 1,
        contact: "+91 65432 10987",
        images: ["https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg"],
        description: "Modern apartment with premium furnishing and amenities."
      },
      {
        id: 5,
        title: "Shared Accommodation",
        rent: 10000,
        location: "Electronic City",
        type: "Shared",
        beds: 1,
        baths: 1,
        contact: "+91 54321 09876",
        images: ["https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg"],
        description: "Great for professionals working in Electronic City. Fully equipped kitchen."
      },
      {
        id: 6,
        title: "Comfortable 3BHK",
        rent: 25000,
        location: "Whitefield",
        type: "3BHK",
        beds: 3,
        baths: 2,
        contact: "+91 43210 98765",
        images: ["https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg"],
        description: "Perfect for families or groups. Spacious rooms with balcony views."
      }
    ];
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
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
          <h2>Find Your Perfect Home</h2>
          <p>Discover comfortable and affordable housing options for students and professionals</p>
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
              <option value="0-10000">Under ₹10,000</option>
              <option value="10000-15000">₹10,000 - ₹15,000</option>
              <option value="15000-20000">₹15,000 - ₹20,000</option>
              <option value="20000">Above ₹20,000</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="koramangala">Koramangala</option>
              <option value="hsr">HSR Layout</option>
              <option value="marathahalli">Marathahalli</option>
              <option value="indiranagar">Indiranagar</option>
              <option value="electronic city">Electronic City</option>
              <option value="whitefield">Whitefield</option>
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
                    <FontAwesomeIcon icon={faRupeeSign} />
                    <span>{property.rent.toLocaleString()}/month</span>
                  </div>
                  <div className="contact">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{property.contact}</span>
                  </div>
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
                    <FontAwesomeIcon icon={faRupeeSign} />
                    <span>₹{selectedProperty.rent.toLocaleString()}/month</span>
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
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{selectedProperty.contact}</span>
                  </div>
                </div>
                <button className="contact-owner-btn">Contact Owner</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HousingSection;