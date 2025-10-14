export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean; // true se houver pelo menos uma variação em estoque
    variations: {
        size: string;
        stock: number;
    }[];
    image: string[];
}
