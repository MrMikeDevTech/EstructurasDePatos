export default function X({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m14.75.75-14 14m0-14 14 14"
            />
        </svg>
    );
}
