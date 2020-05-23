import {Actor, ActorModel} from "../models";



export async function actors(_: void): Promise<Actor[]> {
    return ActorModel.find({});
}

export default {
    Query: {
        actors,
    },
}
