import {addMovie} from "./resolvers/movies";
import {register} from "./resolvers/auth";

interface MovieDefinition {
    name: string;
    durationSeconds: number;
    releaseDate: Date;
    actors: string[];
}

interface UserDefinition {
    username: string;
    password: string;
}

const users: UserDefinition[] = [
    {
        username: "InitialUser1",
        password: "password",
    },
];

const movies: MovieDefinition[] = [
    {
        name: "Pulp Fiction",
        durationSeconds: 154 * 60,
        releaseDate: new Date("1994-10-14"),
        actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"]
    },
    {
        name: "Monty Python and the Holy Grail",
        durationSeconds: 5460,
        releaseDate: new Date("1976-09-13"),
        actors: ["Graham Chapman", "John Cleese", "Eric Idle"]
    },
    {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        durationSeconds: 10680,
        releaseDate: new Date("2001-12-19"),
        actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
    },
    {
        name: "The Boondock Saints",
        durationSeconds: 108 * 60,
        releaseDate: new Date("1999-09-14"),
        actors: ["Willem Dafoe", "Sean Patrick Flanery", "Norman Reedus"]
    }
];

async function initData() {
    for (let i = 0; i < users.length; i++) {
        try {
            await register(undefined, {...users[i]});
        } catch (e) {
            // error not relevant for data seeding
        }
    }

    for (let i = 0; i < movies.length; i++) {
        try {
            await addMovie(undefined, {...movies[i]});
        } catch (e) {
            // error not relevant for data seeding
        }
    }

}

export default initData;
