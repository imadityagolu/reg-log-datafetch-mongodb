const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] }
}, {
  timestamps: true,
  collection: 'clients',
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client; 