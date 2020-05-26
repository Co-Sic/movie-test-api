import * as setup from "../../__tests__/setup";
import {MovieModel, UserModel, RatingModel} from "../../models";
import {ratingsForMovie} from "../ratings";
import {mapMovie, movie} from "../movies";

let testMongo: setup.TestMongoConn;

beforeEach(async () => {
    testMongo = await setup.beforeEach();
});

afterEach(() => setup.afterEach(testMongo));

describe("Test map movie to movie response", () => {
    it("should have an average rating of 0 for if there are no ratings", async () => {
        const testMovie = new MovieModel({
            name: "TestMovie",
            durationSeconds: 10000,
            releaseDate: "2020-01-01",
            actors: []
        });
        await testMovie.save();
        const response = mapMovie(testMovie);
        expect(response.averageRating).toEqual(0);
    });
    it("should have an average rating of all the ratings if there are ratings for the movie", async () => {
        const testMovie = new MovieModel({
            name: "TestMovie",
            durationSeconds: 10000,
            releaseDate: "2020-01-01",
            actors: []
        });
        await testMovie.save();

        const user1 = new UserModel({
            username: "johndoe",
            password: "test",
        });
        await user1.save();

        const user2 = new UserModel({
            username: "johndoe2",
            password: "test",
        });
        await user2.save();

        const rating1 = new RatingModel({
            value: 3,
            comment: "",
            movie: testMovie,
            user: user1
        });
        await rating1.save();

        const rating2 = new RatingModel({
            value: 5,
            comment: "",
            movie: testMovie,
            user: user2
        });
        await rating2.save();
        testMovie.ratings = [rating1, rating2];

        const response =  mapMovie(testMovie);
        expect(response.averageRating).toEqual(4);
    });
});

describe("Test get movie", () => {
    it("should throw error if movie does not exist", async () => {

        let error;
        try {
            await ratingsForMovie(undefined, {
                movieId: "41224d776a326fb40f000001",
            });
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error("Movie does not exist!"));
    });
    it("should return a MovieResponse", async () => {
        const testMovie = new MovieModel({
            name: "TestMovie",
            durationSeconds: 10000,
            releaseDate: "2020-01-01",
            actors: []
        });
        await testMovie.save();
        const response = await movie(undefined, {
            id: testMovie._id,
        });
        expect(response.name).toEqual(testMovie.name);
        expect(response.averageRating).toEqual(0);
    });
});
