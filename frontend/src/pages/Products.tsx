import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/clothes';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';

export const Clothes = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [sortBy, setSortBy] = useState('featured');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['clothes'],
    queryFn: getProducts,
  });

  const filteredProducts = categoryFilter
    ? products.filter(p => p.category === categoryFilter)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="font-serif text-5xl font-bold mb-4">
            {categoryFilter || 'Todas as Roupas'}
          </h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'produto' : 'produtos'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 space-y-8">
            <div>
              <h3 className="font-medium mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={category === 'Todos' ? '/clothes' : `/clothes?category=${category}`}>
                      {category}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Tamanhos</h3>
              <div className="flex flex-wrap gap-2">
                {['P', 'M', 'G', 'GG'].map(size => (
                  <Button key={size} variant="outline" size="sm">
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-muted-foreground">
                Mostrando {sortedProducts.length} resultados
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destaques</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Carregando...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
