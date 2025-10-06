// Arquivo para configurar as rotas relacionadas aos usuários

import express from 'express'; // Importa o framework Express para criação de rotas HTTP
import UsersControllers from '../controllers/users.js'; // Importa o controlador responsável pela lógica de usuários

// Cria um novo roteador do Express para agrupar as rotas de usuários
const users_router = express.Router();

// Cria uma instância do controlador de usuários
const users_controller = new UsersControllers();

/* 
Rota: GET /
Descrição: Retorna todos os usuários cadastrados.
Fluxo:
    1. O controlador chama a função get_users() que acessa o banco.
    2. Retorna a resposta formatada (status, corpo e sucesso).
*/

users_router.get("/", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await users_controller.get_users();

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

/* 
Rota: DELETE /:id
Descrição: Exclui um usuário específico com base no ID informado.
Exemplo: DELETE /users/123
Fluxo:
    1. Extrai o ID da URL (req.params.id).
    2. Chama o método delete_user() do controller.
    3. Envia a resposta com o resultado da exclusão.
*/

users_router.delete("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de exclusão no controlador
    const { success, statusCode, body } = await users_controller.delete_user(req.params.id);

    // Retorna o resultado da operação para o cliente
    res.status(statusCode).send({ success, statusCode, body });
});

/* 
Rota: PUT /:id
Descrição: Atualiza os dados de um usuário específico.
Exemplo: PUT /users/123 com um JSON no corpo contendo os novos dados.
Fluxo:
    1. Extrai o ID da URL e os dados do corpo da requisição.
    2. Chama o método update_user() do controller.
    3. Retorna o resultado da atualização.
*/

users_router.put("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de atualização no controlador, passando ID e dados
    const { success, statusCode, body } = await users_controller.update_user(req.params.id, req.body);

    // Retorna a resposta com o status da atualização
    res.status(statusCode).send({ success, statusCode, body });
});

// Exporta o roteador para ser usado no arquivo principal
export default users_router;
