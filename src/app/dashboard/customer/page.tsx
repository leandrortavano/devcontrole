import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Customers() {
    const session = await getServerSession(authOptions);
    
    if(!session || !session.user)
        redirect('/');
    return (
        <Container>
            <h3>Clientes</h3>
        </Container>
    )
}