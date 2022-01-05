export const userResolvers = {
    Query: {
        async getUser() {
            console.log("getUser 실행!")
        }
    },
    Mutation: {
        async insertUser({email, password, name}) {
            console.log("insertUser 실행!")
            
        }
    },
}