import * as mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  wx: {
    type: String,
    required: true
  },
  maxT: {
    type: Number,
    required: true,
    trim: true
  },
  minT: {
    type: Number,
    required: true,
    trim: true
  },
  ci: {
    type: String,
    required: true
  },
  pop: {
    type: Number,
    required: true,
    trim: true
  }
});

export const WeatherModel = mongoose.model('Weather', weatherSchema);
