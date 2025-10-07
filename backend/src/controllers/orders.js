import OrdersDataAccess from "../dataAccess/orders.js";
import { ok, serverError } from "../helpers/http_response.js";

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new OrdersDataAccess();
    }

    async get_orders(req, res) {
        try {
            const orders = await this.dataAccess.get_orders();

            return ok(orders);
        } catch (error) {
            return serverError(error);
        }
    }

    async add_order(orders_data) {
        try {
            const result = await this.dataAccess.add_order(orders_data);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async delete_order(order_id) {
        try {
            const result = await this.dataAccess.delete_order(order_id);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async update_order(order_id, order_data) {
        try {
            const result = await this.dataAccess.update_order(order_id, order_data);

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}
