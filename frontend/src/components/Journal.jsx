import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, IconButton } from '@mui/material';
import api from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Journal(){
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);

  const fetch = async () => {
    try {
      const res = await api.get('/journal');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ fetch(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/journal', { content });
      setEntries(prev => [res.data, ...prev]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      setEntries(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Journal</Typography>
      <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
        <TextField label="Write anything" value={content} onChange={(e)=>setContent(e.target.value)} multiline rows={3} fullWidth />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>Save</Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <List>
          {entries.map(en => (
            <ListItem key={en._id} secondaryAction={<IconButton edge="end" onClick={()=>remove(en._id)}><DeleteIcon /></IconButton>}>
              <Box>
                <Typography variant="body2">{en.content}</Typography>
                <Typography variant="caption">{new Date(en.date).toLocaleString()}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
