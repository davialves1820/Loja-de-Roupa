import express from 'express';
import UsersControllers from '../controllers/users.js';

const users_router = express.Router();

const users_controller = new UsersControllers();

users_router.get("/", async (req, res) => {
    const { success, statusCode, body } = await users_controller.get_users();

    res.status(statusCode).send({ success, statusCode , body });
})

export default users_router;