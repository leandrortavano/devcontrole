import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import prismaClient from '@/lib/prisma';

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