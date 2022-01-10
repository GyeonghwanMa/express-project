import User from "../model/userSchema";

export const userResolvers = {
    Query: {
        async getUser(_, {email, password}) {
            console.log("getUser 실행!");
            let result;
            try {
                result = await User.findOne({email: email, password: password});
            } catch (error) {
                console.log(`getUser Error = ${error}`);
            }
            return result;
        }
    },
    Mutation: {
        async postUser(_, {email, password, name}) {
            console.log("postUser 실행!");
            const newUser = new User({
                email,
                password,
                name,
            });
            let result;
            try {
                result = await newUser.save();
            } catch (error) {
                console.log(`postUser Error = ${error}`);
            }
            return result;
        },
        async patchUser(_, {email, password, name}) {
            console.log("patchUser 실행!");
            let result;
            try {
                result = await User.findOneAndUpdate(
                    {email: email},
                    {$set: {password: password, name: name}}    
                );
            } catch (error) {
                console.log(`patchUser Error = ${error}`);
            }
            return result;
        },
        async deleteUser(_, {email, password}) {
            console.log("deleteUser 실행!");
            try {
                result = await User.findOneAndDelete({email: email, password: password});
            } catch (error) {
                console.log(`deleteUser Error = ${error}`);
            }
            return result;
        }
    },
}