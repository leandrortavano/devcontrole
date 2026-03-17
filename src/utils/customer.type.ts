export interface CustomerProps{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string | null;
    created_at: Date;
    updated_at: Date | null;
    ownerId: string;
    created_by: string;
}