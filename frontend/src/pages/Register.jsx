import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link as MuiLink, Paper, Divider, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/');
    } catch (error) {
      setErr('Google login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Mindful
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Start your journey to mental well-being
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => setErr('Google login failed')}
              useOneTap
            />
          </Box>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <form onSubmit={submit}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {err && <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 3 }}>
            Already have an account? <MuiLink component={Link} to="/login" sx={{ fontWeight: 600 }}>Login</MuiLink>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
}
