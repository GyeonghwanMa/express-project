export const userTypeDefs = `
scalar Date

type User {
    _id: ID
    email: String
    password: String!
    name: String
}

type Query {
    getUser: User
}
type Mutation {
    insertUser(
        email: String!
        name: String
        password: String!
    ): User
}
`;