import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import musicRoutes from './routes/track'
import trackRoutes from './routes/track';
// import cors from 'cors';


dotenv.config();

const app = express();
// app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api', trackRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
