export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    provider_name: string;
    provider_id: number;
}

export interface ProductState {
    products: Product[];
}