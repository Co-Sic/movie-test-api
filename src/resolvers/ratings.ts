import {Movie, MovieModel, Rating, RatingModel} from "../models";
import {Context} from "../types";
import {getUserFromContext} from "./auth";
import pubsub from "../pubsub";

export async function ratingsForMovie(_: void, args: any): Promise<Rating[]> {
    const {movieId} = args;
    const movie: Movie | null = await MovieModel.findById(movieId);
    if (movie === null) {
        throw new Error("Movie does not exist!");
    }
    return RatingModel.find({movie: movie}).populate("user");
}


async function alreadyRated(_: void, args: any, ctx: Context): Promise<boolean> {
    const {movieId} = args;
    const user = await getUserFromContext(ctx);
    const ratings = await ratingsForMovie(undefined, {movieId: movieId});
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i].user._id.toString() === user._id.toString()) {
            return true;
        }
    }
    return false;
}

async function addRating(_: void, args: any, ctx: Context): Promise<Rating> {
    const {movieId, value, comment} = args;

    const user = await getUserFromContext(ctx);

    const movie: Movie | null = await MovieModel.findById(movieId);
    if (movie === null) {
        throw new Error("Movie does not exist!");
    }
    const existingRating: number = await RatingModel.countDocuments({movie: movie, user: user});
    if (existingRating >= 1) {
        throw new Error("Movie already rated!");
    }

    const rating: Rating = new RatingModel({
        value,
        comment,
        movie,
        user,
    });
    await rating.save();
    movie.ratings.push(rating);
    await movie.save();

    // push change to clients
    await pubsub.publish("ratingAdded", {
        ratingAdded: rating,
    });

    return rating;
}

export default {
    Mutation: {
        addRating,
    },
    Query: {
        ratingsForMovie,
        alreadyRated,
    },
    Subscription: {
        ratingAdded: {
            subscribe: () => pubsub.asyncIterator("ratingAdded")
        },
    },
}
