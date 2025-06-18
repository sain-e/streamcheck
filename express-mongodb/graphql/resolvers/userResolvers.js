import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'users';

export const userResolvers = {
    Query: {
        users: async (_parent, _args, context) => {
            const db = context.db;
            return await db.collection(COLLECTION_NAME).find().toArray();
        },
        user: async (_parent, { id }, context) => {
            const db = context.db;
            return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        },
    },
    Mutation: {
        addUser: async (_parent, { input }, context) => {
            const db = context.db;
            const user = { ...input };
            const result = await db.collection(COLLECTION_NAME).insertOne(user);
            return { _id: result.insertedId, ...user };
        },
        updateUser: async (_parent, { id, input }, context) => {
            const db = context.db;

            const updateResult = await db.collection(COLLECTION_NAME).findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { ...input} },
                { returnDocument: 'after' }
            );
            return updateResult;
        },
        deleteUser: async (_parent, { id }, context) => {
            const db = context.db;
            const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount === 1;
        },
    },
};