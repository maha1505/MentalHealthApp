import express from 'express';
import mongoose from 'mongoose';

import Journal from '../models/JournalEntry.js';

const router = express.Router();

// Create journal entry
router.post('/', async (req, res) => {
  try {
    const { content, date } = req.body;
    const entry = new Journal({
      content,
      date: date || Date.now()
    });
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update journal entry
router.put('/:id', async (req, res) => {
  try {
    const { content, date } = req.body;
    let entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Not found' });

    entry.content = content || entry.content;
    entry.date = date || entry.date;

    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Not found' });
    await entry.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
