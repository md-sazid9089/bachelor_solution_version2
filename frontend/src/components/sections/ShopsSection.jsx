import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const fetchShops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/shops');
      setShops(res.data);
      setFilteredShops(res.data);
    } catch (err) {
      console.error('Error fetching shops:', err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    const norm = (s) => (s || '').toString().toLowerCase().trim();
    if (norm(selectedCategory) === 'all') {
      setFilteredShops(shops);
    } else {
      setFilteredShops(shops.filter(shop => norm(shop.category) === norm(selectedCategory)));
    }
  }, [selectedCategory, shops]);

  const renderStars = (rating) => {
    const safe = Math.floor(Number(rating) || 0);
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < safe ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const proxied = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      if (u.protocol === 'http:' || u.protocol === 'https:') {
        return `http://localhost:5000/api/proxy/image?url=${encodeURIComponent(url)}`;
      }
      return url;
    } catch {
      return url;
    }
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
          <button className="category-btn" onClick={fetchShops} title="Refresh shops">
            ↻
            <span>Refresh</span>
          </button>
        </motion.div>

        <div className="shops-grid">
          {filteredShops.map((shop, index) => (
            <motion.div
              key={shop._id || shop.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="shop-card"
            >
              <div className="shop-image">
                <img
                  src={proxied(shop.imageUrl || shop.imageURL || 'https://tse1.mm.bing.net/th/id/OIP.xJuUVYr6qz1rtyobV19q7QHaEr?rs=1&pid=ImgDetMain&o=7&rm=3')}
                  alt={shop.name}
                  onError={(e) => { e.currentTarget.src = proxied('https://tse1.mm.bing.net/th/id/OIP.xJuUVYr6qz1rtyobV19q7QHaEr?rs=1&pid=ImgDetMain&o=7&rm=3'); }}
                />
                <div className="shop-category">{shop.category}</div>
              </div>
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