import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/sheet';
import { useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const Header = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px]">
              {/* Título acessível para leitores de tela */}
              <DialogTitle>
                <VisuallyHidden>Menu de navegação</VisuallyHidden>
              </DialogTitle>

              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/clothes" 
                  className="text-lg font-medium hover:text-accent transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
                <Link 
                  to="/clothes?category=Novidades" 
                  className="text-lg font-medium hover:text-accent transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Novidades
                </Link>
                <Link 
                  to="/clothes?category=Sale" 
                  className="text-lg font-medium hover:text-accent transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sale
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
            XPG
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/clothes" className="text-sm font-medium hover:text-accent transition-smooth">
              Produtos
            </Link>
            <Link to="/clothes?category=Novidades" className="text-sm font-medium hover:text-accent transition-smooth">
              Novidades
            </Link>
            <Link to="/clothes?category=Sale" className="text-sm font-medium hover:text-accent transition-smooth">
              Sale
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link to={"/profile"}>
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
