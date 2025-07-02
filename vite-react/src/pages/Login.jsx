import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SnackbarAlert from '../components/SnackbarAlert';
import { loginUser } from '../graphql/users';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleOnClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false}));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { token, user } = await loginUser(email, password);
            await login(token, user);
            navigate('/');
        } catch (err) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: err.message || 'Error al iniciar sesión'
            });
        }
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
                label="Correo electronico" 
                variant="outlined" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
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
        <SnackbarAlert
            open={snackbar.open}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={handleOnClose}
        />
    </Box>
    );
}