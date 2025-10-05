// Fazer conexão com o banco de dados e fazer as operações de CRUD (Create, Read, Update, Delete)

import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";

const collection_name = "users";

export default class UsersDataAccess {
    async get_users() {
        const result = await Mongo.db.collection(collection_name).find({}).toArray(); // Pegar todos os dados dentro de collection_users
        
        return result;
    }

    async delete_user() {

    }

    async update_user() {

    }
}