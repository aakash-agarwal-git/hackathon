import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
