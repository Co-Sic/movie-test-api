import {Movie, MovieModel, Rating, RatingModel, User, UserModel} from "../models";
import {Context} from "../types";



async function addRating(_: void, args: any, ctx: Context): Promise<Rating> {
    const {movieId, value, comment} = args;

    const {userInfo} = ctx;
    if (!userInfo) {
        throw new Error("Not authenticated!");
    }
    const user: User | null = await UserModel.findOne({_id: userInfo.id});
    if (!user) {
        throw new Error("Not authenticated!");
    }

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
    return rating;
}

export default {
    Mutation: {
        addRating
    }
}
