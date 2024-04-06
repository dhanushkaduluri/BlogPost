
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const secretKey = 'your_secret_key'; // Change this to a secure secret key
const tokenExpiration = '1h'; // Token expiration time

export const register = async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, password: hashedPassword, role:userType });

    // // Generate JWT
    // const token = jwt.sign({ userId: newUser.id, username: newUser.username, userType: newUser.userType }, secretKey, { expiresIn: tokenExpiration });

    // Send token to client
    res.json({ msg:"Registration successfull." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find user by ID
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: tokenExpiration });
  
      // Send token to client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };