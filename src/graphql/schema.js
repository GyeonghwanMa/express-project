
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userTypeDefs } from "./userTypeDefs";
import { userResolvers } from "../resolvers/user";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
});