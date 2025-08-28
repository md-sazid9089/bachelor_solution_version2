import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faDirections } from '@fortawesome/free-solid-svg-icons';

const MapSection = ({ id }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const popularLocations = [
    { name: 'Koramangala', coords: '12.9279, 77.6271' },
    { name: 'HSR Layout', coords: '12.9081, 77.6476' },
    { name: 'Marathahalli', coords: '12.9593, 77.6977' },
    { name: 'Indiranagar', coords: '12.9719, 77.6412' },
    { name: 'Electronic City', coords: '12.8390, 77.6772' },
    { name: 'Whitefield', coords: '12.9698, 77.7500' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedLocation(searchQuery);
      // In a real app, this would integrate with Google Maps API
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location.name);
    setSearchQuery(location.name);
  };

  return (
    <section id={id} className="section map-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>Explore Locations</h2>
          <p>Find the perfect area for your needs with our interactive map</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="map-controls"
        >
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </div>
          </form>

          <div className="popular-locations">
            <h4>Popular Areas:</h4>
            <div className="location-buttons">
              {popularLocations.map((location) => (
                <button
                  key={location.name}
                  className={`location-btn ${selectedLocation === location.name ? 'active' : ''}`}
                  onClick={() => handleLocationClick(location)}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{location.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="map-container"
        >
          <div className="map-placeholder">
            <div className="map-overlay">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <h3>Interactive Map</h3>
              <p>
                {selectedLocation 
                  ? `Showing results for: ${selectedLocation}`
                  : 'Select a location or search to explore the area'
                }
              </p>
              <div className="map-features">
                <div className="feature">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>Housing Options</span>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faDirections} />
                  <span>Nearby Services</span>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faSearch} />
                  <span>Public Transport</span>
                </div>
              </div>
              <div className="map-note">
                <p><strong>Note:</strong> This is a demo version. In the full version, this would display an interactive Google Map with real location data, property markers, and service locations.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="location-info"
          >
            <div className="info-cards">
              <div className="info-card">
                <h4>Properties Available</h4>
                <div className="info-number">15+</div>
                <p>Houses and PGs in {selectedLocation}</p>
              </div>
              <div className="info-card">
                <h4>Nearby Shops</h4>
                <div className="info-number">25+</div>
                <p>Essential services within 2km</p>
              </div>
              <div className="info-card">
                <h4>Transport</h4>
                <div className="info-number">Good</div>
                <p>Public transport connectivity</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MapSection;