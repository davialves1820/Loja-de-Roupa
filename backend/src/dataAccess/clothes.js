// Arquivo responsável por fazer a conexão com o banco de dados
// e realizar operações de CRUD (Create, Read, Update, Delete) na coleção "users"

import { Mongo } from "../database/mongo.js"; // Importa o módulo que gerencia a conexão com o MongoDB
import { ObjectId } from "mongodb";           // Permite converter strings em ObjectId, usado pelo Mongo

// Nome da coleção do banco onde os dados dos usuários são armazenados
const collection_name = "clothes";

// Classe responsável por manipular os dados dos usuários no banco
export default class ClothesDataAccess {

    async get_orders() {
        // Acessa o banco de dados e busca todos os documentos da coleção "clothers"
        const result = await Mongo.db
            .collection(collection_name)
            .find({ available: true })                // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    async get_clothes(clothesId) {
        // Acessa o banco de dados e busca todos os documentos da coleção "clothers"
        const result = await Mongo.db
            .collection(collection_name)
            .find({clothesId})                // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    async get_available_clothes() {
        // Acessa o banco de dados e busca todos os documentos da coleção "clothers"
        const result = await Mongo.db
            .collection(collection_name)
            .find({})                // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    async add_order(clothesData) {
        const result = await Mongo.db.collection(collection_name).insertOne(clothesData);
        
        return result; // Retorna o resultado da inserção
    }

    async delete_order(clothesId) {
        // Converte o ID recebido (string) em ObjectId e deleta o documento correspondente
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndDelete({ _id: new ObjectId(clothesId) });

        return result; // Retorna o resultado da operação (usuário removido)
    }


    async update_order(clothesId, clothesData) {
            
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndUpdate(
                { _id: new ObjectId(clothesId) },
                { $set: clothesData }
            );

        // Retorna o resultado da atualização
        return result;
    }
}
