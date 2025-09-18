const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Property = require('../models/Property');
const Hack = require('../models/Hack');
const Shop = require('../models/Shop');
const Maid = require('../models/Maid');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin email
const ADMIN_EMAIL = 'sazid.cse.20230104062@aust.edu';

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email is admin email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Unauthorized: Admin access only' });
    }
    
    // Find user with admin email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate admin token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        isAdmin: true 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      appointments: await Appointment.countDocuments(),
      properties: await Property.countDocuments(),
      hacks: await Hack.countDocuments(),
      shops: await Shop.countDocuments(),
      maids: await Maid.countDocuments(),
      doctors: await Doctor.countDocuments(),
      recentAppointments: await Appointment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email'),
      recentUsers: await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email createdAt')
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

// Manage content (properties, shops, maids, etc.)
exports.getContentStats = async (req, res) => {
  try {
    const stats = {
      properties: {
        count: await Property.countDocuments(),
        data: await Property.find().sort({ createdAt: -1 }).limit(10)
      },
      shops: {
        count: await Shop.countDocuments(),
        data: await Shop.find().sort({ createdAt: -1 }).limit(10)
      },
      maids: {
        count: await Maid.countDocuments(),
        data: await Maid.find().sort({ createdAt: -1 }).limit(10)
      },
      hacks: {
        count: await Hack.countDocuments(),
        data: await Hack.find().sort({ createdAt: -1 }).limit(10)
      },
      doctors: {
        count: await Doctor.countDocuments(),
        data: await Doctor.find().sort({ createdAt: -1 }).limit(10)
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content stats', error: error.message });
  }
};