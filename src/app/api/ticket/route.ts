import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from '@/lib/prisma';
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
        return NextResponse.json({ error: "not authorized" }, { status: 400 });
    }

    const { id } = await request.json();

    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            id: id,
            signedTo: session.user.id
        }
    })

    if (!findTicket) {
        return NextResponse.json({ message: "Erro: Ticket Not found" }, { status: 404 })
    }

    try {
        await prismaClient.ticket.update({
            where: { id: id, signedTo: session.user?.id },
            data: { status: "2" }
        })
        return NextResponse.json({ message: "Status changed" }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Erro: Bad request" }, { status: 400 })
    }






}