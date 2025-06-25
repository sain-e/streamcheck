import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

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
            try {
                const { username, email, password } = input;
                const db = context.db;

                // check if email already on use
                const existingUser = await db.collection(COLLECTION_NAME).findOne({ email });
                if (existingUser) {
                    throw new Error('El email ya está registrado');
                }
                
                const hashedPassword = await bcrypt.hash(password, 10); // hash password

                const user = { username, email, password: hashedPassword };
                const result = await db.collection(COLLECTION_NAME).insertOne(user);
                return { _id: result.insertedId, ...user };
            } catch (err) {
                throw new Error(err.message || 'Error inesperado al registrar usuario');
            }
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