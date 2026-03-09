import { PrismaClient } from '@prisma/client';
//evita recriar conexoes com o prisma no desenvlvimento. Joga para um ojbto global a conexao se já existir

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    let globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient;
    }
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient()
    }
    prisma = globalWithPrisma.prisma;
}

export default prisma;