const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Mood = require('../models/MoodEntry');

// Create mood entry
router.post('/', auth, async (req, res) => {
  try {
    const { mood, rating, note } = req.body;
    const entry = new Mood({ user: req.userId, mood, rating, note });
    await entry.save();
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's mood entries
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Mood.find({ user: req.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Mood.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Not found' });
    if (entry.user.toString() !== req.userId) return res.status(403).json({ msg: 'Not authorized' });
    await entry.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
