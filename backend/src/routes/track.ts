// src/routes/tracks.ts
import express from 'express';
import mongoose from 'mongoose';

import Track from '../models/track';

const mongoUri = process.env.MONGO_URI;

const router = express.Router();


if (!mongoUri) {
  throw new Error('MONGO_URI is not defined');
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

  router.get('/tracks', async (req, res) => {
    try {
      const tracks = await Track.find();
      res.json(tracks);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching tracks:', error.message);
        res.status(500).json({ message: 'Error fetching tracks' });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Error fetching tracks' });
      }
    }
  });
  

export default router;
