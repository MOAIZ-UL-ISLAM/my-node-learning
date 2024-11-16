import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './database/databbase.js';
import personalDetailsRoutes from './Routes/perDetails.router.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/personal-details', personalDetailsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});