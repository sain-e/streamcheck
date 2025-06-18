import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../graphql/movies";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getMovies();
            setMovies(data);
            setLoading(false);
        })();
    }, []);

    return (
    <Box>
        <Typography variant="h3">Peliculas</Typography>
        {loading ? <p>Cargando...</p> : (
        <ul>
          {movies.map(u => <li key={u._id}>{u.title} - {u.duration}</li>)}
        </ul>
        )}
        
    </Box>
    );
}

export default MovieList;