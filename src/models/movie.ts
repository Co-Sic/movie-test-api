import mongoose, {Schema} from "mongoose";
import {Actor, Rating} from ".";

export interface Movie extends mongoose.Document {
    _id: string;
    name: string;
    releaseDate: Date;
    durationSeconds: number;
    actors: Actor[];
    ratings: Rating[];
}

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        releaseDate: {type: Date, required: true},
        durationSeconds: {type: Number, required: true},
        actors: [{type: Schema.Types.ObjectId, ref: "Actor"}],
        ratings: [{type: Schema.Types.ObjectId, ref: "Rating"}],
    },
    {
        versionKey: false,
    },
);

export const MovieModel = mongoose.model<Movie>("Movie", UserSchema, "Movies");
