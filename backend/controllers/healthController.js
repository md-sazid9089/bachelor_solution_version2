const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Appointment Controllers
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ appointmentDate: 1 })
      .populate('userId', 'name email');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      patientPhone,
      doctorName,
      specialty,
      appointmentType,
      appointmentDate,
      appointmentTime,
      symptoms,
      notes,
      userId,
      bookingId
    } = req.body;

    // Generate Google Meet link for telemedicine appointments
    let googleMeetLink = '';
    if (appointmentType === 'telemedicine') {
      // In a real app, you'd integrate with Google Calendar API
      googleMeetLink = `https://meet.google.com/new`;
    }

    const appointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      doctorName,
      specialty,
      appointmentType,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      googleMeetLink,
      bookingId,
      symptoms,
      notes,
      userId
    });

    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Get appointment status by bookingId (unique ID visible to user)
exports.getAppointmentStatusByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res.status(400).json({ message: 'bookingId is required' });
    }

    const appointment = await Appointment.findOne({ bookingId });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found for this booking ID' });
    }

    // Map internal status to requested labels/messages
    let statusLabel = appointment.status;
    let message = '';
    if (appointment.status === 'pending') {
      statusLabel = 'pending';
      message = "Pending. You'll receive an email with the Google Meet ID.";
    } else if (appointment.status === 'confirmed') {
      // Treat confirmed as 'email sent' for user-facing language
      statusLabel = 'email_sent';
      message = 'Email sent with Google Meet ID.';
    } else if (appointment.status === 'cancelled') {
      statusLabel = 'cancelled';
      message = 'Appointment cancelled.';
    } else if (appointment.status === 'completed') {
      statusLabel = 'completed';
      message = 'Appointment completed.';
    }

    return res.json({
      bookingId: appointment.bookingId,
      status: statusLabel,
      message,
      googleMeetLink: appointment.googleMeetLink || undefined,
      doctorName: appointment.doctorName,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving appointment status', error: error.message });
  }
};

// Doctor Controllers
exports.getDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;
    
    let query = {};
    if (specialty && specialty !== 'all') {
      query.specialty = specialty;
    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor', error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    
    const doctor = await Doctor.findOne({ uniqueId: uniqueId });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found with this unique ID' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};