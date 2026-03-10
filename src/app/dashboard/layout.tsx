import HeaderDash from "@/app/dashboard/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderDash>
            </HeaderDash>
            {children}
        </>
    )
}