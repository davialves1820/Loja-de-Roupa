// Arquivo para configurar as rotas relacionadas aos usuários

import express from 'express'; // Importa o framework Express para criação de rotas HTTP
import OrdersControllers from '../controllers/orders.js'; // Importa o controlador responsável pela lógica de usuários

// Cria um novo roteador do Express para agrupar as rotas de usuários
const orders_router = express.Router();

// Cria uma instância do controlador de usuários
const orders_controller = new OrdersControllers();


orders_router.get("/", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await orders_controller.get_orders();

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

orders_router.get("/userorders/:id", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await orders_controller.get_orders_by_user(req.params.id);

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

orders_router.post("/", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de exclusão no controlador
    const { success, statusCode, body } = await orders_controller.add_order(req.body);

    // Retorna o resultado da operação para o cliente
    res.status(statusCode).send({ success, statusCode, body });
});

orders_router.delete("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de exclusão no controlador
    const { success, statusCode, body } = await orders_controller.delete_order(req.params.id);

    // Retorna o resultado da operação para o cliente
    res.status(statusCode).send({ success, statusCode, body });
});


orders_router.put("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de atualização no controlador, passando ID e dados
    const { success, statusCode, body } = await orders_controller.update_order(req.params.id, req.body);

    // Retorna a resposta com o status da atualização
    res.status(statusCode).send({ success, statusCode, body });
});

// Exporta o roteador para ser usado no arquivo principal
export default orders_router;
