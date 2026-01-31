import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('JournalEntry', journalSchema);
