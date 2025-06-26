import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../graphql/movies";
import SnackbarAlert from '../components/SnackbarAlert';
import MovieDetails from "./MovieDetails";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: true,
    severity: 'warning',
    message: 'Cargando...',
  });

  const handleOnClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false}));
  };

  useEffect(() => {
    (async () => {
      const data = await getMovies();
      setMovies(data);
      setLoading(false);
      handleOnClose();
    })();
  }, []);

  const handleMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setOpenDetails(true);
  };

  return (
  <Box 
    sx={{ 
      overflowX: 'auto',
      display: 'flex',
      gap: 2,
      p: 2 
    }}
  >
    {movies.map((movie) => (
    <Card
      key={movie._id}
      sx={{
        minWidth: 200,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}
      onClick={() => handleMovieDetails(movie)}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl}
        alt={movie.title}
      />
      <Typography
        variant="subtitle1"
        sx={{ p: 1, color: 'text.primary', textAlign: 'center' }}
      >
        {movie.title}
      </Typography>
    </Card>
    ))}
    {loading && (
    <SnackbarAlert
      open={snackbar.open}
      severity={snackbar.severity}
      message={snackbar.message}
      onClose={handleOnClose}
    />
    )}
    {selectedMovie && (
    <MovieDetails open={openDetails} onClose={() => setOpenDetails(false)} movie={selectedMovie}></MovieDetails>
    )}
  </Box>
  );
}

export default MovieList;