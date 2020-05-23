import mongoose, {Schema} from "mongoose";
import {Rating} from "./rating";

export interface User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    ratings: Rating[];
}

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        ratings: [{type: Schema.Types.ObjectId, ref:"Rating"}],
    },
    {
        versionKey: false,
    },
);

export const UserModel = mongoose.model<User>("User", UserSchema, "Users");
