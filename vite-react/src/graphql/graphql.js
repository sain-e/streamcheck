const API_URL = import.meta.env.VITE_API_URL;

export async function fetchGraphQL(query, variables = {}) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await res.json();

    if (errors && errors.length > 0) {
         console.error('GraphQL Error:', errors);

        throw new Error(errors[0].message || 'Unexpected error');
    }
    
    return data;
}