import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/services/clothes';
import { useQuery } from '@tanstack/react-query';
import heroImage from '../assets/hero-image.jpg';

export const Home = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['clothes'],
    queryFn: getProducts,
  });

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Coleção Atemporal
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra peças que transcendem tendências. Elegância, qualidade e estilo que duram.
          </p>
          <Link to="/clothes">
            <Button size="lg" className="group">
              Explorar Coleção
              <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-4">Destaques</h2>
            <p className="text-muted-foreground">As peças mais procuradas da nossa coleção</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="group">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="font-serif text-4xl font-bold mb-12 text-center">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Camisas', 'Calças', 'Vestidos'].map((category) => (
            <Link key={category} to={`/products?category=${category}`} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt={category}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                  <h3 className="font-serif text-3xl font-bold text-foreground">{category}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-serif text-4xl font-bold mb-4">Fique por Dentro</h2>
          <p className="text-muted-foreground mb-8">
            Receba novidades, lançamentos exclusivos e ofertas especiais diretamente no seu e-mail.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Inscrever</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
