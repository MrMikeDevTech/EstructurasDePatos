export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-primary-white font-kalam flex min-h-dvh flex-1 flex-row gap-5 p-5">{children}</section>
    );
}
