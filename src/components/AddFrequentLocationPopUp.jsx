import { X, Home, Briefcase, GraduationCap, TreePine, Dumbbell, ShoppingCart } from "lucide-react";

const ICON_OPTIONS = [
    { value: "Home", icon: Home, label: "Home" },
    { value: "Work", icon: Briefcase, label: "Work" },
    { value: "University", icon: GraduationCap, label: "University" },
    { value: "DogPark", icon: TreePine, label: "Dog Park" },
    { value: "Gym", icon: Dumbbell, label: "Gym" },
    { value: "Supermarket", icon: ShoppingCart, label: "Supermarket" },
];

export default function AddFrequentLocationPopUp({
    isOpen,
    onClose,
    address,
    setAddress,
    label,
    setLabel,
    icon,
    setIcon,
    onSave,
    isLoading,
    isEditing,
}) {
    if (!isOpen) return null;

    const isFormValid = address.trim() && label.trim();

    return (
        <>
            {/* Blurred Background */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto">
                    {/* Header with Close Button */}
                    <div className="flex items-center justify-center mb-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" style={{ color: "oklch(39.1% 0.09 240.876)" }} />
                        </button>
                        <h2 className="text-2xl font-semibold" style={{ color: "oklch(39.1% 0.09 240.876)" }}>
                            {isEditing ? "Edit location" : "Add location"}
                        </h2>
                    </div>

                    {/* Address Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="location-address"
                            className="block text-sm font-medium mb-2 text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            id="location-address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-2 transition-colors"
                            style={{ focusBorderColor: "oklch(77.7% 0.152 181.912)" }}
                            disabled={isLoading}
                            autoFocus
                        />
                    </div>

                    {/* Label Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="location-label"
                            className="block text-sm font-medium mb-2 text-gray-700"
                        >
                            Label
                        </label>
                        <input
                            id="location-label"
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Enter label (e.g., Home, Work)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-2 transition-colors"
                            style={{ focusBorderColor: "oklch(77.7% 0.152 181.912)" }}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Icon Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium mb-3 text-gray-700">
                            Icon
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {ICON_OPTIONS.map((option) => {
                                const IconComponent = option.icon;
                                const isSelected = icon === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setIcon(option.value)}
                                        className="flex items-center justify-center p-4 border-2 rounded-xl transition-all hover:shadow-md"
                                        style={{
                                            borderColor: isSelected
                                                ? "oklch(39.1% 0.09 240.876)"
                                                : "oklch(90% 0 0)",
                                            backgroundColor: isSelected
                                                ? "oklch(95.3% 0.051 180.801)"
                                                : "white",
                                        }}
                                        disabled={isLoading}
                                        aria-label={`Select ${option.label} icon`}
                                    >
                                        <IconComponent
                                            className="w-6 h-6"
                                            style={{
                                                color: isSelected
                                                    ? "oklch(39.1% 0.09 240.876)"
                                                    : "oklch(60% 0 0)",
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={onSave}
                        className="w-full px-4 py-3 rounded-xl text-white font-semibold transition-all"
                        style={{
                            backgroundColor: isFormValid
                                ? "oklch(39.1% 0.09 240.876)"
                                : "oklch(80% 0 0)",
                            cursor: isFormValid ? "pointer" : "not-allowed",
                            opacity: isFormValid ? 1 : 0.5,
                        }}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </>
    );
}
