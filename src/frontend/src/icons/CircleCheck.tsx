export default function CircleCheck({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
        >
            <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M12.417 6.583a5.833 5.833 0 1 0-11.667 0 5.833 5.833 0 0 0 11.667 0Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m4.25 6.875 1.458 1.458 3.209-3.5"
            />
        </svg>
    );
}
