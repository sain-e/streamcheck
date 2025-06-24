import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ isLoggedIn = true }) => {
  
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
                <IconButton color="text.primary" component={Link} to="/">
                    <AccountCircle />
                </IconButton>
            ) : (
                <Button color="text.primary" component={Link} to="/login">Iniciar sesión</Button>
            )}
            </Box>
        </Toolbar>
    </AppBar>
    );
}

export default Navbar;