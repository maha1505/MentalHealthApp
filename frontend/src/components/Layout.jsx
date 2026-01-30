import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
    const { user } = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
            <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Mindful
                        </Typography>
                        {user && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                    Personal Journal
                                </Typography>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                {children}
            </Container>
        </Box>
    );
}
