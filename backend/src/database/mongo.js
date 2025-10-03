import { MongoClient } from "mongodb";

export const Mongo = {
    async connect({ mongo_connection_string, mongo_db_name }) {
        try {
            const client = new MongoClient(mongo_connection_string);

            await client.connect();
            const db = client.db(mongo_db_name);

            this.client = client;
            this.db = db;

            return "Connected to mongo!";

        } catch (error) {
            return { text: "ERROR during mongo connection", error };
        }
        
    }
}