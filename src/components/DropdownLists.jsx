import { ChevronDown } from "lucide-react";

export default function DropdownLists({ title, isOpen, onToggle, children }) {
    return (
        <div>
            <button
                onClick={onToggle}
                className="w-full rounded-3xl px-6 py-4 flex items-center justify-between transition-all hover:shadow-md"
                style={{
                    backgroundColor: "oklch(95.3% 0.051 180.801)",
                }}
                aria-expanded={isOpen}
                aria-label={`Toggle ${title} dropdown`}
            >
                <span
                    className="text-lg font-semibold text-center flex-1"
                    style={{ color: "oklch(39.1% 0.09 240.876)" }}
                >
                    {title}
                </span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
                        }`}
                    style={{ color: "oklch(39.1% 0.09 240.876)" }}
                />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="mt-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
}
