// src/models/Track.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Track extends Document {
  id: string;
  title: string;
  artist: string;
  url: string;
  poster: string;
  spotify: string;
  youtube: string;
}

const TrackSchema: Schema = new Schema({
  id: {type: String, required: true},
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  poster: { type: String, required: true },
  spotify: { type: String, required: true },
  youtube: { type: String, required: true },
});

export default mongoose.model<Track>('Track', TrackSchema);
