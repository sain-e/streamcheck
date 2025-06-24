import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../graphql/movies";

const movies = [
  { id: 1, title: "Destino Final, Lazos de sangre", image: "https://www.themoviedb.org/t/p/w1280/frNkbclQpexf3aUzZrnixF3t5Hw.jpg" },
  { id: 2, title: "The Batman", image: "https://www.themoviedb.org/t/p/w1280/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg" },
  { id: 3, title: "Dune", image: "https://www.themoviedb.org/t/p/w1280/szcew6yyjcDvaL0isaPBk2e3nkF.jpg" },
];

const MovieList = () => {
    //const [movies, setMovies] = useState([]);
    //const [loading, setLoading] = useState(true);

    /*useEffect(() => {
        (async () => {
            const data = await getMovies();
            setMovies(data);
            setLoading(false);
        })();
    }, []);*/

    return (
    <Box sx={{ overflowX: 'auto', display: 'flex', gap: 2, p: 2 }}>
      {movies.map((movie) => (
        <Card
          key={movie.id}
          sx={{
            minWidth: 200,
            borderRadius: 2,
            backgroundColor: '#1c1c1c',
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={movie.image}
            alt={movie.title}
          />
          <Typography
            variant="subtitle1"
            sx={{ p: 1, color: '#fff', textAlign: 'center' }}
          >
            {movie.title}
          </Typography>
        </Card>
      ))}
    </Box>
    );
}

export default MovieList;