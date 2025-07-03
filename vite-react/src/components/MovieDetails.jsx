import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addCompletedMovie } from '../graphql/movies';

export default function MovieDetails({ open, onClose, movie }) {
  const [status, setStatus] = useState('Plan to watch');
  const { user } = useAuth();

  const handleSaveMovie = async (e) => {
    e.preventDefault();
    console.log(movie._id, status);
    if (status == 'Completed') {
      const updatedUser = await addCompletedMovie(movie._id);
    }
  };
    
  return (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{movie.title}</DialogTitle>
    <DialogContent>
      <Stack direction="row" spacing={1} sx={{ my: 1 }}>
        {movie.genres.map((genre, index) => (
          <Chip key={index} label={genre} />
        ))}
      </Stack>
      <Typography variant="subtitle2" color="text.primary">{movie.releaseDate} | {movie.duration} minutos</Typography>
      <DialogContentText>{movie.description}</DialogContentText>
      
      {user && (
      <FormControl sx={{ mt: 2, minWidth: 120 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          autoFocus
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          variant="outlined"
          color="primary"
        >
          <MenuItem value="Plan to watch">Pendiente de ver</MenuItem>
          <MenuItem value="Completed">Completado</MenuItem>
          <MenuItem value="Watching">Viendo</MenuItem>
        </Select>
      </FormControl>
      )}
      <DialogActions>
        {movie.trailerUrl && (
        <Button
          color="secondary"
          href={movie.trailerUrl}
          target="_blank"
          variant="outlined"
        >
          Ver tráiler
        </Button>
        )}

        <Button onClick={user ? handleSaveMovie : onClose} color="primary" variant="outlined">{user ? 'Guardar' : 'Cerrar'}</Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
  );
}