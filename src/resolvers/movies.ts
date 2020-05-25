import {Actor, ActorModel, Movie, MovieModel, Rating, RatingModel} from "../models";

async function movies(_: void): Promise<Movie[]> {
    return MovieModel.find({}).populate("actors").populate("ratings");
}

async function movie(_: void, args: any): Promise<Movie> {
    const movie: Movie | null = await MovieModel.findById(args.id).populate("actors").populate("ratings");
    if (movie === null) {
        throw new Error("Movie does not exist!");
    }
    return movie;
}

async function releaseDate(parent: Movie): Promise<String> {
    return parent.releaseDate.toLocaleDateString();
}

async function ratings(parent: Movie): Promise<Rating[]> {
    return await RatingModel.find({movie: parent}).populate("user");
}

export async function addMovie(_: void, args: any): Promise<Movie> {
    const {name, releaseDate, durationSeconds, actors} = args;
    const existingMovie: number = await MovieModel.countDocuments({name});
    if (existingMovie) {
        throw new Error("Movie already in Database!");
    }

    // Map actor names to database entries
    let actorArray = await mapNewActors(actors);

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
    const {id, name, releaseDate, durationSeconds, actors } = args;
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

    // Map actor names to database entries
    movie.actors = await mapNewActors(actors);

    await movie.save();
    return movie;
}

async function mapNewActors(actorsNames: string[]): Promise<Actor[]> {
    const actorArray: Actor[] = [];
    for (let i = 0; i < actorsNames.length; i++) {
        let existingActor: Actor | null = await ActorModel.findOne({name: actorsNames[i]});
        if (existingActor !== null) {
            actorArray.push(existingActor);
        } else {
            let newActor: Actor = new ActorModel({
                name: actorsNames[i],
            });
            await newActor.save();
            actorArray.push(newActor);
        }
    }
    return actorArray;
}

export default {
    Query: {
        movies,
        movie,
    },
    Mutation: {
        addMovie,
        deleteMovie,
        editMovie,
    },
    Movie: {
        releaseDate,
        ratings,
    }

};
