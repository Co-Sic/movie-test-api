import {addMovie} from "./resolvers/movies";

interface MovieDefinition {
    name: string;
    durationSeconds: number;
    releaseDate: Date;
    actors: string[];
}

const movies: MovieDefinition[] = [
    {
        name: "Monty Python and the Holy Grail",
        durationSeconds: 5460,
        releaseDate: new Date("1976-09-13"),
        actors: []
    },
    {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        durationSeconds: 10680,
        releaseDate: new Date("2001-12-19"),
        actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
    }
];

async function initData() {
    for (let i = 0; i < movies.length; i++) {
        try {
            await addMovie(undefined, {...movies[i]});
        } catch (e) {
            // error not relevant for data seeding
        }
    }
}

export default initData;
