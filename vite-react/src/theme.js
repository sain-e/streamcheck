import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#db0e21',
        },
        secondary: {
            main: '#BD0D8B',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#b0b0b0'
        },
        background: {
            default: '#121212',
            paper: '#303030'
        },
    },
});

export default theme;
