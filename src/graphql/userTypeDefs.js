export const userTypeDefs = `
scalar Date

type User {
    _id: ID
    email: String!
    password: String!
    name: String!
}

type Query {
    getUser(
        email: String!
        password: String!
    ): User
    getUserByEmail(
        email: String!
    ): User
    getUsersInit: [User]
    getUsers(lastId: String): [User]
}

type Mutation {
    postUser(
        email: String!
        password: String!
        name: String!
    ): User
    patchUser(
        email: String!
        password: String!
        name: String!
    ): User
    deleteUser(
        email: String!
        password: String!
    ): User
}
`;