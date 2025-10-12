import { useState } from "react";

export default function OrderServices() {
    const [order_loading, set_order_loading] = useState(false);
    const [refetch_orders, set_refetch_orders] = useState(true);
    const [orders_list, set_orders_list] = useState([])

    const url = "http://localhost:3000/orders";

    const get_user_orders = async (user_id: any) => {
        set_order_loading(true);

        fetch(`${url}/userorders/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                set_orders_list(result.body);
            } else {
                console.log(result);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            set_order_loading(false);
            set_refetch_orders(false);
        })
    }

    return { order_loading, get_user_orders, refetch_orders, orders_list };
}