import {gql} from "apollo-server";

const typeDef = gql`
    type Rating {
        id: ID!
        value: Int!
        comment: String!
        user: User!
        movie: Movie!
    }
    
    extend type Mutation {
        addRating(movieId: String!, value: Int!, comment: String!):Rating!
    }
`;

export default typeDef;
