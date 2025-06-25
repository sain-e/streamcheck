const API_URL = import.meta.env.VITE_API_URL;

export async function fetchGraphQL(query, variables = {}) {
    const res = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors[0].message);
    }
    
    return json.data;
}