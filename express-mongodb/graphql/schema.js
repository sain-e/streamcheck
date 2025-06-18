import { createSchema } from '@graphql-yoga/node';

import { userTypeDefs } from './types/userType.js';
import { movieTypeDefs } from './types/movieType.js';

import { userResolvers } from './resolvers/userResolvers.js';
import { movieResolvers } from './resolvers/movieResolvers.js';

export const schema = createSchema({
    typeDefs: [
        /* GraphQL */ `
        type Query
        type Mutation
        `,
        userTypeDefs,
        movieTypeDefs
    ],
    resolvers: [userResolvers, movieResolvers],
});