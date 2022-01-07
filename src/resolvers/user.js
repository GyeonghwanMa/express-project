export const userResolvers = {
    Query: {
        async getUsers() {
            console.log("getUser 실행!")
        }
    },
    Mutation: {
        async postUser(_, {email, password, name}) {
            console.log("postUser 실행!")
            console.log(email);
            return null;
        }
    },
}