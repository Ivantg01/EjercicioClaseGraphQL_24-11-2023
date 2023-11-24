//cargamos el fichero de entorno .env con la URI de la base de datos
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const DB_URI = env["DB_URI"] || Deno.env.get("DB_URI") || "mongodb://localhost:27017/disc"


//conexion con la base de datos
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

import mongoose from "npm:mongoose@7.6.3";
try {
    console.log("Database: connecting... ", DB_URI);
    const db = await mongoose.connect(DB_URI);
    console.log("Database: connected", db.connection.name);
} catch (error) {
    console.log("Database: error: ", error);
}

import {typeDefs} from "./typeDefs.ts";
import {resolvers} from "./resolvers.ts";

const server = new ApolloServer({typeDefs, resolvers});

const {url} = await startStandaloneServer(server);
console.log(`Server ready at ${url}`);




