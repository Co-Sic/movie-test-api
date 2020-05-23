import {gql} from "apollo-server";

const typeDef = gql`
    type Movie {
        id: ID!
        name: String!
        releaseDate: String!
        duration: Int!
        actors: [Actor!]!
        ratings: [Rating!]!
    }
    extend type Mutation {
        addMovie(name: String!, releaseDate: String!, duration: Int!, actors:[String!]): Movie!
        deleteMovie(id: String!): Boolean!
        editMovie(id: ID!, name: String, releaseDate: String, duration: Int, actors:[String!]): Movie!
    }
    
    extend type Query {
        movies: [Movie!]!
    }
    
`;

export default typeDef;