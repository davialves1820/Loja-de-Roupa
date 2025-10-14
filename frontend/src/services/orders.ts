import { useState } from "react";

export default function OrderServices() {
    const [order_loading, set_order_loading] = useState(false);
    const [refetch_orders, set_refetch_orders] = useState(true);
    const [orders_list, set_orders_list] = useState([]);

    const url = "http://localhost:3000/orders";

    // 🔹 Buscar pedidos do usuário
    const get_user_orders = async (user_id: any) => {
        set_order_loading(true);

        fetch(`${url}/userorders/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
        });
    };

    // 🔹 Criar novo pedido
    const add_order = async (order_data: any) => {
        set_order_loading(true);

        try {
            const response = await fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order_data),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Pedido criado com sucesso:", result.body);
                set_refetch_orders(true);
                return { success: true, body: result.body };
            } else {
                console.error("Erro ao criar pedido:", result);
                return { success: false, body: result.body };
            }
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return { success: false, body: error };
        } finally {
            set_order_loading(false);
        }
    };

    const confirm_payment = async (order_id: string) => {
        set_order_loading(true);
        try {
            const response = await fetch(`${url}/confirm/${order_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();

            if (result.success) {
                alert("✅ Pagamento confirmado com sucesso!");
                set_refetch_orders(true);
                return { success: true, body: result.body };
            } else {
            alert("❌ Erro ao confirmar pagamento");
            }
        } catch (error) {
            console.error("Erro ao confirmar pagamento:", error);
            return { success: false, body: error };
        } finally {
            set_order_loading(false);
        }
    };


    return { 
        order_loading, 
        get_user_orders, 
        add_order, 
        refetch_orders, 
        orders_list,
        confirm_payment
    };
}
