import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/clothes';
//import { getUserOrders } from '@/services/orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export const Dashboard = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  /*const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrders,
  });*/

  const stats = [
    {
      title: 'Total de Produtos',
      value: products.length,
      icon: Package,
      change: '+12%',
    },
    /*{
      title: 'Pedidos Hoje',
      value: orders.length,
      icon: ShoppingCart,
      change: '+8%',
    },*/
    {
      title: 'Receita Mensal',
      value: 'R$ 24.500',
      icon: TrendingUp,
      change: '+23%',
    },
    {
      title: 'Clientes Ativos',
      value: '156',
      icon: Users,
      change: '+5%',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel administrativo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-accent mt-1">
                  {stat.change} em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produtos em Destaque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted" />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Novo pedido recebido', time: 'Há 5 minutos' },
                { action: 'Produto atualizado', time: 'Há 1 hora' },
                { action: 'Cliente cadastrado', time: 'Há 2 horas' },
                { action: 'Pedido enviado', time: 'Há 3 horas' },
                { action: 'Novo produto adicionado', time: 'Há 5 horas' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-sm">{activity.action}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
