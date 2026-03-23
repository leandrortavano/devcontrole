"use client"
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import Link from 'next/link';
import { TicketProps } from '@/utils/ticket.type';
import { CustomerProps } from '@/utils/customer.type';
import { statusTicket } from '@/utils/status';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}



export function TicketRow({ customer, ticket }: TicketItemProps) {
    const route = useRouter();

    async function handleTicketAttende() {
        try {
            const response = await api.patch('/api/ticket', {
                id: ticket.id
            })
            route.refresh();
        } catch (err) {

        }
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 even:bg-gray-200 odd:bg-gray-100 hover:bg-gray-100 duration-300">
                <td className='text-left'><span className='pl-1'>{customer?.name}</span></td>
                <td className='text-left'>{ticket?.created_at?.toLocaleDateString('pt-br')}</td>
                <td className='text-left'><span className="bg-green-600 py-1 px-2 rounded font-semibold">{statusTicket[ticket.status as keyof typeof statusTicket].label}</span></td>
                <td className='text-left'>
                    <div className='flex items-center gap-3'>

                        <button className="cursor-pointe" onClick={handleTicketAttende}>
                            <FiCheckSquare size={26} color="green" />
                        </button>
                        <button>
                            <FiFile size={26} color="blue" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}