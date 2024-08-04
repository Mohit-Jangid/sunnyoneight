// src/routes/tracks.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import Track from '../models/track';

const router = express.Router();

mongoose.connect(process.env.MONGO_URI!)
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
