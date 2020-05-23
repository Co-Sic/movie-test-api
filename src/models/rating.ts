import mongoose, {Schema} from "mongoose";
import { User, Movie } from ".";

export interface Rating extends mongoose.Document {
    _id: string;
    value: number;
    comment: string;
    user: User;
    movie: Movie;
}

const RatingSchema = new mongoose.Schema(
    {
        value: {type: Number, required: true},
        comment: {type: String, required: false},
        user: {type: Schema.Types.ObjectId, ref: "User"},
        movie: {type: Schema.Types.ObjectId, ref: "Movie"},
    },
    {
        versionKey: false,
    },
);

export const RatingModel = mongoose.model<Rating>("Rating", RatingSchema, "Ratings");
