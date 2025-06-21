const Client = require('../models/client.models');
const bcrypt = require('bcryptjs');

const clientRegister = async (req, res) => {
  try {
    const { name, email, password, dob, address, gender } = req.body;
    if (!name || !email || !password || !dob || !address || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const client = new Client({
      name,
      email,
      password: hashedPassword,
      dob,
      address,
      gender
    });
    await client.save();
    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    console.error('Client registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { clientRegister }; 