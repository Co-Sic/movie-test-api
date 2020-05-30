import {addMovie} from "./resolvers/movies";
import {Context} from "./types";
import {UserModel} from "./models";
import bcrypt from "bcryptjs";
import {addRating} from "./resolvers/ratings";

interface MovieDefinition {
    name: string;
    durationSeconds: number;
    releaseDate: Date;
    actors: string[];
}

const movies: MovieDefinition[] = [
    {
        name: "Goodfellas",
        durationSeconds: 146 * 60,
        releaseDate: new Date("1990-09-21"),
        actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
    },
    {
        name: "John Wick",
        durationSeconds: 101 * 60,
        releaseDate: new Date("2014-10-24"),
        actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
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
    },
    {
        name: "Pulp Fiction",
        durationSeconds: 154 * 60,
        releaseDate: new Date("1994-10-14"),
        actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"]
    },
];

async function initData() {
    try {
        // await register(undefined, {username: "admin", password: "admin"});
        // // const {token} = await login(undefined, {username: "admin", password: "admin"});
        // await
        const user = new UserModel({
            username: "admin",
            password: await bcrypt.hash("admin", 10),
        });
        await user.save();
        const context: Context = {userInfo: {username: user.username, id: user._id.toHexString()}};
        let movie;
        for (let i = 0; i < movies.length; i++) {
            movie = await addMovie(undefined, {...movies[i]}, context);
        }

        await addRating(undefined, {movieId: movie?.id, value: 5, comment:"Best Movie!!!!"}, context);

    } catch (e) {
        // error not relevant for data seeding
        console.log(e);
    }

}

export default initData;
