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

export async function getUsers() {
    const query = `
        query {
        users {
            _id
            username
            email
        }
        }
    `;
    const data = await fetchGraphQL(query);
    return data.users;
}

export async function addUser(username, email) {
    const mutation = `
        mutation ($username: String!, $email: String!) {
        addUser(username: $username, email: $email) {
            _id
            username
            email
        }
        }
    `;
    const data = await fetchGraphQL(mutation, { username, email });
    return data.addUser;
}
