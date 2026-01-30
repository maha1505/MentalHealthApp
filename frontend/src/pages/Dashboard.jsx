import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, CircularProgress, Alert, Dialog, DialogContent, DialogTitle } from '@mui/material';
import api from '../services/api';
import JournalForm from '../components/JournalForm';
import JournalList from '../components/JournalList';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/journal');
      setEntries(res.data);
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = () => {
    setEditingEntry(null);
    fetchData(); // Refresh data
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/journal/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  if (loading) return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    </Layout>
  );

  return (
    <Layout>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Entry Form Section */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <JournalForm onSave={handleSave} />
          </Box>
        </Grid>

        {/* List Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Your Journal Entries
          </Typography>
          <JournalList
            entries={entries}
            onDelete={handleDelete}
            onEdit={(entry) => setEditingEntry(entry)}
          />
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={Boolean(editingEntry)}
        onClose={() => setEditingEntry(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Journal Entry</DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <JournalForm
            initialData={editingEntry}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
