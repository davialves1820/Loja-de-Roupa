import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Eye } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    customer: 'Ana Silva',
    email: 'ana@email.com',
    total: 479.80,
    status: 'pending',
    items: 2,
    date: '2024-01-15',
  },
  {
    id: '2',
    customer: 'Bruno Santos',
    email: 'bruno@email.com',
    total: 249.90,
    status: 'processing',
    items: 1,
    date: '2024-01-14',
  },
  {
    id: '3',
    customer: 'Carla Oliveira',
    email: 'carla@email.com',
    total: 699.80,
    status: 'shipped',
    items: 3,
    date: '2024-01-13',
  },
  {
    id: '4',
    customer: 'Daniel Costa',
    email: 'daniel@email.com',
    total: 399.90,
    status: 'delivered',
    items: 2,
    date: '2024-01-12',
  },
];

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  processing: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  shipped: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  delivered: 'bg-green-500/10 text-green-700 dark:text-green-400',
};

const statusLabels = {
  pending: 'Pendente',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
};

export const Orders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Pedidos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os pedidos da loja
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Pedido #{order.id}</p>
                    <p className="text-sm">{order.items} {order.items === 1 ? 'item' : 'itens'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="text-sm">
                      {new Date(order.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
