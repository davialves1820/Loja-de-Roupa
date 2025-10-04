// Importa o framework Express para criar e gerenciar o servidor
import express from "express";

// Importa o pacote CORS (Cross-Origin Resource Sharing)
// Permite que seu servidor aceite requisições de origens diferentes (outros domínios)
import cors from "cors";

import { Mongo } from "./database/mongo.js"; 
import { config } from "dotenv"
import auth_router from "./auth/auth.js";

config(); // Carrega as variáveis de ambiente do arquivo .env

async function main() {
    // Define o hostname (endereço do servidor)
    const hostname = "localhost";

    // Define a porta onde o servidor vai rodar
    const port = 3000;

    // Cria a aplicação Express
    const app = express();

    // Conecta ao banco de dados MongoDB
    const mongo_connection = await Mongo.connect({ 
        mongo_connection_string: process.env.MONGO_CS, mongo_db_name: process.env.MONGO_DB_NAME
    })
    console.log(mongo_connection);
    
    // Middleware que permite ao servidor interpretar requisições com JSON no corpo
    app.use(express.json()); 

    // Middleware que habilita o uso de CORS
    app.use(cors()); // precisa ser chamado como função

    // Definir rota GET para o caminho raiz "/"
    app.get("/", (req, res) => {
        // Responde ao cliente com um objeto JSON
        res.send({
            success: true,
            statusCode: 200,
            body: "Welcome to My Story!"
        });
    });

    // Rota para autenticação
    app.use("/auth", auth_router); 

    // Faz o servidor "escutar" na porta definida
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`);
    });
}

// Chama a função main para iniciar o servidor
main();
