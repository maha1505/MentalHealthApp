import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js';
import Journal from '../models/JournalEntry.js';

const router = express.Router();

// Create journal entry
router.post('/', auth, async (req, res) => {
  try {
    const { content, mood, date } = req.body;
    const entry = new Journal({
      user: req.userId,
      content,
      mood,
      date: date || Date.now()
    });
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all journal entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update journal entry
router.put('/:id', auth, async (req, res) => {
  try {
    const { content, mood, date } = req.body;
    let entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Not found' });
    if (entry.user.toString() !== req.userId) return res.status(401).json({ msg: 'Not authorized' });

    entry.content = content || entry.content;
    entry.mood = mood || entry.mood;
    entry.date = date || entry.date;

    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete journal entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Not found' });
    if (entry.user.toString() !== req.userId) return res.status(401).json({ msg: 'Not authorized' });
    await entry.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
