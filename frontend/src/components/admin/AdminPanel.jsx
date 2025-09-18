import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPanel = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      setAdminToken(token);
      setAdminUser(JSON.parse(user));
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogin = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setAdminToken(null);
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="admin-panel-wrapper">
      {isAdminLoggedIn ? (
        <AdminDashboard 
          adminUser={adminUser}
          adminToken={adminToken}
          onLogout={handleAdminLogout}
        />
      ) : (
        <AdminLogin onAdminLogin={handleAdminLogin} />
      )}
    </div>
  );
};

export default AdminPanel;