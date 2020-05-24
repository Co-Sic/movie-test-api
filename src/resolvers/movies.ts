import {Actor, ActorModel, Movie, MovieModel} from "../models";

async function movies(_: void): Promise<Movie[]> {
    return MovieModel.find({}).populate("actors").populate("ratings");
}

async function releaseDate(parent: Movie): Promise<String> {
    return parent.releaseDate.toLocaleDateString();
}

export async function addMovie(_: void, args: any): Promise<Movie> {
    const {name, releaseDate, durationSeconds, actors} = args;
    const existingMovie: number = await MovieModel.countDocuments({name});
    if (existingMovie) {
        throw new Error("Movie already in Database!");
    }

    // Map actor names to database entries
    const actorArray: Actor[] = [];
    for (let i = 0; i < actors.length; i++) {
        let existingActor: Actor | null = await ActorModel.findOne({name: actors[i]});
        if (existingActor !== null) {
            actorArray.push(existingActor);
        } else {
            let newActor: Actor = new ActorModel({
                name: actors[i],
            });
            await newActor.save();
            actorArray.push(newActor);
        }
    }

    const movie: Movie = new MovieModel({
        name,
        releaseDate,
        durationSeconds,
        actors: actorArray,
    });
    await movie.save();

    for (let i = 0; i < actorArray.length; i++) {
        actorArray[i].movies.push(movie);
        await actorArray[i].save();
    }

    return movie;
}

async function deleteMovie(_: void, args: any): Promise<boolean> {
    const { id } = args;
    return (await MovieModel.findOneAndDelete({_id: id})) != null;
}

async function editMovie(_: void, args: any): Promise<Movie> {
    const {id, name, releaseDate, durationSeconds } = args;
    const movie: Movie | null = await MovieModel.findById(id);
    if (movie === null) {
        throw new Error("Movie does not exist");
    }
    if (name !== null && name !== undefined) {
        movie.name = name;
    }
    if (releaseDate !== null && releaseDate !== undefined) {
        movie.releaseDate = releaseDate;
    }
    if (durationSeconds !== null && durationSeconds !== undefined) {
        movie.durationSeconds = durationSeconds;
    }

    //todo: actors
    await movie.save();
    return movie;
}

export default {
    Query: {
        movies,
    },
    Mutation: {
        addMovie,
        deleteMovie,
        editMovie,
    },
    Movie: {
        releaseDate,
    }

};
