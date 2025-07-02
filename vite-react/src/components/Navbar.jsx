import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;

    // These variables are a sub menu for user
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleClose();
    };
  
    return (
    <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="h6" component={Link} to="/" color="text.primary">
                    StreamCheck
                </Typography>
                <Button component={Link} to="/" color="text.primary">Películas</Button>
                <Button component={Link} to="/" color="text.primary">Series</Button>
            </Box>

            <Box>
            {isLoggedIn ? (
            <>
                <IconButton color="text.primary" onClick={handleMenu}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem disabled>{user.username}</MenuItem>
                    <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
            </>
            ) : (
                <Button color="text.primary" component={Link} to="/login">Iniciar sesión</Button>
            )}
            </Box>
        </Toolbar>
    </AppBar>
    );
}