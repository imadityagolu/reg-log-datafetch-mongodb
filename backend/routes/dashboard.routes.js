const express = require('express');
const router = express.Router();
const Client = require('../models/client.models');

// Dashboard welcome route (optional, can be removed if not needed)
router.get('/api/dashboard', (req, res) => {
  // In a real app, you would check authentication here
  res.json({ message: 'Welcome to the dashboard! (Backend)' });
});

// Get all clients
router.get('/api/users', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a client
router.put('/api/users/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a client
router.delete('/api/users/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 