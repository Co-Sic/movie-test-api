import {gql} from "apollo-server";

const typeDef = gql`
    type Rating {
        id: ID!
        value: Int!
        comment: String!
        user: User!
        movie: Movie!
    }
    
    extend type Query {
        ratingsForMovie(movieId: String!): [Rating!]!
        alreadyRated(movieId:String!): Boolean!
    }
    
    extend type Mutation {
        addRating(movieId: String!, value: Int!, comment: String!):Rating!
    }

    type Subscription {
        ratingAdded: Rating!
    }
    
`;

export default typeDef;
