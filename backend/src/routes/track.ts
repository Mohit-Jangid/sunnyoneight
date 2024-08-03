// src/routes/tracks.ts
import express from 'express';
import Track from '../models/track';

const router = express.Router();

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tracks' });
  }
});

export default router;
