import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'movies';

export const movieResolvers = {
    Query: {
        movies: async (_parent, _args, context) => {
            const db = context.db;
            const data = await db.collection(COLLECTION_NAME).find().toArray();
            return data.map(movie => ({
                ...movie,
                releaseDate: movie.releaseDate.toISOString(),
            }));
        },
        movie: async (_parent, { id }, context) => {
            const db = context.db;
            return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        },
    },
    Mutation: {
        addMovie: async (_parent, { input }, context) => {
            const db = context.db;
            const movie = { ...input };
            const result = await db.collection(COLLECTION_NAME).insertOne(movie);
            return { _id: result.insertedId, ...movie };
        },
        updateMovie: async (_parent, { id, input }, context) => {
            const db = context.db;

            const updateResult = await db.collection(COLLECTION_NAME).findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { ...input} },
                { returnDocument: 'after' }
            );
            return updateResult;
        },
        deleteMovie: async (_parent, { id }, context) => {
            const db = context.db;
            const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount === 1;
        },
    },
};