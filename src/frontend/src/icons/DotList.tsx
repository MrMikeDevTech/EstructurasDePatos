export default function DotList({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="20"
            height="16"
            fill="none"
            viewBox="0 0 20 16"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M6.75.75h12M.75.75h2M6.75 7.75h12M.75 7.75h2M6.75 14.75h12M.75 14.75h2"
            />
        </svg>
    );
}
