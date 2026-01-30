import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mood: {
    type: String,
    enum: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'],
    required: true
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('JournalEntry', journalSchema);
