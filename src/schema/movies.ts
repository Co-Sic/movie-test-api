import {gql} from "apollo-server";

const typeDef = gql`
    type Movie {
        id: ID!
        name: String!
        releaseDate: String!
        durationSeconds: Int!
        actors: [Actor!]!
        averageRating: Float!
        ratingCount: Int!
    }
    
    type MovieAction {
        movie: Movie!
        user: User!
    }
    
    extend type Mutation {
        addMovie(name: String!, releaseDate: String!, durationSeconds: Int!, actors:[String!]!): Movie!
        deleteMovie(id: String!): Boolean!
        editMovie(id: ID!, name: String!, releaseDate: String!, durationSeconds: Int!, actors:[String!]!): Movie!
    }
    
    extend type Query {
        movies: [Movie!]!
        movie(id: String!): Movie!
    }
    
    extend type Subscription {
        movieAdded: MovieAction!
        movieDeleted: MovieAction!
        movieEdited: MovieAction!
    }
    
`;

export default typeDef;
