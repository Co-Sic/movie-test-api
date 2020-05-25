import {Actor} from "./models";

export interface RegisterResponse extends UserInfo {
}

export interface LoginResponse {
    token: string;
}

export interface UserInfo {
    id: string;
    username: string;
}

export interface Context {
    userInfo: UserInfo;
}

export interface MovieResponse {
    id: string;
    name: string;
    releaseDate: Date;
    durationSeconds: number;
    actors: Actor[];
    averageRating: number;
    ratingCount: number;
}
