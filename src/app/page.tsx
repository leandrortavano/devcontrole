import Image from "next/image";
import heroImg from '@/assets/hero.svg';


export default function Home() {
  return (
    <div className="">
      <main className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
        <h2 className="font-medium text-2xl">Gerencie sua Empresa</h2>
        <h3 className="font-bold text-blue-500 text-3xl mb-6">Atendimentos e Clientes</h3>
        <Image 
        src={heroImg}
        alt="Logo"
        width={600}
        className="max-w-sm md:max-w-xl" />
      </main>
    </div>
  );
}
