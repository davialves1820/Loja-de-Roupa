import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthServices from "../../services/auth";
import OrderServices from "../../services/orders";
import Loading from "../loading/pages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Skeleton } from "@/components/skeleton";
import { Package, Clock, CheckCircle, XCircle, LogOut } from "lucide-react";

const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
    Pending: {
        label: "Pendente",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    },
    Completed: {
        label: "Concluído",
        icon: CheckCircle,
        className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    },
    Canceled: {
        label: "Cancelado",
        icon: XCircle,
        className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    },
    };

    export default function Profile() {
    const navigate = useNavigate();
    const { logout } = AuthServices();
    const { get_user_orders, order_loading, orders_list } = OrderServices();
    const [loading, setLoading] = useState(true);

    const auth_data = JSON.parse(localStorage.getItem("auth") || "{}");
    const user = auth_data.user;

    useEffect(() => {
        if (!user) {
        navigate("/auth");
        return;
        }

        const fetchData = async () => {
        try {
            await get_user_orders(user._id);
        } catch (err) {
            console.error("Erro ao carregar pedidos:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        });

    const formatPrice = (price: number) =>
        price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        });

    if (order_loading || loading) return <Loading />;

    return (
        <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
            {/* Cabeçalho */}
            <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="font-serif text-4xl font-bold mb-2">Minha Conta</h1>
                <p className="text-muted-foreground">
                Bem-vindo, {user?.fullname} ({user?.email})
                </p>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm px-3 py-2 border border-border rounded-md hover:bg-muted transition"
            >
                <LogOut className="w-4 h-4" /> Sair
            </button>
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-6">
            {orders_list.length === 0 ? (
                <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="font-serif text-xl font-semibold mb-2">
                    Nenhum pedido encontrado
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                    Você ainda não realizou nenhuma compra
                    </p>
                    <Link
                    to="/clothes"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
                    >
                    Ver especialidades
                    </Link>
                </CardContent>
                </Card>
            ) : (
                orders_list.map((order: any) => {
                const status = statusConfig[order.pickupStatus] || statusConfig.Pending;
                console.log(order.orderItems?.[0])
                const StatusIcon = status.icon;

                return (
                    <Card key={order._id}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-lg mb-1">
                            Pedido #{order._id}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                            {order.pickupTime}
                            </p>
                        </div>
                        <Badge className={status.className}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                        </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {/* Itens do pedido */}
                        <div className="space-y-3">
                            {order.orderItems.map((item: any) => (
                            <div key={item._id} className="flex gap-4">
                                <img
                                src={item.clothesDetails?.[0]?.image || "/placeholder.png"}
                                alt={item.clothesDetails?.[0]?.name || "Item"}
                                className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                <h4 className="font-medium">
                                    {item.clothesDetails?.[0]?.name || "Item sem nome"}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Tamanho: {item.clothesDetails?.[0].size} | Quantidade: {item.quantity}
                                </p>
                                <p className="text-sm font-medium mt-1">
                                    {formatPrice(item.clothesDetails?.[0]?.price || 0)}
                                </p>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="pt-4 border-t border-border flex justify-between items-center">
                            <span className="font-medium">Total</span>
                            <span className="text-xl font-bold">
                            {formatPrice(
                                order.orderItems.reduce(
                                (acc: number, item: any) =>
                                    acc + (item.clothesDetails?.[0]?.price || 0) * item.quantity,
                                0
                                )
                            )}
                            </span>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                );
                })
            )}
            </div>
        </div>
        </div>
    );
}
