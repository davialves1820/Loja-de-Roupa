// Arquivo responsável por fazer a conexão com o banco de dados
// e realizar operações de CRUD (Create, Read, Update, Delete) na coleção "users"

import { Mongo } from "../database/mongo.js"; // Importa o módulo que gerencia a conexão com o MongoDB
import { ObjectId, ReturnDocument } from "mongodb";           // Permite converter strings em ObjectId, usado pelo Mongo
import { v4 as uuidv4 } from "uuid";
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
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $project: {
                        "userDetails.password": 0,
                        "userDetails.salt": 0,
                    }
                },
                {
                    $unwind: "$orderItems"
                },
                {
                    $lookup: {
                        from: "clothes",
                        localField: "orderItems.clothes_id",
                        foreignField: "_id",
                        as: "orderItems.clothesDetails"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        userDetails: { $first: "$userDetails" },
                        orderItems: { $push: "$orderItems" },
                        pickupStatus: { $first: "$pickupStatus" },
                        pickupTime: { $first: "$pickupTime" }
                    }
                }
            ])               // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    async get_orders_by_user(userId) {
        // Acessa o banco de dados e busca todos os documentos da coleção "orders"
        const result = await Mongo.db
            .collection(collection_name)
            .aggregate([
                {
                    $match: { userId: new ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: "orderItems",
                        localField: "_id",
                        foreignField: "order_id",
                        as: "orderItems"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $project: {
                        "userDetails.password": 0,
                        "userDetails.salt": 0,
                    }
                },
                {
                    $unwind: "$orderItems"
                },
                {
                    $lookup: {
                        from: "clothes",
                        localField: "orderItems.clothes_id",
                        foreignField: "_id",
                        as: "orderItems.clothesDetails"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        userDetails: { $first: "$userDetails" },
                        orderItems: { $push: "$orderItems" },
                        pickupStatus: { $first: "$pickupStatus" },
                        pickupTime: { $first: "$pickupTime" }
                    }
                }
            ])               // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }



    async add_order(orderData) {
        const { items, ...orderDataRest } = orderData;

        // Gera referência única do Pix
        orderDataRest.pixReference = uuidv4();
        orderDataRest.createdAt = new Date();
        orderDataRest.pickupStatus = "Pending";
        orderDataRest.userId = new ObjectId(orderDataRest.userId);
        orderDataRest.status = "pending_payment";

        const new_order = await Mongo.db.collection(collection_name).insertOne(orderDataRest);

        items.forEach(item => {
            item.clothes_id = new ObjectId(item.clothes_id);
            item.order_id = new ObjectId(new_order.insertedId);
        });

        await Mongo.db.collection("orderItems").insertMany(items);

        return new_order;
    }


    async delete_order(orderId) {

        const items_to_delete = await Mongo.db
        .collection("orderItems")
        .deleteMany( { order_id: new ObjectId(orderId) } );

        // Converte o ID recebido (string) em ObjectId e deleta o documento correspondente
        const order_to_delete = await Mongo.db
            .collection(collection_name)
            .findOneAndDelete({ _id: new ObjectId(orderId) });

        const result = {
            items_to_delete,
            order_to_delete
        }

        return result; // Retorna o resultado da operação (usuário removido)
    }


    async update_order(orderId, orderData) {
            
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: orderData },
                { ReturnDocument: "after" }
            );

        // Retorna o resultado da atualização
        return result;
    }
}
