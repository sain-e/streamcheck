import { ObjectId } from 'mongodb';

export const typeDefs = /* GraphQL */ `
    type User {
        _id: ID!
        name: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    input UserInput {
        name: String!
    }
    
    type Mutation {
        addUser(input: UserInput!): User!
        updateUser(id: ID!, input: UserInput!): User
        deleteUser(id: ID!): Boolean
    }
`;

export const resolvers = {
    Query: {
        users: async (_parent, _args, context) => {
            const db = context.db;
            return await db.collection('users').find().toArray();
        },
        user: async (_parent, { id }, context) => {
            const db = context.db;
            return await db.collection('users').findOne({ _id: new ObjectId(id) });
        },
    },
    Mutation: {
        addUser: async (_parent, { input }, context) => {
            const db = context.db;
            const user = { ...input };
            const result = await db.collection('users').insertOne(user);
            return { _id: result.insertedId, ...user };
        },
        updateUser: async (_parent, { id, input }, context) => {
            const db = context.db;

            const updateResult = await db.collection('users').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { ...input} },
                { returnDocument: 'after' }
            );
            return updateResult;
        },
        deleteUser: async (_parent, { id }, context) => {
            const db = context.db;
            const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount === 1;
        },
    },
};