import PetModel from "./petModel.ts";
import {GraphQLError} from 'graphql';


export const resolvers = {
    Query: {
        pets: async () => {
            return await PetModel.find().exec();
        },
        pet: async (_: unknown, args: { id: string }) => {
            const pet = await PetModel.findById(args.id).exec();
            if (!pet) {
                throw new GraphQLError(`No pet found with id ${args.id}`,{
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pet;
        },
    },
    Mutation: {
        addPet: async (_: unknown, args: { name: string, breed: string }) => {
            const pet = new PetModel(args);
            await pet.save();
            return pet;
        },
        deletePet: async (_: unknown, args: { id: string }) => {
            const pet = await PetModel.findByIdAndDelete(args.id).exec();
            if (!pet) {
                throw new GraphQLError(`No pet found with id ${args.id}`,{
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pet;
        },
        updatePet: async (_: unknown, args: { id: string, name: string, breed: string }) => {
            const pet = await PetModel.findByIdAndUpdate(args.id, args).exec();
            if (!pet) {
                throw new GraphQLError(`No pet found with id ${args.id}`,{
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return pet;
        }

    }
}