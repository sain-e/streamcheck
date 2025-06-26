export const movieTypeDefs = /* GraphQL */ `
    type Movie {
        _id: ID!
        title: String!
        description: String!
        releaseDate: String!
        duration: Int!
        genres: [String!]!
        posterUrl: String!
        trailerUrl: String!
    }

    extend type Query {
        movies: [Movie!]!
        movie(id: ID!): Movie
    }

    input MovieInput {
        title: String
        description: String
        releaseDate: String
        duration: Int
        genres: [String]
        posterUrl: String
        trailerUrl: String
    }
    
    extend type Mutation {
        addMovie(input: MovieInput!): Movie!
        updateMovie(id: ID!, input: MovieInput): Movie
        deleteMovie(id: ID!): Boolean
    }
`;