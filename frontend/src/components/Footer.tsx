import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-muted mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">ATELIER</h3>
            <p className="text-sm text-muted-foreground">
              Moda atemporal e elegante para quem valoriza qualidade e estilo.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-accent transition-smooth">Todos os Produtos</Link></li>
              <li><Link to="/products?category=Novidades" className="hover:text-accent transition-smooth">Novidades</Link></li>
              <li><Link to="/products?category=Sale" className="hover:text-accent transition-smooth">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-smooth">Envio e Entrega</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Devoluções</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Guia de Tamanhos</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ATELIER. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
