export default function CheckList({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M11 6h10M11 12h10M11 18h10" />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 7.393S4 8.045 4.5 9C4.5 9 6 5.25 8 4M3 18.393S4 19.045 4.5 20c0 0 1.5-3.75 3.5-5"
            />
        </svg>
    );
}
