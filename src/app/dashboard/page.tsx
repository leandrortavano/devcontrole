import { Container } from "@/components/Container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import Link from 'next/link';
import { TicketRow } from '@/app/dashboard/components/TicketRow';

export default async function Dashboard() {

    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
        redirect('/')
    }

    return (

        <Container>
            <main className="mt-9 mb-2 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Chamados</h1>
                    <Link href="/dashboard/new" className="bg-blue-500 rounded text-white font-semibold px-4.5 py-1.5">Novo Chamado</Link>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left">Cliente</th>
                            <th className="font-medium text-left">Data Cadastro</th>
                            <th className="font-medium text-left">Status</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>


                    <tbody>
                        <TicketRow />
                        <TicketRow />
                        <TicketRow />
                        <TicketRow />

                    </tbody>
                </table>
            </main>
        </Container>
    )
}