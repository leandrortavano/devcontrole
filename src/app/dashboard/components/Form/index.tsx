"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    zodResolver

} from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { api } from "@/lib/api"
import { useRouter } from 'next/navigation';

const schema = z.object({
    name: z.string().min(1, "O campo é obrigatório"),
    email: z.string().email("Digite um E-mail válido").min(1, "O email é obrigatório"),
    phone: z.string().refine((v) => {
        return /^(?:\(\d{2}\)s\?)?\d{9}$/.test(v) || /^\d{2}\s\d{9}$/.test(v) || /^\d{11}$/.test(v)
    }, { message: "O número de telefone é inválido" }),
    address: z.string(),

});

type FormData = z.infer<typeof schema>

export function NewCustomerForm() {

    const router = useRouter();


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function handleRegisterCustomer(data: FormData) {

        const response = await api.post("/api/customer", {
            nome: data.name,
            phone: data.phone,
            address: data.address,
            email: data.email
        });

        console.log(response);

        router.refresh();
        router.replace('/dashboard/customer');

    }


    return (
        <form className='flex flex-col mt-6 w-full' onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className='mb-1 text-lg font-medium'>Nome Completo</label>
            <Input type="text" name="name" error={errors.name?.message} placeholder="Digite o nome" register={register} />

            <section className='flex gap-2 my-2 flex-col sm:flex-row'>
                <div className="flex-1">
                    <label className='mb-1 text-lg font-medium'>Telefone</label>
                    <Input type="text" name="phone" error={errors.phone?.message} placeholder="Digite o telefone" register={register} />
                </div>
                <div className="flex-1">
                    <label className='mb-1 text-lg font-medium'>E-mail</label>
                    <Input type="email" name="email" error={errors.email?.message} placeholder="Digite o E-mail" register={register} />
                </div>
            </section>

            <label className='mb-1 text-lg font-medium'>Endereço</label>
            <Input type="text" name="address" error={errors.address?.message} placeholder="Digite o endereço do cliente" register={register} />


            <button type="submit" className='bg-blue-500 cursor-pointer px-2 h-11 my-4 font-bold text-white'>Cadastrar</button>
        </form >
    )
}