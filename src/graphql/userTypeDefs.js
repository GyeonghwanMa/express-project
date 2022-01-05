export const userTypeDefs = `
scalar Date

type User {
    _id: ID
    email: String
    password: String!
    name: String
}

type Query {
    getUsers: User
}

type Mutation {
    postUser(
        email: String!
        name: String
        password: String!
    ): User
}
`;