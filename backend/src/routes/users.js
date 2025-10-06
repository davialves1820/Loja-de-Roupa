import express from 'express';
import UsersControllers from '../controllers/users.js';

const users_router = express.Router();

const users_controller = new UsersControllers();

users_router.get("/", async (req, res) => {
    const { success, statusCode, body } = await users_controller.get_users();

    res.status(statusCode).send({ success, statusCode , body });
});

users_router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    const { success, statusCode, body } = await users_controller.delete_user(req.params.id);

    res.status(statusCode).send({ success, statusCode , body });
});

export default users_router;