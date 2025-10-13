// Arquivo para configurar as rotas relacionadas aos usuários

import express from 'express'; // Importa o framework Express para criação de rotas HTTP
import ClothesControllers from '../controllers/clothes.js'; // Importa o controlador responsável pela lógica de usuários

// Cria um novo roteador do Express para agrupar as rotas de usuários
const clothes_router = express.Router();

// Cria uma instância do controlador de usuários
const clothes_controller = new ClothesControllers();


clothes_router.get("/", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await clothes_controller.get_clothes();

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

clothes_router.get("/:id", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await clothes_controller.get_one_clothes();

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

clothes_router.get("/availables/", async (req, res) => {
    // Chama o método do controller que busca os usuários
    const { success, statusCode, body } = await clothes_controller.get_available_clothes();

    // Envia a resposta HTTP com o status e o conteúdo retornado
    res.status(statusCode).send({ success, statusCode, body });
});

clothes_router.post("/", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de exclusão no controlador
    const { success, statusCode, body } = await clothes_controller.add_clothes(req.body);

    // Retorna o resultado da operação para o cliente
    res.status(statusCode).send({ success, statusCode, body });
});

clothes_router.delete("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de exclusão no controlador
    const { success, statusCode, body } = await clothes_controller.delete_clothes(req.params.id);

    // Retorna o resultado da operação para o cliente
    res.status(statusCode).send({ success, statusCode, body });
});


clothes_router.put("/:id", async (req, res) => {
    // Exibe o ID recebido no console (útil para debug)
    console.log(req.params.id);

    // Chama o método de atualização no controlador, passando ID e dados
    const { success, statusCode, body } = await clothes_controller.update_clothes(req.params.id, req.body);

    // Retorna a resposta com o status da atualização
    res.status(statusCode).send({ success, statusCode, body });
});

// Exporta o roteador para ser usado no arquivo principal
export default clothes_router;
