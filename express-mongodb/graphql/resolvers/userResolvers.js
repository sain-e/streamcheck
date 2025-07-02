import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const COLLECTION_NAME = 'users';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const userResolvers = {
    Query: {
        users: async (_parent, _args, context) => {
            const db = context.db;
            return await db.collection(COLLECTION_NAME).find().toArray();
        },
        user: async (_parent, _args, context) => {
            const { id } = _args;
            const { db, user } = context;
            let completedListMovie = [];
            try {
                if (!user) throw new Error('No autorizado');
        
                const targetId = id || user.userId;
                
                if (targetId !== user.userId) throw new Error('Acceso denegado');
                
                const db = context.db;
                const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(targetId) });

                if (user.completedlist?.length) {
                    completedListMovie = await db
                        .collection('movies')
                        .find({ _id: { $in: user.completedlist.map(id => new ObjectId(id)) } })
                        .toArray();
                }


                return {
                    ...user,
                    completedlist: completedListMovie
                };
            } catch (err) {
                console.error('Error en resolver "user":', err.message);
                throw new Error(err.message);
            }
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
        loginUser: async (_parent, { email, password }, context) => {
            const db = context.db;

            const user = await db.collection(COLLECTION_NAME).findOne({ email });
            if (!user) throw new Error("Usuario no encontrado");

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) throw new Error("Contraseña incorrecta");
            
            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' }); // Option: { expiresIn: '1h' } 
            
            return { token, user };
        },
        addCompletedMovie: async (_parent, { movieId }, context) => {
            const { db, user: authUser } = context;
            if (!authUser) throw new Error('No autorizado');

            const userId = new ObjectId(authUser.userId);
            const movieObjectId = new ObjectId(movieId);

            const userCollection = db.collection('users');

            await userCollection.updateOne(
                { _id: userId },
                { $addToSet: { completedlist: movieObjectId } }
            );

            const updatedUser = await userCollection.findOne({ _id: userId });

            const completedMovies = updatedUser.completedlist?.length
                ? await db
                    .collection('movies')
                    .find({ _id: { $in: updatedUser.completedlist.map(id => new ObjectId(id)) } })
                    .toArray()
                : [];

            return {
                ...updatedUser,
                completedlist: completedMovies,
            };
        },
        removeCompletedMovie: async (_parent, { movieId }, context) => {
            const { db, user: authUser } = context;
            if (!authUser) throw new Error('No autorizado');

            const userId = new ObjectId(authUser.userId);
            const movieObjectId = new ObjectId(movieId);

            const userCollection = db.collection('users');

            await userCollection.updateOne(
                { _id: userId },
                { $pull: { completedlist: movieObjectId } }
            );

            const updatedUser = await userCollection.findOne({ _id: userId });

            const completedMovies = updatedUser.completedlist?.length
                ? await db
                    .collection('movies')
                    .find({ _id: { $in: updatedUser.completedlist.map(id => new ObjectId(id)) } })
                    .toArray()
                : [];

            return {
                ...updatedUser,
                completedlist: completedMovies,
            };
        },
    },
};