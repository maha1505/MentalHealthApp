import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import api from '../services/api';

export default function JournalForm({ onSave, initialData }) {
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setContent(initialData.content);
            setDate(new Date(initialData.date).toISOString().split('T')[0]);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { content, date };
            let res;
            if (initialData) {
                res = await api.put(`/journal/${initialData._id}`, payload);
            } else {
                res = await api.post('/journal', payload);
            }
            onSave(res.data);
            if (!initialData) {
                setContent('');
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
                {initialData ? 'Edit Entry' : 'New Entry'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                            label="Write your content..."
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
