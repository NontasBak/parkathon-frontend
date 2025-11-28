import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getUser, updateUser } from "../api/user";
import Toast from "./Toast";

const MOCK_USER_ID = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

export default function AccessibilityDropdown({ isOpen, onToggle, userId }) {
    const [accessibility, setAccessibility] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load user's accessibility status on mount
    useEffect(() => {
        const loadAccessibility = async () => {
            try {
                const user = await getUser(userId || MOCK_USER_ID);
                if (user && user.accessibility !== undefined) {
                    setAccessibility(user.accessibility);
                }
            } catch (error) {
                console.error("Error loading accessibility status:", error);
            }
        };

        loadAccessibility();
    }, [userId]);

    const handleToggle = async () => {
        const newValue = !accessibility;
        setAccessibility(newValue);

        try {
            setIsLoading(true);
            await updateUser(userId || MOCK_USER_ID, { accessibility: newValue });
        } catch (error) {
            console.error("Error updating accessibility:", error);
            // Revert on error
            setAccessibility(!newValue);
            setToastMessage("Failed to update accessibility status");
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const darkBlue = "oklch(39.1% 0.09 240.876)";

    return (
        <div>
            <Toast
                message={toastMessage}
                isVisible={toastVisible}
                onClose={() => setToastVisible(false)}
                duration={3000}
            />

            <button
                onClick={onToggle}
                className="w-full rounded-3xl px-6 py-4 flex items-center justify-between transition-all hover:shadow-md"
                style={{
                    backgroundColor: "oklch(95.3% 0.051 180.801)",
                }}
                aria-expanded={isOpen}
                aria-label="Toggle Accessibility dropdown"
            >
                <span
                    className="text-lg font-semibold text-center flex-1"
                    style={{ color: darkBlue }}
                >
                    Accessibility
                </span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
                        }`}
                    style={{ color: darkBlue }}
                />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="mt-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-base font-medium text-gray-800">
                            Show accessible parking spots
                        </span>

                        {/* Toggle Switch */}
                        <button
                            onClick={handleToggle}
                            disabled={isLoading}
                            className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: accessibility ? darkBlue : "white",
                                border: `2px solid ${darkBlue}`,
                                focusRingColor: darkBlue,
                            }}
                            aria-label="Toggle accessibility"
                            role="switch"
                            aria-checked={accessibility}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full transition-transform ${accessibility ? "translate-x-6" : "translate-x-0.5"
                                    }`}
                                style={{
                                    backgroundColor: accessibility ? "white" : darkBlue,
                                }}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
