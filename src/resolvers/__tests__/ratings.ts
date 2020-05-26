import * as setup from "../../__tests__/setup";
import {RatingModel, MovieModel, UserModel} from "../../models";
import {ratingsForMovie} from "../ratings";

let testMongo: setup.TestMongoConn;

beforeEach(async () => {
    testMongo = await setup.beforeEach();
});

afterEach(() => setup.afterEach(testMongo));

describe("Test get ratings for movie", () => {
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
    it("should return array of ratings", async () => {
        const user = new UserModel({
            username: "johndoe",
            password: "unencryptedPassword",
        });
        await user.save();
        const movie = new MovieModel({
            name: "TestMovie",
            durationSeconds: 10000,
            releaseDate: "2020-01-01",
            actors: []
        });
        await movie.save();
        const rating = new RatingModel({
            value: 3,
            comment: "",
            user: user,
            movie: movie,
        });
        await rating.save();
        const response = await ratingsForMovie(undefined, {
            movieId: movie._id,
        });
        expect(response[0].user.username).toEqual(user.username);
    });
});
