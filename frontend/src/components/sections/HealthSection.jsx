import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, 
  faCalendarPlus, 
  faVideo, 
  faStethoscope, 
  faUserMd,
  faMapMarkerAlt,
  faClock,
  faPhone,
  faEnvelope,
  faExternalLinkAlt 
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HealthSection = ({ id, user }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [bookingId, setBookingId] = useState('');
  
  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    patientPhone: '',
    doctorId: '',
    doctorName: '',
    specialty: 'general',
    appointmentType: 'in-person',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    notes: ''
  });

  useEffect(() => {
    fetchDoctors();
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDoctorById = async (uniqueId) => {
    try {
      const response = await axios.get(http://localhost:5000/api/health/doctors/${uniqueId});
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor by ID:', error);
      return null;
    }
  };

  const handleDoctorIdChange = async (e) => {
    const doctorId = e.target.value;
    setAppointmentForm({...appointmentForm, doctorId: doctorId, doctorName: ''});
    
    if (doctorId.trim()) {
      const doctor = await fetchDoctorById(doctorId);
      if (doctor) {
        setAppointmentForm({
          ...appointmentForm, 
          doctorId: doctorId,
          doctorName: doctor.name,
          specialty: doctor.specialty
        });
      } else {
        alert('Doctor not found with this ID. Please check the ID and try again.');
      }
    }
  };

  // Generate unique booking ID
  const generateBookingId = () => {
    const prefix = 'APT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return ${prefix}${timestamp}${random};
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setBookingId('');
    
    try {
      const bookingReference = generateBookingId();
      const appointmentData = {
        ...appointmentForm,
        userId: user?._id,
        bookingId: bookingReference
      };
      
      await axios.post('http://localhost:5000/api/health/appointments', appointmentData);
      
      setBookingId(bookingReference);
      setSuccessMessage('Appointment booked successfully!');
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setBookingId('');
      }, 10000);
      
      // Clear form fields
      setAppointmentForm({
        ...appointmentForm,
        doctorId: '',
        doctorName: '',
        specialty: 'general',
        appointmentDate: '',
        appointmentTime: '',
        symptoms: '',
        notes: ''
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMeet = () => {
    window.open('https://meet.google.com/new', '_blank');
  };

  return (
    <section id={id} className="health-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>
            <FontAwesomeIcon icon={faHeartbeat} className="section-icon" />
            Bachelor Health Mode
          </h2>
          <p>Your complete health companion for solo living - appointments and telemedicine</p>
        </motion.div>

        <div className="health-tabs">
          <button
            className={tab-btn ${activeTab === 'appointments' ? 'active' : ''}}
            onClick={() => setActiveTab('appointments')}
          >
            <FontAwesomeIcon icon={faCalendarPlus} />
            Appointments
          </button>
          <button
            className={tab-btn ${activeTab === 'telemedicine' ? 'active' : ''}}
            onClick={() => setActiveTab('telemedicine')}
          >
            <FontAwesomeIcon icon={faVideo} />
            Telemedicine
          </button>
        </div>

        {activeTab === 'appointments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="appointments-content"
          >
            <div className="content-grid">
              <div className="appointment-form-section">
                <h3>Book an Appointment</h3>
                
                {successMessage && bookingId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-message"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      textAlign: 'center',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <FontAwesomeIcon icon={faCalendarPlus} style={{ fontSize: '24px', marginBottom: '10px' }} />
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{successMessage}</h4>
                    <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                      Booking ID: <span style={{ 
                        background: 'rgba(255, 255, 255, 0.2)', 
                        padding: '4px 8px', 
                        borderRadius: '6px',
                        letterSpacing: '1px'
                      }}>{bookingId}</span>
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
                      Please save this booking ID for your records
                    </p>
                  </motion.div>
                )}
                
                <form onSubmit={handleAppointmentSubmit} className="appointment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Patient Name</label>
                      <input
                        type="text"
                        value={appointmentForm.patientName}
                        onChange={(e) => setAppointmentForm({...appointmentForm, patientName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={appointmentForm.patientEmail}
                        onChange={(e) => setAppointmentForm({...appointmentForm, patientEmail: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Doctor ID (Unique ID)</label>
                      <input
                        type="text"
                        value={appointmentForm.doctorId}
                        onChange={handleDoctorIdChange}
                        placeholder="Enter doctor's unique ID (e.g., DOC001SJ)"
                        required
                      />
                      <small style={{color: '#666', fontSize: '12px'}}>
                        Check the doctor list below for unique IDs
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Selected Doctor</label>
                      <input
                        type="text"
                        value={appointmentForm.doctorName}
                        placeholder="Doctor will be auto-filled"
                        readOnly
                        style={{backgroundColor: '#f5f5f5'}}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={appointmentForm.patientPhone}
                        onChange={(e) => setAppointmentForm({...appointmentForm, patientPhone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Specialty</label>
                      <select
                        value={appointmentForm.specialty}
                        onChange={(e) => setAppointmentForm({...appointmentForm, specialty: e.target.value})}
                        disabled
                        style={{backgroundColor: '#f5f5f5'}}
                      >
                        <option value="general">General Practice</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="orthopedic">Orthopedic</option>
                        <option value="gynecology">Gynecology</option>
                        <option value="pediatrics">Pediatrics</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Appointment Type</label>
                      <select
                        value={appointmentForm.appointmentType}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointmentType: e.target.value})}
                      >
                        <option value="in-person">In-Person</option>
                        <option value="telemedicine">Telemedicine</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={appointmentForm.appointmentDate}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointmentDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Time</label>
                      <select
                        value={appointmentForm.appointmentTime}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointmentTime: e.target.value})}
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Symptoms/Reason for Visit</label>
                    <textarea
                      value={appointmentForm.symptoms}
                      onChange={(e) => setAppointmentForm({...appointmentForm, symptoms: e.target.value})}
                      placeholder="Describe your symptoms or reason for the appointment..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                      placeholder="Any additional information..."
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </button>
                </form>
              </div>

              <div className="doctors-section">
                <h3>Available Doctors</h3>
                <div className="doctors-grid">
                  {doctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-info">
                        <h4>
                          <FontAwesomeIcon icon={faUserMd} />
                          {doctor.name}
                        </h4>
                        <p className="unique-id"><strong>ID:</strong> {doctor.uniqueId}</p>
                        <p className="specialty">{doctor.specialty}</p>
                        <p className="rating">⭐ {doctor.rating}/5</p>
                        <p className="experience">{doctor.experience}</p>
                        {doctor.education && <p className="education">{doctor.education}</p>}
                        {doctor.location && <p className="location">📍 {doctor.location}</p>}
                        {doctor.availability && <p className="availability">🕒 {doctor.availability}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'telemedicine' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="telemedicine-content"
          >
            <div className="telemedicine-info">
              <h3>Online Telemedicine Consultation</h3>
              <p>Connect with doctors instantly through secure video calls using Google Meet.</p>
              
              <div className="telemedicine-features">
                <div className="feature">
                  <FontAwesomeIcon icon={faVideo} />
                  <h4>Instant Video Consultation</h4>
                  <p>Connect with qualified doctors immediately through Google Meet</p>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faStethoscope} />
                  <h4>Professional Care</h4>
                  <p>Get professional medical advice from licensed physicians</p>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faClock} />
                  <h4>24/7 Availability</h4>
                  <p>Access healthcare when you need it, day or night</p>
                </div>
              </div>

              <div className="telemedicine-actions">
                <button onClick={openGoogleMeet} className="meet-btn">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  Start Google Meet Session
                </button>
                <p className="note">
                  For scheduled telemedicine appointments, the Google Meet link will be provided in your appointment confirmation.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HealthSection;