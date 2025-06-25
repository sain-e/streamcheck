import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();


    };
  
    return (
    <Box sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Paper 
            sx={{
                p: 4,
                width: '100%',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
            component="form" 
            onSubmit={handleLogin}
        >
            <Typography variant="h5" color="text.secondary" align="center">
            Iniciar Sesión
            </Typography>
            <TextField 
                id="username-input" 
                label="Usuario" 
                variant="outlined" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
            />
            <TextField 
                type="password" 
                id="password-input" 
                label="Contraseña" 
                variant="outlined" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <Button 
                variant="contained" 
                color="primary" 
                type="submit"
            >
            Entrar
            </Button>
            <Typography variant="body2" component={Link} to="/signup" color="primary">
            ¿No tienes cuenta? Crea una aquí!
            </Typography>
        </Paper>
    </Box>
    );
}