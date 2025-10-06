// Arquivo responsável por fazer a conexão com o banco de dados
// e realizar operações de CRUD (Create, Read, Update, Delete) na coleção "users"

import { Mongo } from "../database/mongo.js"; // Importa o módulo que gerencia a conexão com o MongoDB
import { ObjectId } from "mongodb";           // Permite converter strings em ObjectId, usado pelo Mongo
import crypto from "crypto";                  // Biblioteca nativa do Node.js usada para criptografia de senhas

// Nome da coleção do banco onde os dados dos usuários são armazenados
const collection_name = "users";

// Classe responsável por manipular os dados dos usuários no banco
export default class UsersDataAccess {

    /*
        Método: get_users()
        Descrição: Busca todos os usuários da coleção "users".
        Retorna: Um array com todos os documentos da coleção.
    */
    async get_users() {
        // Acessa o banco de dados e busca todos os documentos da coleção "users"
        const result = await Mongo.db
            .collection(collection_name)
            .find({})                // Busca sem filtro → retorna todos os usuários
            .toArray();              // Converte o cursor do MongoDB em um array JavaScript
        
        return result; // Retorna o array de usuários
    }

    /*
        Método: delete_user(userId)
        Descrição: Exclui um usuário do banco com base no ID.
        Parâmetro: userId → string com o ID do usuário.
        Retorna: O documento removido ou null caso não exista.
    */
    async delete_user(userId) {
        // Converte o ID recebido (string) em ObjectId e deleta o documento correspondente
        const result = await Mongo.db
            .collection(collection_name)
            .findOneAndDelete({ _id: new ObjectId(userId) });

        return result; // Retorna o resultado da operação (usuário removido)
    }

    /*
        Método: update_user(userId, userData)
        Descrição: Atualiza os dados de um usuário.
        Parâmetros:
            - userId: ID do usuário a ser atualizado.
            - userData: Objeto contendo os novos dados (nome, email, senha, etc.).
        Observação: Se o campo "password" estiver presente, ele é criptografado antes de salvar.
    */
    async update_user(userId, userData) {

        // Verifica se há um campo de senha no objeto recebido
        if (userData.password) {
            // Gera um salt aleatório de 16 bytes para reforçar a segurança do hash
            const salt = crypto.randomBytes(16);
            
            // Criptografa a senha usando o algoritmo PBKDF2 (recomendado para armazenamento seguro de senhas)
            // Parâmetros:
            // - senha original
            // - salt gerado
            // - número de iterações (310000 = bem seguro)
            // - tamanho do hash (16 bytes)
            // - algoritmo de hash ("sha256")
            crypto.pbkdf2(userData.password, salt, 310000, 16, "sha256", async (err, hashed_password) => {
                if (err) {
                    // Caso ocorra erro durante a criptografia da senha
                    throw new Error("Error during hashing password");
                }

                // Substitui a senha original por sua versão criptografada e adiciona o salt
                userData = { ...userData, password: hashed_password, salt };
            
                // Atualiza o documento no banco com os novos dados
                const result = await Mongo.db
                    .collection(collection_name)
                    .findOneAndUpdate(
                        { _id: new ObjectId(userId) },  // Filtro: procura pelo ID
                        { $set: userData }              // Atualiza apenas os campos enviados
                    );

                // Retorna o resultado da atualização (documento antigo e o novo valor)
                return result;
            });
        } else {
            // Caso o campo "password" não tenha sido enviado,
            // atualiza apenas os outros dados do usuário (nome, email, etc.)
            const result = await Mongo.db
                .collection(collection_name)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData }
                );

            // Retorna o resultado da atualização
            return result;
        }
    }
}
