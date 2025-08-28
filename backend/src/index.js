// Importa o framework Express para criar e gerenciar o servidor
import express from "express";

// Importa o pacote CORS (Cross-Origin Resource Sharing)
// Permite que seu servidor aceite requisições de origens diferentes (outros domínios)
import cors from "cors";

async function main() {
    // Define o hostname (endereço do servidor)
    const hostname = "localhost";

    // Define a porta onde o servidor vai rodar
    const port = 3000;

    // Cria a aplicação Express
    const app = express();

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

    // Faz o servidor "escutar" na porta definida
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`);
    });
}

// Chama a função main para iniciar o servidor
main();
