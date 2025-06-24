import { Box } from "@mui/material";
import MovieList from "../components/MoviesList";
import UserList from "../components/UsersList";

export default function Home() {
  
    return (
    <Box>
        <h1>Inicio</h1>
        <UserList />
    </Box>
    );
}