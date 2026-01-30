import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Slider, Typography, List, ListItem, IconButton } from '@mui/material';
import api from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';

const MOODS = ['Happy','Neutral','Anxious','Sad','Angry','Calm'];

export default function MoodTracker(){
  const [mood, setMood] = useState('Neutral');
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await api.get('/mood');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/mood', { mood, rating, note });
      setEntries(prev => [res.data, ...prev]);
      setNote('');
      setRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/mood/${id}`);
      setEntries(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Mood Tracker</Typography>
      <Box component="form" onSubmit={submit} sx={{ mt: 2, display: 'flex', gap: 2, flexDirection: 'column' }}>
        <TextField select label="Mood" value={mood} onChange={(e)=>setMood(e.target.value)} sx={{ width: 220 }}>
          {MOODS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
        </TextField>

        <Box>
          <Typography gutterBottom>Intensity: {rating}</Typography>
          <Slider value={rating} onChange={(e,val)=>setRating(val)} min={1} max={10} valueLabelDisplay="auto" />
        </Box>

        <TextField label="Note (optional)" value={note} onChange={(e)=>setNote(e.target.value)} multiline rows={2} />

        <Button type="submit" variant="contained" sx={{ width: 160 }}>Add Mood</Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Recent entries</Typography>
        <List>
          {entries.map(en => (
            <ListItem key={en._id} secondaryAction={
              <IconButton edge="end" onClick={()=>remove(en._id)}><DeleteIcon /></IconButton>
            }>
              <Box>
                <Typography><strong>{en.mood}</strong> — {en.rating}/10</Typography>
                <Typography variant="caption">{new Date(en.date).toLocaleString()}</Typography>
                {en.note && <Typography>{en.note}</Typography>}
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
