export interface Provider {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}
  
export interface ProviderState {
    providers: Provider[];
}