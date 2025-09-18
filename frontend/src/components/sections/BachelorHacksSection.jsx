import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFire, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'money', label: 'Money Saving' },
  { id: 'dating', label: 'Dating' },
  { id: 'moving', label: 'Moving Out' },
  { id: 'general', label: 'General' },
];

const BachelorHacksSection = ({ id, user }) => {
  const [hacks, setHacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general' });
  const [submitting, setSubmitting] = useState(false);

  const fetchHacks = async (category = selectedCategory) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/hacks${category && category !== 'all' ? `?category=${category}` : ''}`);
      setHacks(res.data);
    } catch (err) {
      console.error('Failed to load hacks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHacks(); }, []); // initial load
  useEffect(() => { fetchHacks(selectedCategory); }, [selectedCategory]);

  const handleLike = async (hackId) => {
    if (!user) return; // must be logged in
    try {
      const res = await axios.post(`http://localhost:5000/api/hacks/${hackId}/like`, { userIdentifier: user.email });
      setHacks(prev => prev.map(h => h._id === hackId ? res.data : h));
    } catch (err) {
      console.error('Error liking hack');
    }
  };

  const toggleForm = () => setFormOpen(o => !o);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.title.trim() || !formData.content.trim()) return;
    setSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/hacks', {
        ...formData,
        authorName: user.name || 'Anonymous'
      });
      setHacks(prev => [res.data, ...prev]);
      setFormData({ title: '', content: '', category: 'general' });
      setFormOpen(false);
    } catch (err) {
      console.error('Failed to submit hack');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={id} className="section hacks-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Ex-Bachelor Hacks</h2>
          <p>Real shortcuts from people who "graduated" bachelor life — cooking, saving money, dating, moving out.</p>
        </motion.div>

        <div className="hacks-toolbar">
          <div className="categories">
            {categories.map(c => (
              <button
                key={c.id}
                className={`category-btn ${selectedCategory === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          {user && (
            <button className="add-hack-btn" onClick={toggleForm}>
              {formOpen ? 'Cancel' : 'Share a Hack'}
            </button>
          )}
        </div>

        {formOpen && user && (
          <form className="hack-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.filter(c=>c.id!=='all').map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <textarea
              placeholder="Your hack (what saved you time/money?)"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              rows={4}
            />
            <button type="submit" disabled={submitting}>{submitting ? 'Posting...' : 'Post Hack'}</button>
          </form>
        )}

        {loading ? (
          <div>Loading hacks...</div>
        ) : hacks.length === 0 ? (
          <div className="empty-state">No hacks yet. {user ? 'Be the first to share one!' : 'Login to share yours.'}</div>
        ) : (
          <div className="hacks-list">
            {hacks.map(hack => {
              const liked = user && hack.likes.includes(user.email);
              return (
                <motion.div
                  key={hack._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hack-card"
                >
                  <div className="hack-card-header">
                    <h3>{hack.title}</h3>
                    <span className="hack-category">{hack.category}</span>
                  </div>
                  <p className="hack-content">{hack.content}</p>
                  <div className="hack-meta">
                    <span className="author">By {hack.authorName}</span>
                    <button className={`like-btn ${liked ? 'liked' : ''}`} disabled={!user} onClick={() => handleLike(hack._id)}>
                      <FontAwesomeIcon icon={faHeart} /> {hack.likes.length}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BachelorHacksSection;
