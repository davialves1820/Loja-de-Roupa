import { Link } from 'react-router-dom';
import { Product } from '../components/Product';
import { Card, CardContent } from '@/components/card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Verifica se alguma variação está em estoque
  const inStock = product.variations?.some(v => v.stock > 0);

  // Pega a primeira imagem, se for array
  const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <Link to={`/clothes/${product.id}`} className="group">
      <Card className="border-0 shadow-none bg-transparent overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-sm font-medium">Esgotado</span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-sm group-hover:text-accent transition-smooth">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <p className="font-medium">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
