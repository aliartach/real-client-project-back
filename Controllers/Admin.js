import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../Models/Admin.js';

dotenv.config();

export const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    // Here we check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'username already in use!' });
    }

    // Here we check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Here we hash the passsword

    // Here we register the admin
    const admin = await Admin.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Admin created successfully!', admin});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ id: admin._id }, secretKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Logged in Successfully!', admin: admin._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message })
  }
};

// To add delete and update