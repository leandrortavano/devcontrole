import Link from 'next/link';
import { FiUser, FiLogOut } from 'react-icons/fi';
export function Header() {
    return (
        <header className="w-full flex px-2 h-20 bg-white shadow-sm">
            <div className="w-full flex max-w-7xl mx-auto items-center justify-between">
                <div>
                    <Link href="/">
                        <h1 className='text-2x1 pl-1 font-bold hover:tracking-widest duration-300'><span className='text-blue-500'>DEV</span>CONTROLE</h1>
                    </Link>
                </div>
                <div className='flex items-center px-2 gap-2'>
                    <buttton>
                        <Link href='/dashboard'>
                            <FiUser color="#4b5563" size={26} />
                        </Link>

                    </buttton>
                    <buttton>

                        <FiLogOut size={26} color="#4b5563" />

                    </buttton>
                </div>
            </div>

        </header>
    )
}