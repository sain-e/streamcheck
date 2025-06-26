import { fetchGraphQL } from './graphql';

export async function getMovies() {
    const query = `
        query {
            movies {
                _id
                title
                description
                releaseDate
                duration
                genres
                posterUrl
                trailerUrl
            }
        }
    `;
    const data = await fetchGraphQL(query);
    return data.movies;
}

/* export async function getMovies(id_movie) {
    const query = `
        query {
            movie(id: $id) {
                _id
                title
                duration
            }
        }
    `;
    const data = await fetchGraphQL(query, { id_movie });
    return data.movie;
} */

export async function addMovie(title, duration) {
    const mutation = `
        mutation {
            addMovie(input: {
                title: $title,
                duration: $duration
            }) {
                _id
                title
                duration
            }
        }
    `;
    const data = await fetchGraphQL(mutation, { title, duration });
    return data.addMovie;
}
