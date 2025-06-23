// back_end/src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const patientRoutes = require('./routes/patient.routes');
const testTypeRoutes = require('./routes/testType.routes');
const patientTestRoutes = require('./routes/patientTest.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 🧪 API routes
app.use('/api/patients', patientRoutes);
app.use('/api/test-types', testTypeRoutes);
app.use('/api/patient-tests', patientTestRoutes);

// 🧱 Fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = app;