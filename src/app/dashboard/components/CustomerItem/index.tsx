import { CustomerProps } from "@/utils/customer.type"

export function CustomerItem({ customer }: { customer: CustomerProps }) {
    return (
        <div className="border-2 flex flex-col gap-2 min-w-10 rounded-b-sm rounded py-2 px-3 border-gray-100 hover:scale-105 duration-300">
            <div><b>Nome:</b> <span>{customer.name}</span></div>
            <div><b>E-mail:</b> <span>{customer.email}</span></div>
            <div><b>Telefone:</b> <span>{customer.phone}</span></div>


            <button className="text-white self-start mt-2 bg-red-600 text-xs py-1 px-2 rounded cursor-pointer">Deletar</button>


        </div>
    )
}