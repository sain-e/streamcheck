export const userTypeDefs = /* GraphQL */ `
    type User {
        _id: ID!
        name: String!
    }

    extend type Query {
        users: [User!]!
        user(id: ID!): User
    }

    input UserInput {
        name: String
    }
    
    extend type Mutation {
        addUser(input: UserInput!): User!
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): Boolean
    }
`;