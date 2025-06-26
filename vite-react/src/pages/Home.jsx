import { Box } from '@mui/material';
import MovieList from "../components/MoviesList";

export default function Home() {
  
    return (
    <Box>
        <h1>Top Películas</h1>
        <MovieList />
    </Box>
    );
}