const User = require('../models/register.models');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: 'Email and password are required'
            });

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
            }
        });
        }
    }
    catch(error){
        console.error('Login error: ', error);
        res.status(500).json({
            message: 'server error'
        });
    }
};

const loginControllers = {
    login
};

module.exports = loginControllers;