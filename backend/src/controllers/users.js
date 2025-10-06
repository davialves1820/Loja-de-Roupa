// Arquivo para fazer conexão com o banco de dados e executar as operações de CRUD (Create, Read, Update, Delete)

import { Mongo } from "../database/mongo.js"; // Importa a conexão com o banco de dados MongoDB
import { ObjectId } from "mongodb"; // Permite manipular IDs únicos do MongoDB
import crypto from "crypto"; // Módulo nativo do Node.js usado para criptografia (hash de senhas, geração de salt etc.)

// Define o nome da collection (tabela equivalente no MongoDB)
const collection_name = "users";

// Classe responsável por acessar e manipular dados da collection "users"
export default class UsersDataAccess {

    /* 
        Método: get_users()
        Descrição: Busca todos os usuários cadastrados no banco.
        Retorna: Um array com todos os documentos da collection.
    */
    async get_users() {
        // Acessa o banco (Mongo.db), pega a coleção 'users' e converte os resultados em array
        const result = await Mongo.db.collection(collection_name).find({}).toArray(); 
        
        return result; // Retorna a lista de usuários
    }

    /* 
        Método: delete_user(userId)
        Descrição: Exclui um usuário do banco de dados pelo seu ID.
        Parâmetro: userId (string com o ID do usuário)
        Retorna: O documento deletado (se encontrado).
    */
    async delete_user(userId) {
        // Converte o ID de string para ObjectId (formato interno do Mongo)
        // e remove o documento correspondente
        const result = await Mongo.db.collection(collection_name)
            .findOneAndDelete({ _id: new ObjectId(userId) });

        return result; // Retorna o resultado da exclusão
    }

    /* 
        Método: update_user(userId, userData)
        Descrição: Atualiza os dados de um usuário.
        Parâmetros:
            - userId → ID do usuário a ser atualizado
            - userData → Objeto com os novos dados (pode incluir nome, email, senha, etc.)
        Observação: Se o campo "password" estiver presente, a senha é criptografada antes de salvar.
    */
    async update_user(userId, userData) {

        // Caso o usuário deseje atualizar a senha
        if (userData.password) {

            // Gera um salt aleatório de 16 bytes (ajuda a proteger contra ataques de rainbow table)
            const salt = crypto.randomBytes(16);
            
            // Usa PBKDF2 (Password-Based Key Derivation Function 2) para gerar um hash seguro da senha
            // Parâmetros:
            //   senha original, salt, número de iterações (310000), tamanho da chave (16 bytes), algoritmo (sha256)
            crypto.pbkdf2(userData.password, salt, 310000, 16, "sha256", async (err, hashed_password) => {
                if (err) {
                    // Caso ocorra erro durante o processo de hashing
                    throw new Error("Error during hashing password");
                }

                // Cria um novo objeto de usuário com o hash e o salt substituindo a senha original
                userData = { ...userData, password: hashed_password, salt };

                // Atualiza o documento do usuário no banco com os novos dados
                const result = await Mongo.db.collection(collection_name).findOneAndUpdate(
                    { _id: new ObjectId(userId) },  // Filtro: ID do usuário
                    { $set: userData }              // Atualiza apenas os campos enviados
                );

                return result; // Retorna o documento atualizado
            });
        } 
        else {
            // Caso o usuário NÃO esteja atualizando a senha, apenas os demais dados
            const result = await Mongo.db.collection(collection_name).findOneAndUpdate(
                { _id: new ObjectId(userId) }, // Filtro pelo ID
                { $set: userData }             // Atualiza os campos enviados no body
            );

            return result; // Retorna o resultado da atualização
        }
    }
}
