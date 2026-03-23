import { Container } from "@/components/Container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';
import prismaClient from "@/lib/prisma";


export default async function NewTicket() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/');
    }

    const customersList = await prismaClient.customer.findMany({
        where: { ownerId: session.user.id }
    })

    async function handleNewTicket(formData: FormData) {
        "use server"

        
            await prismaClient.ticket.create({
                data: {
                    title: formData.get("title") as string,
                    description: formData.get("description") as string,
                    customerId: formData.get("customer") as string,
                    status: "1" as string,
                    signedTo: session?.user.id as string,
                    createdById: session?.user.id as string
                }
            });
            
            redirect("/dashboard");

    }

    return (
        <Container>
            <main className="w-full mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white bg-gray-900 px-4 py-2 rounded">Voltar</Link>
                    <h1 className="text-3xl font-bold">Novo chamado</h1>
                </div>

                <form className="flex flex-col mt-6" method="POST" action={handleNewTicket}>
                    <label className="mb-1 font-medium text-lg">Título</label>
                    <input
                        type="text"
                        placeholder="Digite o título"
                        required
                        className="w=-full border-2 rounded-md px-2 h-11 mb-2"
                        name="title"
                    />

                    <label className="mb-1 font-medium text-lg">Descrição</label>
                    <textarea name="description"
                        placeholder="Digite a descrição do problema"
                        required
                        className="w=-full border-2 rounded-md px-2 h-24 resize-none mb-2"
                    ></textarea>

                    <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                    <select name="customer" className="w=-full border-2 rounded-md px-2 h-11 resize-none mb-2 bg-white">
                        <option value=""> Selecione...</option>
                        {customersList && customersList.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <button type="submit"
                        disabled={customersList.length === 0}
                        className="bg-blue-500 cursor-pointer text-white h-11 px-2 rounded font-bold my-4 disabled:bg-gray-400">Cadastrar</button>
                </form>
            </main>
        </Container>
    )
}