import React, { useState } from 'react';
import {
    Box, Typography, Paper, IconButton, TextField,
    Grid, Card, CardContent, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';

export default function JournalList({ entries, onDelete, onEdit }) {
    const [search, setSearch] = useState('');

    const filteredEntries = entries.filter(entry => {
        return entry.content.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            placeholder="Search entries..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                            }}
                            sx={{ bgcolor: 'white', borderRadius: 2 }}
                        />
                    </Grid>
                </Grid>
            </Box>

            {filteredEntries.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                    <Typography color="textSecondary">No entries found.</Typography>
                </Paper>
            ) : (
                <Stack spacing={2}>
                    {filteredEntries.map((entry) => (
                        <Card key={entry._id} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: 'none', transition: '0.2s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
                            <CardContent sx={{ position: 'relative', pb: '16px !important' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                                        {format(new Date(entry.date), 'MMMM do, yyyy')}
                                    </Typography>
                                    <Box>
                                        <IconButton size="small" onClick={() => onEdit(entry)} sx={{ color: 'primary.main' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => onDelete(entry._id)} sx={{ color: 'error.main' }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {entry.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    );
}
