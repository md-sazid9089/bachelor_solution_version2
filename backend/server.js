const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const maidRoutes = require('./routes/maid');
const propertyRoutes = require('./routes/property');
const shopRoutes = require('./routes/shop');
const hackRoutes = require('./routes/hack');
app.use('/api/auth', authRoutes);
app.use('/api/maids', maidRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/hacks', hackRoutes);

console.log('[Init] Routes mounted: /api/auth, /api/maids, /api/properties, /api/shops, /api/hacks');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
