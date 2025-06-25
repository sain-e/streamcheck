import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addUser } from '../graphql/users';
import SnackbarAlert from '../components/SnackbarAlert';
import { isValidEmail, isStrongPassword } from '../utils/utils';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: '',
    });

    const handleOnClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false}));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            return setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error: Email inválido'
            });
        }

        if (!isStrongPassword(password)) {
            return setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error: La contraseña debe tener al menos 5 caracteres'
            });
        }

        if (password !== passwordConfirm) {
            return setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error: las contraseñas no coinciden'
            });
        }

        try {
            const response = await addUser(username, email, password);
            console.log(response);

            setSnackbar({
                open: true,
                severity: 'success',
                message: 'Registro completado!'
            });

            setUsername('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');

        } catch (err) {
            setSnackbar({
                open: true,
                severity: 'warning',
                message: err.message || 'Error al registrar el usuario'
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
            onSubmit={handleSignUp}
        >
            <Typography variant="h5" color="text.secondary" align="center">
            Crear cuenta
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
                id="email-input" 
                label="Email" 
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
            <TextField 
                type="password" 
                id="password-confirm-input" 
                label="Confirmar contraseña" 
                variant="outlined" 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
                required
            />
            <Button 
                variant="contained" 
                color="primary" 
                type="submit"
            >
            Crear
            </Button>
            <Typography variant="body2" component={Link} to="/login" color="primary">
            ¿Ya tienes cuenta? Pincha aquí!
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