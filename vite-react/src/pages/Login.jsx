import { Box } from "@mui/material"
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();


    };
  
    return (
    <Box component="form" onSubmit={handleLogin}>
        <TextField id="username-input" label="Usuario" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField type="password" id="password-input" label="Contraseña" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">
        Entrar
        </Button>
    </Box>
    );
}