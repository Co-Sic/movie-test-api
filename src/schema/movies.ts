import {gql} from "apollo-server";

const typeDef = gql`
    type Movie {
        id: ID!
        name: String!
        releaseDate: String!
        durationSeconds: Int!
        actors: [Actor!]!
        ratings: [Rating!]!
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
    
`;

export default typeDef;
