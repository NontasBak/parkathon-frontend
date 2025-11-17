import { useState } from "react";
import { UserRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import DropdownLists from "../components/DropdownLists";

export default function UserProfile() {
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Back Button */}
            <div className="pt-4 pl-4">
                <button
                    onClick={handleBack}
                    className="flex flex-col items-center gap-1 p-2 hover:opacity-75 transition-opacity"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-6 h-6" style={{ color: "oklch(39.1% 0.09 240.876)" }} />
                    <span className="text-xs font-medium" style={{ color: "oklch(39.1% 0.09 240.876)" }}>
                        Back
                    </span>
                </button>
            </div>

            {/* User Profile Header */}
            <div className="flex flex-col items-center justify-center pt-4 pb-4">
                <div
                    className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg mb-4"
                    style={{ backgroundColor: "oklch(95.3% 0.051 180.801)" }}
                >
                    <UserRound className="w-16 h-16" style={{ color: "oklch(77.7% 0.152 181.912)" }} />
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: "oklch(39.1% 0.09 240.876)" }}>
                    Maria Charisi
                </h2>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-2 space-y-3">
                {/* Frequent Locations Section */}
                <DropdownLists
                    title="Frequent Locations"
                    isOpen={expandedSection === "locations"}
                    onToggle={() => toggleSection("locations")}
                >
                    <p className="text-sm text-gray-600">Frequent locations functionality coming soon.</p>
                </DropdownLists>

                {/* Cars Section */}
                <DropdownLists
                    title="Cars"
                    isOpen={expandedSection === "cars"}
                    onToggle={() => toggleSection("cars")}
                >
                    <p className="text-sm text-gray-600">Cars functionality coming soon.</p>
                </DropdownLists>

                {/* Security Settings Section */}
                <DropdownLists
                    title="Security Settings"
                    isOpen={expandedSection === "security"}
                    onToggle={() => toggleSection("security")}
                >
                    <p className="text-sm text-gray-600">Security settings functionality coming soon.</p>
                </DropdownLists>

                {/* Accessibility Section */}
                <DropdownLists
                    title="Accessibility"
                    isOpen={expandedSection === "accessibility"}
                    onToggle={() => toggleSection("accessibility")}
                >
                    <p className="text-sm text-gray-600">Accessibility functionality coming soon.</p>
                </DropdownLists>

                {/* Log Out Button */}
                <div className="flex justify-center pt-4">
                    <button
                        className="px-6 py-2 rounded-xl text-white font-semibold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "oklch(39.1% 0.09 240.876)" }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
