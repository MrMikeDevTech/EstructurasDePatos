export default function Disgusting({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
        >
            <circle
                cx="6.583"
                cy="6.583"
                r="5.833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.833 9.5a2.9 2.9 0 0 1 1.75-.583c.657 0 1.263.217 1.75.583M3.667 4.256s.822-.074 1.28.29m0 0-.153.487c-.06.192.098.384.317.384.23 0 .383-.208.264-.388a2.1 2.1 0 0 0-.427-.483m2.803-.29s.822-.074 1.28.29m0 0-.153.487c-.06.192.098.384.318.384.23 0 .382-.208.264-.388a2.1 2.1 0 0 0-.428-.483"
            />
        </svg>
    );
}
