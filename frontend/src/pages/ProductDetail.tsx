import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/clothes';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group';
import { Label } from '@/components/label';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  const { data: product, isLoading } = useQuery({
    queryKey: ['clothes', id],
    queryFn: () => getProductById(id!),
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
      <Link to="/clothes">
        <Button variant="outline">Voltar para Produtos</Button>
      </Link>
    </div>
  );

  // Encontrar variação selecionada
  const selectedVariation = product.variations.find(v => v.size === selectedSize);
  const inStock = selectedVariation?.stock > 0;
  console.log(inStock)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }
    if (!inStock) {
      alert('Produto esgotado nesse tamanho');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    });

    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/clothes" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-smooth">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagens */}
          <div className="space-y-4">
            {product.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Informações */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Seleção de Tamanho */}
            <div>
              <Label className="text-base font-medium mb-2 block">Tamanho</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex gap-3 flex-wrap">
                  {product.variations.map(v => (
                    <div key={v.size}>
                      <RadioGroupItem value={v.size} id={v.size} className="peer sr-only" />
                      <Label
                        htmlFor={v.size}
                        className={`flex items-center justify-center h-12 w-12 rounded-md border-2 border-muted bg-background cursor-pointer transition-smooth hover:border-primary
                          ${selectedSize === v.size ? 'border-primary' : ''}
                          ${v.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {v.size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Button size="lg" className="w-full mt-4" onClick={handleAddToCart} disabled={!inStock}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              {inStock ? 'Adicionar ao Carrinho' : 'Esgotado'}
            </Button>

            {/* Informações adicionais */}
            <div className="pt-8 border-t space-y-4 text-sm">
              <details className="group">
                <summary className="font-medium cursor-pointer flex justify-between items-center">
                  Envio e Entrega
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-muted-foreground mt-2">
                  Frete grátis para compras acima de R$ 299,90. Entrega em até 7 dias úteis.
                </p>
              </details>
              <details className="group">
                <summary className="font-medium cursor-pointer flex justify-between items-center">
                  Trocas e Devoluções
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-muted-foreground mt-2">
                  Você tem 30 dias para trocar ou devolver seu produto.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
