const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Admin login (no auth required)
router.post('/login', adminController.adminLogin);

// Protected admin routes (require admin auth)
router.get('/dashboard', adminAuth, adminController.getDashboardStats);
router.get('/users', adminAuth, adminController.getAllUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.get('/appointments', adminAuth, adminController.getAllAppointments);
router.put('/appointments/:id/status', adminAuth, adminController.updateAppointmentStatus);
router.delete('/appointments/:id', adminAuth, adminController.deleteAppointment);
router.get('/content', adminAuth, adminController.getContentStats);

module.exports = router;