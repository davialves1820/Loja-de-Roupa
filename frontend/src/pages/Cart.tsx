import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/button';
import { Minus, Plus, Trash2, ArrowLeft, X } from 'lucide-react';
import OrderServices from '@/services/orders';
import { useState } from 'react';

export const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { add_order, confirm_payment } = OrderServices();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [showPixModal, setShowPixModal] = useState(false);

  const PIX_KEY = "davialvesr18@gmail.com";

  const handleCheckout = async () => {
    try {
      const auth_data = JSON.parse(localStorage.getItem("auth") || "{}");
      const userId = auth_data?.user?._id;

      if (!userId) {
        alert("Você precisa estar logado para finalizar a compra!");
        navigate("/auth");
        return;
      }

      const pickupTime = "10:30-01/01/2025";

      const orderData = {
        userId,
        pickupTime,
        items: items.map(item => ({
          clothes_id: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await add_order(orderData);
      
      if (result.success) {
        setOrderId(result.body.insertedId || result.body._id);
        setShowPixModal(true);
      } else {
        alert("❌ Erro ao criar pedido!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao finalizar compra.");
    }
  };

  const handleConfirmPayment = async () => {
    if (!orderId) return;

    const result = await confirm_payment(orderId);
    console.log(result)
    console.log(result.success)
    if (result.success) {
      alert("✅ Pagamento confirmado!");
      clearCart();
      setShowPixModal(false);
      navigate("/profile");
    } else {
      alert("❌ Erro ao confirmar pagamento!");
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-4xl font-bold mb-4">Carrinho Vazio</h1>
        <p className="text-muted-foreground mb-8">
          Adicione produtos ao seu carrinho para continuar
        </p>
        <Link to="/clothes">
          <Button>Explorar Produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative">
      {/* Modal de pagamento Pix */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPixModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Pagamento via Pix</h2>
            <p className="text-center text-muted-foreground mb-2">
              Pague usando a chave Pix abaixo:
            </p>
            <p className="font-mono bg-gray-100 px-2 py-1 rounded text-center mb-4">{PIX_KEY}</p>
           
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirmPayment}
            >
              Confirmar Pagamento
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <Link
          to="/clothes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-smooth"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continuar Comprando
        </Link>

        <h1 className="font-serif text-5xl font-bold mb-12">Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Itens do carrinho */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-6 border-b">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tamanho: {item.size}
                    </p>
                    <p className="font-medium">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-2xl font-bold mb-6">Resumo</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>A calcular</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {!showPixModal && (
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
              )}

              <p className="text-xs text-center text-muted-foreground mt-4">
                Frete e impostos calculados no checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
