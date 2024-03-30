import ThemeAdmin from "@/components/admin/ThemeAdmin"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <ThemeAdmin>
            {children}
        </ThemeAdmin>
    )
}