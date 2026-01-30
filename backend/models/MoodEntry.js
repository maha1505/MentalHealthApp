const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true },           // e.g., "Anxious", "Happy"
  rating: { type: Number, default: 5 },             // 1-10
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodEntry', moodSchema);
