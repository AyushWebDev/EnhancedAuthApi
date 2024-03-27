import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerUser = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password: hashedPassword
    });
    await user.save();
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return token;
};

export const getUserProfile = async (req,userId) => {
    const user = await User.findById(userId);
    const viewerId = req.user.id
    if (!user) {
        throw new Error('404:User not found');
    }
    if (viewerId !== userId
        && req.user.role === 'user'
        && user.isPublic === false) {
        throw new Error('403:Profile is private');
    }
    return user;
};

export const editUserProfile = async (req,userId) => {
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return user;
};
