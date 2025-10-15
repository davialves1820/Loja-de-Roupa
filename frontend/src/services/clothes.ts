import { Product } from "@/components/Product";

const API_URL = "https://loja-de-roupa.onrender.com/clothes";

// Buscar todas as roupas disponíveis
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/availables`, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!data.success || !Array.isArray(data.body)) {
    throw new Error("Erro ao buscar roupas");
  }

  return data.body.map((item: any): Product => ({
    id: item._id,
    name: item.name,
    price: item.price,
    description: item.description,
    category: item.category,
    inStock: item.variations?.some((v: any) => v.stock > 0) || false,
    variations: item.variations || [],
    image: item.image && item.image.length > 0 ? item.image : ["/placeholder.jpg"],
  }));
};

// Buscar roupa por ID
export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data.body)
  if (!data.success) {
    throw new Error("Produto não encontrado");
  }

  const item = data.body;

  return {
    id: item._id,
    name: item.name,
    price: item.price,
    description: item.description,
    category: item.category,
    inStock: item.variations?.some((v: any) => v.stock > 0) || false,
    variations: item.variations || [],
    image: item.image && item.image.length > 0 ? item.image : ["/placeholder.jpg"],
  };
};
