import User from '../graphql/schema'

export const userResolvers = {
    Query: {
        async getUser(_, {email, password}) {
            console.log("getUser 실행!");
            console.log(email, password);
        }
    },
    Mutation: {
        async postUser(_, {email, password, name}) {
            console.log("postUser 실행!")
            const newUser = new User({
                email,
                password,
                name,
              });
      
            const result = await newUser.save();
            return null;
        }
    },
}