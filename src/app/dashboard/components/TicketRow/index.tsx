import { FiTrash, FiFile } from 'react-icons/fi'
import Link from 'next/link';

export function TicketRow() {
    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 even:bg-gray-200 odd:bg-gray-100 hover:bg-gray-100 duration-300">
                <td className='text-left'><span className='pl-1'>Leandro Tavano</span></td>
                <td className='text-left'>06/03/2025</td>
                <td className='text-left'><span className="bg-green-600 py-1 px-2 rounded font-semibold">Aberto</span></td>
                <td className='text-left'>

                    <button>
                        <FiTrash size={26} color="red" />
                    </button>
                    <button>
                        <FiFile size={26} color="blue" />
                    </button>
                </td>
            </tr>
        </>
    )
}