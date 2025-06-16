import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ isLoggedIn = true }) => {
  
    return (
    <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="h6" component={Link} to="/" color="inherit">
                    StreamCheck
                </Typography>
                <Button component={Link} to="/" color="inherit">Películas</Button>
                <Button component={Link} to="/" color="inherit">Series</Button>
            </Box>

            <Box>
            {isLoggedIn ? (
                <IconButton color="inherit" component={Link} to="/">
                    <AccountCircle />
                </IconButton>
            ) : (
                <Button color="inherit" component={Link} to="/login">Iniciar sesión</Button>
            )}
            </Box>
        </Toolbar>
    </AppBar>
    );
}

export default Navbar;