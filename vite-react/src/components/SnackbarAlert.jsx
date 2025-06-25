import { Alert, Snackbar } from '@mui/material';

export default function SnackbarAlert({ open, severity, message, onClose }) {

    // severity options: error | info | warning | success
    return (
    <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert 
            onClose={onClose} 
            severity={severity} 
            variant="filled" 
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar>
    );
}