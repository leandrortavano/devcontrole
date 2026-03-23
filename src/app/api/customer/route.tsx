import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import prismaClient from '@/lib/prisma';
import { ca } from 'zod/v4/locales';
import { use } from 'react';

export async function POST(request: Request) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const idUser = session?.user?.id;
    const { nome, phone, email, address } = await request.json();

    try {

        await prismaClient.customer.create({
            data: {
                name: nome,
                phone: phone,
                email: email,
                address: address ? address : '',
                ownerId: idUser,
                created_by: idUser
            }

        });

        return NextResponse.json({ message: "Created succefully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

}

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id") as string;

    if (!userId) {
        return NextResponse.json({ message: "undefined Id" }, { status: 400 });
    }

    try {
        await prismaClient.customer.deleteMany({
            where: { id: userId, ownerId: session.user.id }
        })

        return NextResponse.json({ message: "deletado com sucesso" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }



}