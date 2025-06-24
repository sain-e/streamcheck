import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getUsers } from "../graphql/users";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
            console.log(data)
        }).catch((err) => {
            console.error("Error fetching users:", err);
        });
    }, []);

    return (
    <Box>
        <Typography variant="h5" gutterBottom>Lista de usuarios</Typography>
        <List>
            {users.map((user) => (
            <ListItem key={user._id}>
                <ListItemText primary={user.name} secondary={user._id}/>
            </ListItem>
            ))}
        </List> 
    </Box>
    );
}

