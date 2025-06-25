import { fetchGraphQL } from './graphql';

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

export async function addUser(username, email, password) {
    const mutation = `
        mutation AddUser($username: String!, $email: String!, $password: String!) {
            addUser(input: {
                username: $username
                email: $email
                password: $password
            }) {
                _id
                username
                email
            }
        }
    `;
    const variables = { username, email, password };
    const data = await fetchGraphQL(mutation, variables);
    return data.addUser;
}