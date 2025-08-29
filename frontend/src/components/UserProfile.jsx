import React, { useState } from 'react';
import UserUpdateForm from './UserUpdateForm';
import axios from 'axios';

const UserProfile = ({ initialUser }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [message, setMessage] = useState('');

  const handleUserUpdate = async (updatedFields) => {
    try {
      const res = await axios.put('http://localhost:3001/api/auth/update', {
        userId: currentUser._id,
        ...updatedFields
      });
      setCurrentUser(res.data.user); // Update state with new user info
      setMessage('User updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {currentUser.name}<br />
        <strong>Email:</strong> {currentUser.email}<br />
        <strong>Phone:</strong> {currentUser.phone}<br />
      </div>
      <UserUpdateForm
        userId={currentUser._id}
        currentUser={currentUser}
        onUpdate={handleUserUpdate}
      />
      {message && <div>{message}</div>}
    </div>
  );
};

export default UserProfile;
