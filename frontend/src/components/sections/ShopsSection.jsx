import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faMapMarkerAlt, faPhone, faStar, faShoppingCart, faPrescriptionBottle, faUtensils, faTshirt } from '@fortawesome/free-solid-svg-icons';

const ShopsSection = ({ id }) => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Shops', icon: faStore },
    { id: 'grocery', label: 'Grocery', icon: faShoppingCart },
    { id: 'pharmacy', label: 'Pharmacy', icon: faPrescriptionBottle },
    { id: 'restaurant', label: 'Restaurants', icon: faUtensils },
    { id: 'clothing', label: 'Clothing', icon: faTshirt }
  ];

  useEffect(() => {
    // Mock data for shops
    const mockShops = [
      {
        id: 1,
        name: "Dhaka Grocery Center",
        category: "grocery",
        distance: "0.2 km",
        rating: 4.5,
        contact: "+880 1711 123456",
        address: "12 Mirpur Road, Dhanmondi",
        hours: "7:00 AM - 11:00 PM"
      },
      {
        id: 2,
        name: "Arogya Pharmacy",
        category: "pharmacy",
        distance: "0.5 km",
        rating: 4.3,
        contact: "+880 1911 654321",
        address: "45 Health Avenue, Uttara",
        hours: "24/7"
      },
      {
        id: 3,
        name: "Bengal Spice Restaurant",
        category: "restaurant",
        distance: "0.3 km",
        rating: 4.7,
        contact: "+880 1811 987654",
        address: "78 Food Street, Banani",
        hours: "11:00 AM - 11:00 PM"
      },
      {
        id: 4,
        name: "Fashion House BD",
        category: "clothing",
        distance: "0.8 km",
        rating: 4.2,
        contact: "+880 1611 112233",
        address: "32 Style Road, Gulshan",
        hours: "10:00 AM - 9:00 PM"
      },
      {
        id: 5,
        name: "Daily Needs Store",
        category: "grocery",
        distance: "1.0 km",
        rating: 4.1,
        contact: "+880 1511 445566",
        address: "65 Market Lane, Mohakhali",
        hours: "7:00 AM - 10:00 PM"
      },
      {
        id: 6,
        name: "Cafe Dhaka",
        category: "restaurant",
        distance: "0.4 km",
        rating: 4.6,
        contact: "+880 1711 778899",
        address: "98 Coffee Lane, Dhanmondi",
        hours: "8:00 AM - 10:00 PM"
      }
    ];
    setShops(mockShops);
    setFilteredShops(mockShops);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredShops(shops);
    } else {
      setFilteredShops(shops.filter(shop => shop.category === selectedCategory));
    }
  }, [selectedCategory, shops]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <section id={id} className="section shops-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>Nearby Shops & Services</h2>
          <p>Everything you need, just around the corner</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="category-filters"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <FontAwesomeIcon icon={category.icon} />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="shops-grid">
          {filteredShops.map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="shop-card"
            >
              <div className="shop-category">{shop.category}</div>
              <div className="shop-info">
                <h3>{shop.name}</h3>
                <div className="shop-rating">
                  {renderStars(shop.rating)}
                  <span className="rating-value">{shop.rating}</span>
                </div>
                <div className="shop-details">
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{shop.distance} away</span>
                  </div>
                  <div className="detail-row">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{shop.contact}</span>
                  </div>
                </div>
                <p className="shop-address">{shop.address}</p>
                <p className="shop-hours">Hours: {shop.hours}</p>
                <button className="contact-shop-btn">Contact Shop</button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <p>No shops found in this category. Try selecting a different category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ShopsSection;