import { useState, useEffect } from "react";

interface HorizontalTabsProps {
    tabs: { key: string; label: string }[];
    initialActiveTab?: string;
    onTabChange?: (index: number, key: string) => void;
    className?: string;
}

export default function HorizontalTabs({
    tabs,
    initialActiveTab = "Todos",
    onTabChange,
    className = ""
}: HorizontalTabsProps) {
    const initialIndex = tabs.findIndex((t) => t.key === initialActiveTab);
    const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

    const handleClick = (i: number) => {
        if (i === activeIndex) return;
        setActiveIndex(i);
        const key = tabs[i].key;
        onTabChange?.(i, key);
    };

    useEffect(() => {
        const i = tabs.findIndex((t) => t.key === initialActiveTab);
        if (i !== -1) setActiveIndex(i);
    }, [initialActiveTab]);

    const padPx = 8;
    const indicatorWidth = tabs.length > 0 ? `calc((100% - ${padPx * 2}px) / ${tabs.length})` : "0px";
    const indicatorLeft =
        tabs.length > 0 ? `calc((100% - ${padPx * 2}px) * ${activeIndex} / ${tabs.length} + ${padPx}px)` : "0px";

    return (
        <div className={`mt-8 flex w-full justify-center px-4 ${className}`}>
            <div className="bg-primary-beige relative flex w-full max-w-4xl overflow-hidden rounded-full p-2 shadow-md">
                <div
                    className="bg-primary-active absolute top-1/2 h-[85%] -translate-y-1/2 rounded-full shadow-sm transition-all duration-300"
                    style={{
                        width: indicatorWidth,
                        left: indicatorLeft
                    }}
                />

                {tabs.map((tab, i) => (
                    <button
                        key={tab.key}
                        onClick={() => handleClick(i)}
                        className={`relative z-10 flex-1 cursor-pointer rounded-full py-3 text-center text-sm font-bold whitespace-nowrap transition-colors ${activeIndex === i ? "text-black" : "text-gray-600 hover:text-black"} `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
