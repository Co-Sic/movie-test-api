import { gql } from "apollo-server";

const typeDef = gql`
    type User {
        id: ID!
        username: String!
        ratings: [Rating!]!
    }

    type Query {
        currentUser: User!
    }

    type LoginResponse {
        token: String
        user: User
    }

    type Mutation {
        register(username: String!, password: String!): User!
        login(username: String!, password: String!): LoginResponse!
    }
`;

export default typeDef;
