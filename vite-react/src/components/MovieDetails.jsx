import { Chip, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";


export default function MovieDetails({ open, onClose, movie }) {
    
    return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{movie.title}</DialogTitle>
        <DialogContent>
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          {movie.genres.map((genre, idx) => (
            <Chip key={idx} label={genre} />
          ))}
        </Stack>

        </DialogContent>
    </Dialog>
    );
}