// Arquivo para configurar a conexão com o banco de dados MongoDB

import { MongoClient } from "mongodb"; // Ela é usada para criar e gerenciar conexões com o banco de dados MongoDB

// Exporta um objeto chamado "Mongo" que conterá métodos relacionados à conexão
export const Mongo = {
    // Método assíncrono responsável por conectar ao banco de dados MongoDB, recebe um objeto com a string de conexão e o nome do banco
    async connect({ mongo_connection_string, mongo_db_name }) {
        try {
            // Cria um novo cliente MongoDB usando a string de conexão fornecida
            const client = new MongoClient(mongo_connection_string);

            // Aguarda a conexão com o servidor MongoDB
            await client.connect();

            // Seleciona o banco de dados pelo nome informado
            const db = client.db(mongo_db_name);

            // Armazena o cliente e o banco de dados como propriedades do objeto Mongo, assim, podem ser reutilizados em outras partes da aplicação
            this.client = client;
            this.db = db;

            // Retorna uma mensagem indicando sucesso na conexão
            return "Connected to mongo!";

        } catch (error) {
            // Caso ocorra qualquer erro durante a conexão, retorna um objeto com a mensagem e o erro
            return { text: "ERROR during mongo connection", error };
        }
    }
};
