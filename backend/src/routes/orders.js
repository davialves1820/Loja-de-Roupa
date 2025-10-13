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

// Rota para receber notificações do Pix
orders_router.post("/webhook/pix", async (req, res) => {
    try {
        const { pixKey, amount, referenceId, status } = req.body;

        // status pode ser algo como "COMPLETED" ou "RECEIVED" dependendo do provedor
        if (status === "COMPLETED" || status === "RECEIVED") {
            // Aqui você deve localizar o pedido relacionado ao Pix
            // Supondo que você salve a orderId na referência do Pix
            const orderId = referenceId;

            const { success, statusCode, body } =
                await orders_controller.update_order(orderId, {
                    status: "paid",
                    paymentConfirmedAt: new Date(),
                    paymentMethod: "pix"
                });

            console.log("Pedido atualizado automaticamente via Webhook:", orderId);
        }

        // Sempre responda 200 para que o provedor saiba que recebeu
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Erro no webhook Pix:", err);
        res.status(500).json({ success: false, error: err.message });
    }
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

// Confirmar pagamento
orders_router.put("/confirm/:id", async (req, res) => {
    console.log("Confirmando pagamento do pedido:", req.params.id);

    const { success, statusCode, body } =
        await orders_controller.update_order(req.params.id, {
        status: "paid",
        paymentConfirmedAt: new Date(),
        });

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

