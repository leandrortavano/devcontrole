export interface TicketProps{
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: Date;
    updated_at: Date | null;
    customerId: string;
    signedTo: string
}