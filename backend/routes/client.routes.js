const express = require('express');
const router = express.Router();
const { clientRegister } = require('../controllers/clientRegister.controllers');
const { clientLogin } = require('../controllers/clientLogin.controllers');
const Client = require('../models/client.models');

router.post('/api/client/register', clientRegister);
router.post('/api/client/login', clientLogin);

// Get all clients
router.get('/api/client', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a client
router.put('/api/client/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a client
router.delete('/api/client/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 