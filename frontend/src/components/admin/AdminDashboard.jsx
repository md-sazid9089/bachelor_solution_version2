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
  faEdit,
  faPlus,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AdminModal from './AdminModal';

const AdminDashboard = ({ adminUser, adminToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [shops, setShops] = useState([]);
  const [maids, setMaids] = useState([]);
  const [hacks, setHacks] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [contentStats, setContentStats] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '', // 'create' or 'edit'
    category: '', // 'users', 'properties', etc.
    data: null
  });
  
  // Form states
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'properties') {
      fetchProperties();
    } else if (activeTab === 'shops') {
      fetchShops();
    } else if (activeTab === 'maids') {
      fetchMaids();
    } else if (activeTab === 'hacks') {
      fetchHacks();
    } else if (activeTab === 'doctors') {
      fetchDoctors();
    } else if (activeTab === 'content') {
      fetchContentStats();
    }
  }, [activeTab]);

  const apiHeaders = {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };

  // Fetch functions
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

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/properties', {
        headers: apiHeaders
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShops = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/shops', {
        headers: apiHeaders
      });
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaids = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/maids', {
        headers: apiHeaders
      });
      setMaids(response.data);
    } catch (error) {
      console.error('Error fetching maids:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/hacks', {
        headers: apiHeaders
      });
      setHacks(response.data);
    } catch (error) {
      console.error('Error fetching hacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/doctors', {
        headers: apiHeaders
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
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

  // Modal functions
  const openModal = (type, category, data = null) => {
    setModalState({ isOpen: true, type, category, data });
    
    if (type === 'edit' && data) {
      setFormData(data);
    } else {
      setFormData(getDefaultFormData(category));
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: '', category: '', data: null });
    setFormData({});
  };

  const getDefaultFormData = (category) => {
    switch (category) {
      case 'users':
        return { name: '', email: '', password: '' };
      case 'properties':
        return { name: '', location: '', rent: '', contact: '', description: '' };
      case 'shops':
        return { name: '', category: '', location: '', description: '', image: '', contact: '' };
      case 'maids':
        return { name: '', experience: '', location: '', hourlyRate: '', contact: '', description: '' };
      case 'hacks':
        return { title: '', content: '', category: '', authorName: '' };
      case 'doctors':
        return { name: '', specialty: '', experience: '', location: '', contact: '', doctorId: '' };
      case 'appointments':
        return { patientName: '', doctorName: '', doctorId: '', specialty: '', appointmentDate: '', appointmentType: '', status: 'pending' };
      default:
        return {};
    }
  };

  // CRUD operations
  const handleCreate = async () => {
    try {
      const endpoint = `http://localhost:5000/api/admin/${modalState.category}`;
      await axios.post(endpoint, formData, { headers: apiHeaders });
      
      // Refresh data
      refreshData();
      closeModal();
      alert('Created successfully!');
    } catch (error) {
      console.error('Error creating:', error);
      alert('Error creating item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdate = async () => {
    try {
      const endpoint = `http://localhost:5000/api/admin/${modalState.category}/${modalState.data._id}`;
      await axios.put(endpoint, formData, { headers: apiHeaders });
      
      // Refresh data
      refreshData();
      closeModal();
      alert('Updated successfully!');
    } catch (error) {
      console.error('Error updating:', error);
      alert('Error updating item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (category, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const endpoint = `http://localhost:5000/api/admin/${category}/${id}`;
        await axios.delete(endpoint, { headers: apiHeaders });
        
        // Refresh data
        refreshData();
        alert('Deleted successfully!');
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting item: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const refreshData = () => {
    if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'appointments') fetchAppointments();
    else if (activeTab === 'properties') fetchProperties();
    else if (activeTab === 'shops') fetchShops();
    else if (activeTab === 'maids') fetchMaids();
    else if (activeTab === 'hacks') fetchHacks();
    else if (activeTab === 'doctors') fetchDoctors();
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

  // Form component
  const renderForm = () => {
    const { category, type } = modalState;
    
    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (type === 'create') {
        handleCreate();
      } else if (type === 'edit') {
        handleUpdate();
      }
    };

    const renderFormFields = () => {
      switch (category) {
        case 'users':
          return (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              {type === 'create' && (
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          );
        
        case 'properties':
          return (
            <>
              <div className="form-group">
                <label>Property Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rent</label>
                <input
                  type="text"
                  value={formData.rent || ''}
                  onChange={(e) => handleInputChange('rent', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                />
              </div>
            </>
          );

        case 'shops':
          return (
            <>
              <div className="form-group">
                <label>Shop Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                />
              </div>
            </>
          );

        case 'maids':
          return (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Hourly Rate</label>
                <input
                  type="text"
                  value={formData.hourlyRate || ''}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                />
              </div>
            </>
          );

        case 'hacks':
          return (
            <>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Study">Study</option>
                  <option value="Life">Life</option>
                  <option value="Food">Food</option>
                  <option value="Finance">Finance</option>
                  <option value="Social">Social</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="form-group">
                <label>Author Name</label>
                <input
                  type="text"
                  value={formData.authorName || ''}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows="4"
                  required
                />
              </div>
            </>
          );

        case 'doctors':
          return (
            <>
              <div className="form-group">
                <label>Doctor ID</label>
                <input
                  type="text"
                  value={formData.doctorId || ''}
                  onChange={(e) => handleInputChange('doctorId', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  value={formData.specialty || ''}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
              </div>
            </>
          );

        case 'appointments':
          return (
            <>
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName || ''}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  value={formData.doctorName || ''}
                  onChange={(e) => handleInputChange('doctorName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Doctor ID</label>
                <input
                  type="text"
                  value={formData.doctorId || ''}
                  onChange={(e) => handleInputChange('doctorId', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  value={formData.specialty || ''}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Date</label>
                <input
                  type="datetime-local"
                  value={formData.appointmentDate || ''}
                  onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Type</label>
                <select
                  value={formData.appointmentType || ''}
                  onChange={(e) => handleInputChange('appointmentType', e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="consultation">Consultation</option>
                  <option value="telemedicine">Telemedicine</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status || 'pending'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </>
          );

        default:
          return null;
      }
    };

    return (
      <form onSubmit={handleSubmit} className="admin-form">
        {renderFormFields()}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <FontAwesomeIcon icon={faSave} />
            {type === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    );
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
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'users')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add User
        </button>
      </div>

      <div className="data-table">
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
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'users', user)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('users', user._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
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
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'appointments')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Appointment
        </button>
      </div>

      <div className="data-table">
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
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'appointments', appointment)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('appointments', appointment._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="admin-properties-content">
      <div className="section-header">
        <h2>Property Management</h2>
        <p>Manage housing properties</p>
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'properties')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Property
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id}>
                <td>{property.name}</td>
                <td>{property.location}</td>
                <td>{property.rent}</td>
                <td>{property.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'properties', property)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('properties', property._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderShops = () => (
    <div className="admin-shops-content">
      <div className="section-header">
        <h2>Shop Management</h2>
        <p>Manage local shops</p>
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'shops')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Shop
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map(shop => (
              <tr key={shop._id}>
                <td>{shop.name}</td>
                <td>{shop.category}</td>
                <td>{shop.location}</td>
                <td>{shop.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'shops', shop)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('shops', shop._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMaids = () => (
    <div className="admin-maids-content">
      <div className="section-header">
        <h2>Maid Management</h2>
        <p>Manage domestic helpers</p>
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'maids')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Maid
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Rate/Hour</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maids.map(maid => (
              <tr key={maid._id}>
                <td>{maid.name}</td>
                <td>{maid.experience}</td>
                <td>{maid.location}</td>
                <td>{maid.hourlyRate}</td>
                <td>{maid.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'maids', maid)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('maids', maid._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHacks = () => (
    <div className="admin-hacks-content">
      <div className="section-header">
        <h2>Hack Management</h2>
        <p>Manage bachelor life hacks</p>
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'hacks')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Hack
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hacks.map(hack => (
              <tr key={hack._id}>
                <td>{hack.title}</td>
                <td>{hack.category}</td>
                <td>{hack.authorName}</td>
                <td>{new Date(hack.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'hacks', hack)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('hacks', hack._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="admin-doctors-content">
      <div className="section-header">
        <h2>Doctor Management</h2>
        <p>Manage healthcare providers</p>
        <button 
          className="btn-primary add-btn"
          onClick={() => openModal('create', 'doctors')}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Doctor
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor._id}>
                <td>{doctor.doctorId}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.location}</td>
                <td>{doctor.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => openModal('edit', 'doctors', doctor)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDelete('doctors', doctor._id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
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
            className={`nav-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <FontAwesomeIcon icon={faHome} />
            Properties
          </button>
          <button 
            className={`nav-btn ${activeTab === 'shops' ? 'active' : ''}`}
            onClick={() => setActiveTab('shops')}
          >
            <FontAwesomeIcon icon={faStore} />
            Shops
          </button>
          <button 
            className={`nav-btn ${activeTab === 'maids' ? 'active' : ''}`}
            onClick={() => setActiveTab('maids')}
          >
            <FontAwesomeIcon icon={faUserCog} />
            Maids
          </button>
          <button 
            className={`nav-btn ${activeTab === 'hacks' ? 'active' : ''}`}
            onClick={() => setActiveTab('hacks')}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            Hacks
          </button>
          <button 
            className={`nav-btn ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <FontAwesomeIcon icon={faStethoscope} />
            Doctors
          </button>
          <button 
            className={`nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <FontAwesomeIcon icon={faEye} />
            Overview
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
              {activeTab === 'appointments' && 'Appointment Management'}
              {activeTab === 'properties' && 'Property Management'}
              {activeTab === 'shops' && 'Shop Management'}
              {activeTab === 'maids' && 'Maid Management'}
              {activeTab === 'hacks' && 'Hack Management'}
              {activeTab === 'doctors' && 'Doctor Management'}
              {activeTab === 'content' && 'Content Overview'}
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
            {activeTab === 'properties' && renderProperties()}
            {activeTab === 'shops' && renderShops()}
            {activeTab === 'maids' && renderMaids()}
            {activeTab === 'hacks' && renderHacks()}
            {activeTab === 'doctors' && renderDoctors()}
            {activeTab === 'content' && renderContent()}
          </>
        )}
        </div>
      </div>

      {/* Modal for CRUD operations */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={`${modalState.type === 'create' ? 'Add' : 'Edit'} ${modalState.category?.slice(0, -1) || ''}`}
      >
        {renderForm()}
      </AdminModal>
    </div>
  );
};

export default AdminDashboard;