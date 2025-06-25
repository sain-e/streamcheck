export const userTypeDefs = /* GraphQL */ `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    extend type Query {
        users: [User!]!
        user(id: ID!): User
    }

    input UserInput {
        username: String
        email: String
        password: String
    }
    
    type AuthUser {
        token: String!
        user: User!
    }
    
    extend type Mutation {
        addUser(input: UserInput!): User!
        updateUser(id: ID!, input: UserInput): User
        deleteUser(id: ID!): Boolean
        loginUser(email: String!, password: String!): AuthUser!
    }
`;