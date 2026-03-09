"use client";
import Link from 'next/link';
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

async function handleLogin() {
    await signIn();
}

async function handleLogOut() {
    await signOut();
}

export function Header() {

    const { status, data } = useSession();


    return (
        <header className="w-full flex px-2 h-20 bg-white shadow-sm">
            <div className="w-full flex max-w-7xl mx-auto items-center justify-between">
                <div>
                    <Link href="/">
                        <h1 className='text-2x1 pl-1 font-bold hover:tracking-widest duration-300'><span className='text-blue-500'>DEV</span>CONTROLE!</h1>
                    </Link>
                </div>


                {status === 'loading' && (

                    <button className='animate-spins'>
                        <FiLoader size={26} color="#4b5563" />
                    </button>
                )}

                {status === 'unauthenticated' && (
                    <button className='cursor-pointer' onClick={handleLogin}>
                        <FiLock size={26} color="#4b5563" />
                    </button>
                )}

                {status === 'authenticated' && (
                    <div className='flex items-center px-2 gap-2'>
                        <button className='cursor-pointer'>
                            <Link href='/dashboard'>
                                <FiUser color="#4b5563" size={26} />
                            </Link>

                        </button>
                        <button className='cursor-pointer' onClick={handleLogOut}>
                            <FiLogOut size={26} color="#4b5563" />
                        </button>
                    </div>
                )}


            </div>

        </header>
    )
}