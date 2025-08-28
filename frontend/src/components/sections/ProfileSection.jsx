import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faEdit, faSave, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

const ProfileSection = ({ id, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: "Cozy Studio Apartment",
      location: "Koramangala",
      rent: 12000,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
      id: 2,
      title: "Spacious 2BHK",
      location: "HSR Layout", 
      rent: 18000,
      image: "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg"
    }
  ]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes
      console.log('Saving changes:', editData);
    }
  };

  const handleInputChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const removeSavedProperty = (propertyId) => {
    setSavedProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  return (
    <section id={id} className="section profile-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>My Profile</h2>
          <p>Manage your account and saved preferences</p>
        </motion.div>

        <div className="profile-container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="profile-info-card"
          >
            <div className="profile-header">
              <div className="profile-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="profile-basic">
                <h3>Welcome back, {user?.name || 'User'}!</h3>
                <p>Member since 2024</p>
              </div>
              <button className="edit-profile-btn" onClick={handleEdit}>
                <FontAwesomeIcon icon={isEditing ? faSave : faEdit} />
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="profile-details">
              <div className="detail-group">
                <label>
                  <FontAwesomeIcon icon={faUser} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user?.name || 'Not provided'}</span>
                )}
              </div>

              <div className="detail-group">
                <label>
                  <FontAwesomeIcon icon={faEnvelope} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user?.email || 'Not provided'}</span>
                )}
              </div>

              <div className="detail-group">
                <label>
                  <FontAwesomeIcon icon={faPhone} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user?.phone || 'Not provided'}</span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="saved-properties-card"
          >
            <div className="card-header">
              <h3>
                <FontAwesomeIcon icon={faHeart} />
                Saved Properties
              </h3>
            </div>

            {savedProperties.length > 0 ? (
              <div className="saved-properties-list">
                {savedProperties.map((property) => (
                  <div key={property.id} className="saved-property-item">
                    <img src={property.image} alt={property.title} />
                    <div className="property-info">
                      <h4>{property.title}</h4>
                      <p>{property.location}</p>
                      <span className="rent">₹{property.rent.toLocaleString()}/month</span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeSavedProperty(property.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FontAwesomeIcon icon={faHome} />
                <p>No saved properties yet</p>
                <span>Properties you save will appear here</span>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="profile-stats"
        >
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">Saved Properties</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Property Views</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Contact Made</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1</div>
            <div className="stat-label">Services Booked</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;