// Arquivo responsável por fazer a conexão com o banco de dados
// e realizar operações de CRUD (Create, Read, Update, Delete) na coleção "users"

import { Mongo } from "../database/mongo.js"; // Importa o módulo que gerencia a conexão com o MongoDB
import { ObjectId } from "mongodb";           // Permite converter strings em ObjectId, usado pelo Mongo

// Nome da coleção do banco onde os dados dos usuários são armazenados
const collection_name = "orders";

// Classe responsável por manipular os dados dos usuários no banco
export default class OrdersDataAccess {

    async get_orders() {
        // Acessa o banco de dados e busca todos os documentos da coleção "orders"
        const result = await Mongo.db
            .collection(collection_name)
            .aggregate([
                {
                    $lookup: {
                        from: "orderItems",
                        localField: "_id",
                        foreignField: "order_id",
                        as: "orderItems"
                    }
                }
            ])               // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    async add_order(orderData) {
        const { items, ...orderDataRest } = orderData;
        orderDataRest.createdAt = new Date();
        orderDataRest.pickupStatus = "Pending";
        orderDataRest.userId = new ObjectId(orderDataRest.userId);

        const new_order = await Mongo.db.collection(collection_name).insertOne(orderDataRest);

        if (!new_order.insertedId) {
            throw new Error("Failed to insert order");
        }

        items.map(item => {
            item.clothes_id = new ObjectId(item.clothes_id);
            item.order_id = new ObjectId(new_order.insertedId);
        });

        const result = await Mongo.db.collection("orderItems").insertMany(items);
        
        return result; // Retorna o resultado da inserção
    }

    async delete_order(orderId) {
        // Converte o ID recebido (string) em ObjectId e deleta o documento correspondente
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndDelete({ _id: new ObjectId(orderId) });

        return result; // Retorna o resultado da operação (usuário removido)
    }


    async update_order(orderId, orderData) {
            
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: orderData }
            );

        // Retorna o resultado da atualização
        return result;
    }
}
