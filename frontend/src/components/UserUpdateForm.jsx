import React, { useState } from 'react';
import axios from 'axios';

const UserUpdateForm = ({ userId, currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3001/api/auth/update', {
        userId,
        ...formData
      });
      setMessage('User updated successfully!');
      // Optionally update UI with new user info
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="New Password" type="password" />
      <button type="submit">Update</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default UserUpdateForm;
