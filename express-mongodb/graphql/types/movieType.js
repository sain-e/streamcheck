export const movieTypeDefs = /* GraphQL */ `
    type Movie {
        _id: ID!
        title: String!
        duration: Int!
    }

    extend type Query {
        movies: [Movie!]!
        movie(id: ID!): Movie
    }

    input MovieInput {
        title: String
        duration: Int
    }
    
    extend type Mutation {
        addMovie(input: MovieInput!): Movie!
        updateMovie(id: ID!, input: MovieInput): Movie
        deleteMovie(id: ID!): Boolean
    }
`;