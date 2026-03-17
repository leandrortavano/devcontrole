import { Container } from "@/components/Container"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { authOptions } from "@/lib/auth";
import { NewCustomerForm } from "../../components/Form";


export default async function NewCustomer() {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect('/')
    }
    return (
        <Container>
            <main className="w-full flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customer" className="bg-gray-950 text-white px-4 py-1 rounded">Voltar</Link>
                    <h2 className="text-3xl font-bold">Novo Cliente</h2>
                </div>

                <NewCustomerForm />

            </main>
        </Container>

    )
}