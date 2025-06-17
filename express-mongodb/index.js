import express from 'express';
import cors from 'cors';
import connectDB from './db-connect.js';

import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs, resolvers } from './graphql/usersSchema.js';

import usersRouter from './routes/usersRoutes.js';

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

        // Mount REST routes
        app.use('/users', usersRouter);

        // Setup GraphQL Yoga
        const yoga = createYoga({
            schema: createSchema({
                typeDefs,
                resolvers,
            }) ,
            context: ({ request }) => ({
                db: app.locals.db,  // Pass your MongoDB connection to resolvers
            }),
        });


        // Mount Yoga at /graphql
        app.use('/graphql', yoga);

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();