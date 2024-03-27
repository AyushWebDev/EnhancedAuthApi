import express from 'express';
import connectDB from '../db.js';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes.js';
import { errorHandler } from '../middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoutes);

app.use(errorHandler)

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app

