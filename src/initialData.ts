import {addMovie} from "./resolvers/movies";
import {Context} from "./types";
import {UserModel} from "./models";
import bcrypt from "bcryptjs";
import {addRating} from "./resolvers/ratings";

interface MovieDefinition {
    name: string;
    durationSeconds: number;
    releaseDate: Date;
    actors: string[];
}

const movies: MovieDefinition[] = [
    {
        name: "Goodfellas",
        durationSeconds: 146 * 60,
        releaseDate: new Date("1990-09-21"),
        actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
    },
    {
        name: "John Wick",
        durationSeconds: 101 * 60,
        releaseDate: new Date("2014-10-24"),
        actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
    },
    {
        name: "Monty Python and the Holy Grail",
        durationSeconds: 5460,
        releaseDate: new Date("1976-09-13"),
        actors: ["Graham Chapman", "John Cleese", "Eric Idle"]
    },
    {
        name: "How to Train Your Dragon",
        durationSeconds: 98 * 60,
        releaseDate: new Date("2010-03-31"),
        actors: ["Jay Baruchel", "Gerard Butler", "Christopher Mintz-Plasse"]
    },
    {
        name: "Pirates of the Caribbean: The Curse of the Black Pearl",
        durationSeconds: 143 * 60,
        releaseDate: new Date("2003-08-08"),
        actors: ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom"]
    },
    {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        durationSeconds: 10680,
        releaseDate: new Date("2001-12-19"),
        actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
    },
    {
        name: "The Boondock Saints",
        durationSeconds: 108 * 60,
        releaseDate: new Date("1999-09-14"),
        actors: ["Willem Dafoe", "Sean Patrick Flanery", "Norman Reedus"]
    },
    {
        name: "Pulp Fiction",
        durationSeconds: 154 * 60,
        releaseDate: new Date("1994-10-14"),
        actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"]
    },
];

async function initData() {
    try {
        // await register(undefined, {username: "admin", password: "admin"});
        // // const {token} = await login(undefined, {username: "admin", password: "admin"});
        // await
        const user = new UserModel({
            username: "admin",
            password: await bcrypt.hash("admin", 10),
        });
        await user.save();
        const context: Context = {userInfo: {username: user.username, id: user._id.toHexString()}};
        let movie;
        let movie2;
        for (let i = 0; i < movies.length; i++) {
            movie = await addMovie(undefined, {...movies[i]}, context);
            if (movie.name === "How to Train Your Dragon") {
                movie2 = movie;
            }
        }

        await addRating(undefined, {movieId: movie?.id, value: 5, comment: "Best Movie!!!!"}, context);
        await addRating(undefined, {movieId: movie2?.id, value: 4, comment: "If this is done following the same old beat up formula that Hollywood sticks to with regards to animation, then the dragons will be yakking non-stop. Thank goodness that this film, directed by Dean DeBlois and Chris Sanders, avoids this like the plague, and\n" +
        "\n" +
        "Jay Baruchel voices Hiccup, a viking kid who happens to be more brains than brawn, more scrawny than buffed, and this of course sets him apart from the rest of his warrior clan folks, who are battle scarred from the constant defense of the village pests - dragons who come from afar to plunder their livestock and setting their houses on fire, so much so that every house on the block is relatively brand new. Wanting to help out in any way he can, he's deemed more of a liability than an asset, especially when even his dad Stoick (Gerard Butler) cannot appreciate his unique, technical talent.\n" +
        "\n" +
        "In a stroke of uncanny luck, Hiccup downs a flying dragon in the heat of battle, and his compassion meant to set the dragon free, rather than trying to prove himself to be a worthy viking man by killing it. And it's a rare specimen of a dragon too, which would have brought him instant glory. So a bond between man and mythical beast gets struck, and christened as Toothless, this is one pest who slowly grows into a pet, with Hiccup's secret rendezvous resulting in growing appreciation for the species, despite what the knowledge that his kinsman had compiled into a Dragon compendium which details facts all ending with an advisory on compulsory annihilation.\n" +
        "\n" +
        "The story here is the strength of the film, being witty, smart but never condescending nor insulting the intelligence of the audience. While most characters are caricatures, especially Hiccup's peers, a lot of effort have been put into creating the leads as multi-dimensional and full of heart, and I enjoyed how the characters are so open to their emotions, that it becomes a lot more real than the photo realistic 3D animation and effects. Sure there's the usual father-son misunderstanding and expectations, and how a zero turns to hero, or even the theme of fearing something that we don't fully comprehend, but it's the manner in which the usual got delivered, that made all the difference. Especially so for its anti-war stance, that all it takes is a little step back from the common battle-cry, and instead seek to be understood, by holding out an olive branch, and to understand first.\n" +
        "\n" +
        "For those who enjoy the mythology of the dragon creature, there are a number of ideas thrown up in the film that would make you nod in appreciation how these got conjured up for the film, and they worked wonders, even though they may be a tad predictable plot wise. And I'm betting that a lot of folks out there will take to Toothless, thanks to its \"stitch\"-ish design similar to Lilo and Stitch (since it's co-director Chris Sander's previous work) and huge saucer like eyes, plus a lovable demeanour built into the character that's always apprehensive, and mischievous. Being the creature that has no track record also helped, since it ropes you into a journey of friendship, bonding and discovery with Hiccup as to how powerful his new found friend can be, not to mention how symbiotic their relationship will evolve into as well.\n" +
        "\n" +
        "Action junkies will find the action sequences in the film faultless, and the 3D got specifically crafted for certain set action pieces that really had me ducking for cover, for once. Fights are incredible, and always accompanied either by humour that worked without the feeling that it was deliberate nor just tried too hard, coupled with the comedic voice talents such as Jonah Hill and Christopher Mintz-Plasse.\n" +
        "\n" +
        "How to Train Your Dragon is similar to last year's Cloudy With a Chance of Meatballs - Long titles, great story, beautiful animation and a total delight. Highly recommended, and it goes into my list as contenders for best films of this year!"},
            context)

    } catch (e) {
        // error not relevant for data seeding
        console.log(e);
    }

}

export default initData;
