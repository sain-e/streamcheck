const API_URL = import.meta.env.VITE_API_URL;

async function fetchGraphQL(query, variables = {}) {
    const res = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data;
}

export async function getMovies() {
    const query = `
        query {
            movies {
                _id
                title
                duration
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
