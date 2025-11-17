import { useState, useEffect } from "react";
import { UserRound, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import ProfileSectionDropdown from "../components/DropdownLists";
import CarsDropdown from "../components/CarsDropdown";
import { getUser } from "../api/user";
import { getCars } from "../api/cars";
import Toast from "../components/Toast";

export default function UserProfile() {
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await getUser(userId);
                setUser(userData);
                setToastType("success");
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setToastMessage("Failed to load user profile");
                setToastType("error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const fetchCars = async () => {
        try {
            const carsData = await getCars(userId);
            setCars(carsData || []);
        } catch (err) {
            console.error("Failed to fetch cars:", err);
            setToastMessage("Failed to load cars");
            setToastType("error");
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleLogout = () => {
        setToastMessage("Logout functionality coming soon");
        setToastType("info");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    onClose={() => setToastMessage("")}
                    type={toastType}
                />
            )}

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
                    {loading ? "Loading..." : user?.name || "User"}
                </h2>
            </div>

            {/* Profile Sections */}
            <div className="max-w-2xl mx-auto px-4 py-2 space-y-3">
                <ProfileSectionDropdown
                    title="Frequent Locations"
                    isOpen={expandedSection === "locations"}
                    onToggle={() => toggleSection("locations")}
                >
                    <p className="text-sm text-gray-600">Frequent locations functionality coming soon.</p>
                </ProfileSectionDropdown>

                <CarsDropdown
                    isOpen={expandedSection === "cars"}
                    onToggle={() => toggleSection("cars")}
                    userId={userId}
                    cars={cars}
                    onCarsUpdated={fetchCars}
                />

                <ProfileSectionDropdown
                    title="Security Settings"
                    isOpen={expandedSection === "security"}
                    onToggle={() => toggleSection("security")}
                >
                    <p className="text-sm text-gray-600">Security settings functionality coming soon.</p>
                </ProfileSectionDropdown>

                <ProfileSectionDropdown
                    title="Accessibility"
                    isOpen={expandedSection === "accessibility"}
                    onToggle={() => toggleSection("accessibility")}
                >
                    <p className="text-sm text-gray-600">Accessibility functionality coming soon.</p>
                </ProfileSectionDropdown>

                {/* Log Out Button */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleLogout}
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
