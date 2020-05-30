import mongoose, {Schema, Types} from "mongoose";
import {Movie} from ".";

export interface Actor extends mongoose.Document {
    _id: Types.ObjectId;
    name: string;
    movies: Movie[];
}

const ActorSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        movies: [{type: Schema.Types.ObjectId, ref: "Movie"}],
    },
    {
        versionKey: false,
    },
);

export const ActorModel = mongoose.model<Actor>("Actor", ActorSchema, "Actors");
