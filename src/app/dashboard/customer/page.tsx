import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { CustomerItem } from "@/app/dashboard/components/CustomerItem";
import prismaClient from '@/lib/prisma'
import { CustomerProps } from "@/utils/customer.type";

export default async function Customers() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user)
        redirect('/');

    const customers = await prismaClient.customer.findMany({
        where: { ownerId: session?.user.id }
    })
    console.log(customers)

    return (
        <Container>
            <main className="w-full mt-9 mb-2">
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-green-500 py-1.5 font-semibold px-4.5 text-white rounded">
                        Novo Cliente
                    </Link>
                </div>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {customers && customers.map(c => (
                        <CustomerItem customer={c} key={c.id} />
                    ))}

                </div>

                {!customers.length && <p>Nenhum cliente encontrado!</p>}
            </main>

        </Container>
    )
}