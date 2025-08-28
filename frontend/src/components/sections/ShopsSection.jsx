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
        name: "Fresh Mart Grocery",
        category: "grocery",
        distance: "0.2 km",
        rating: 4.5,
        contact: "+91 98765 43210",
        address: "123 Main Street, Koramangala",
        hours: "6:00 AM - 11:00 PM",
        image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
      },
      {
        id: 2,
        name: "MedPlus Pharmacy",
        category: "pharmacy",
        distance: "0.5 km",
        rating: 4.3,
        contact: "+91 87654 32109",
        address: "456 Health Street, HSR Layout",
        hours: "24/7",
        image: "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg"
      },
      {
        id: 3,
        name: "Spice Garden Restaurant",
        category: "restaurant",
        distance: "0.3 km",
        rating: 4.7,
        contact: "+91 76543 21098",
        address: "789 Food Court, Indiranagar",
        hours: "11:00 AM - 11:00 PM",
        image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
      },
      {
        id: 4,
        name: "StyleZone Fashion",
        category: "clothing",
        distance: "0.8 km",
        rating: 4.2,
        contact: "+91 65432 10987",
        address: "321 Fashion Street, Marathahalli",
        hours: "10:00 AM - 9:00 PM",
        image: "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg"
      },
      {
        id: 5,
        name: "Daily Needs Store",
        category: "grocery",
        distance: "1.0 km",
        rating: 4.1,
        contact: "+91 54321 09876",
        address: "654 Market Road, Electronic City",
        hours: "7:00 AM - 10:00 PM",
        image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
      },
      {
        id: 6,
        name: "Cafe Delight",
        category: "restaurant",
        distance: "0.4 km",
        rating: 4.6,
        contact: "+91 43210 98765",
        address: "987 Coffee Lane, Whitefield",
        hours: "8:00 AM - 10:00 PM",
        image: "https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
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
              className={category-btn ${selectedCategory === category.id ? 'active' : ''}}
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
              <div className="shop-image">
                <img src={shop.image} alt={shop.name} />
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