import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faCalendarCheck, 
  faHome, 
  faStore, 
  faUserCog, 
  faStethoscope,
  faLightbulb,
  faSignOutAlt,
  faChartLine,
  faEye,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AdminDashboard = ({ adminUser, adminToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contentStats, setContentStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'content') {
      fetchContentStats();
    }
  }, [activeTab]);

  const apiHeaders = {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: apiHeaders
      });
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: apiHeaders
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/appointments', {
        headers: apiHeaders
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContentStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/content', {
        headers: apiHeaders
      });
      setContentStats(response.data);
    } catch (error) {
      console.error('Error fetching content stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: apiHeaders
        });
        fetchUsers(); // Refresh users list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appointments/${appointmentId}/status`, 
        { status }, 
        { headers: apiHeaders }
      );
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/appointments/${appointmentId}`, {
          headers: apiHeaders
        });
        fetchAppointments(); // Refresh appointments list
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const renderDashboard = () => (
    <div className="admin-dashboard-content">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>System statistics and recent activity</p>
      </div>

      {dashboardStats && (
        <div className="stats-grid">
          <div className="stat-card">
            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.users}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faCalendarCheck} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.appointments}</h3>
              <p>Appointments</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faHome} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.properties}</h3>
              <p>Properties</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faStore} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.shops}</h3>
              <p>Shops</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faUserCog} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.maids}</h3>
              <p>Maids</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faStethoscope} className="stat-icon" />
            <div className="stat-info">
              <h3>{dashboardStats.doctors}</h3>
              <p>Doctors</p>
            </div>
          </div>
        </div>
      )}

      {dashboardStats && (
        <div className="recent-activity">
          <div className="recent-section">
            <h3>Recent Appointments</h3>
            <div className="recent-list">
              {dashboardStats.recentAppointments.map(appointment => (
                <div key={appointment._id} className="recent-item">
                  <div className="recent-info">
                    <strong>{appointment.patientName}</strong>
                    <span>{appointment.doctorName} - {appointment.specialty}</span>
                    <small>{new Date(appointment.appointmentDate).toLocaleDateString()}</small>
                  </div>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-section">
            <h3>Recent Users</h3>
            <div className="recent-list">
              {dashboardStats.recentUsers.map(user => (
                <div key={user._id} className="recent-item">
                  <div className="recent-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <small>Joined {new Date(user.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="admin-users-content">
      <div className="section-header">
        <h2>User Management</h2>
        <p>Manage registered users</p>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="admin-appointments-content">
      <div className="section-header">
        <h2>Appointment Management</h2>
        <p>Manage health appointments</p>
      </div>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.appointmentType}</td>
                <td>
                  <select 
                    value={appointment.status}
                    onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteAppointment(appointment._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="admin-content-content">
      <div className="section-header">
        <h2>Content Management</h2>
        <p>Overview of platform content</p>
      </div>

      {contentStats && (
        <div className="content-stats-grid">
          {Object.entries(contentStats).map(([key, value]) => (
            <div key={key} className="content-stat-card">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <div className="stat-number">{value.count}</div>
              <div className="recent-items">
                <h4>Recent Items:</h4>
                {value.data.slice(0, 3).map(item => (
                  <div key={item._id} className="content-item">
                    <span>{item.title || item.name || item.patientName || 'Untitled'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {adminUser.name}</p>
        </div>

        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FontAwesomeIcon icon={faChartLine} />
            Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FontAwesomeIcon icon={faUsers} />
            Users
          </button>
          <button 
            className={`nav-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            Appointments
          </button>
          <button 
            className={`nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            Content
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>

          <button 
            className="back-to-main-btn"
            onClick={() => window.location.href = '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--primary-600)',
              border: 'none',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginTop: 'var(--space-2)',
              fontSize: '14px',
              width: '100%'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--primary-700)'}
            onMouseOut={(e) => e.target.style.background = 'var(--primary-600)'}
          >
            <FontAwesomeIcon icon={faHome} />
            Back to Main Site
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-left">
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'appointments' && 'Appointments'}
              {activeTab === 'content' && 'Content Management'}
            </h1>
          </div>
          
          <div className="topbar-right">
            <div className="admin-user-info">
              <span className="admin-user-name">{adminUser.name}</span>
              <span className="admin-user-role">Administrator</span>
            </div>
            <button className="topbar-logout-btn" onClick={onLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </div>
        </div>

        <div className="admin-content">{loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'content' && renderContent()}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;