import express from 'express';
import cors from 'cors';
import connectDB from './db-connect.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

import { createYoga } from 'graphql-yoga';
import { schema } from './graphql/schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        app.locals.db = db;

        // Setup GraphQL Yoga
        const yoga = createYoga({
            schema,
            context: ({ request }) => {
                const db = app.locals.db;  // Pass your MongoDB connection to resolvers
               
                const authHeader = request.headers.get?.('authorization') || '';
                console.log(request.headers)
                console.log("Token recibido en headers:", authHeader);
                const token = authHeader.replace('Bearer ', '');

                let user = null;

                if (token) {
                    try {
                        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                        user = { userId: decoded.userId}
                    } catch (err) {
                        console.warn('Token inválido o expirado');
                    }
                }
                
                console.log("user desde context: ", user)
                return { db, request, user };
            },
        });

        // Mount Yoga at /graphql
        app.use('/graphql', yoga);

        // Start server
        app.listen(PORT, () => {
            console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();