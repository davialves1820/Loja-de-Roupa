import ClothesDataAccess from "../dataAccess/clothes.js";
import { ok, serverError } from "../helpers/http_response.js";

export default class ClothesControllers {
    constructor() {
        this.dataAccess = new ClothesDataAccess();
    }

    async get_clothes(req, res) {
        try {
            const clothes = await this.dataAccess.get_orders();

            return ok(clothes);
        } catch (error) {
            return serverError(error);
        }
    }

    async get_one_clothes(clothes_id) {
        try {
            const clothes = await this.dataAccess.get_clothes(clothes_id);

            return ok(clothes);
        } catch (error) {
            return serverError(error);
        }
    }

    async get_available_clothes(req, res) {
        try {
            const clothes = await this.dataAccess.get_available_clothes();

            return ok(clothes);
        } catch (error) {
            return serverError(error);
        }
    }

    async add_clothes(clothes_data) {
        try {
            const result = await this.dataAccess.add_order(clothes_data);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async delete_clothes(clothes_id) {
        try {
            const result = await this.dataAccess.delete_order(clothes_id);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async update_clothes(clothes_id, clothes_data) {
        try {
            const result = await this.dataAccess.update_order(clothes_id, clothes_data);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}
