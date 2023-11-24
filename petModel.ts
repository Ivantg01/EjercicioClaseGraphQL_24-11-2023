import mongoose from 'npm:mongoose@7.6.3';
import {Pet} from "./types.ts";

const Schema = mongoose.Schema;

const petSchema = new Schema(
    {
        name: String,
        breed: String,
    },
    { timestamps: true }
);

export type PetModelType = mongoose.Document & Omit<Pet, "id">;

export default mongoose.model<PetModelType>("Pet", petSchema);