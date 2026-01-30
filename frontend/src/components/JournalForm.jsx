import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Paper, Grid } from '@mui/material';
import api from '../services/api';

const MOODS = ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'];

export default function JournalForm({ onSave, initialData }) {
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('Neutral');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setContent(initialData.content);
            setMood(initialData.mood);
            setDate(new Date(initialData.date).toISOString().split('T')[0]);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { content, mood, date };
            let res;
            if (initialData) {
                res = await api.put(`/journal/${initialData._id}`, payload);
            } else {
                res = await api.post('/journal', payload);
            }
            onSave(res.data);
            if (!initialData) {
                setContent('');
                setMood('Neutral');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {initialData ? 'Edit Entry' : 'How are you feeling today?'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            label="Select Mood"
                            fullWidth
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            required
                        >
                            {MOODS.map((m) => (
                                <MenuItem key={m} value={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="date"
                            label="Date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Write your thoughts..."
                            multiline
                            rows={4}
                            fullWidth
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{ borderRadius: 2, py: 1.5, fontWeight: 600 }}
                        >
                            {loading ? 'Saving...' : initialData ? 'Update Entry' : 'Add Entry'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
