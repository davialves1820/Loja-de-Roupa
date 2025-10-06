import UsersDataAccess from "../dataAccess/users.js";
import { ok, serverError } from "../helpers/http_response.js";

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UsersDataAccess();
    }

    async get_users(req, res) {
        try {
            const users = await this.dataAccess.get_users();

            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async delete_user(user_id) {
        try {
            const result = await this.dataAccess.delete_user(user_id);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}
