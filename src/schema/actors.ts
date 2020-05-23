import {gql} from "apollo-server";

const typeDef = gql`
    type Actor {
        id: ID!
        name: String!
    }

    extend type Query {
        actors: [Actor!]!
    }
`;

export default typeDef;
