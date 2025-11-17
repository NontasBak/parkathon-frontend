import { X } from "lucide-react";

export default function AddCarPopUp({ isOpen, onClose, carLabel, setCarLabel, onSave, isLoading, isEditing }) {
    if (!isOpen) return null;

    const isLabelEmpty = !carLabel.trim();

    return (
        <>
            {/* Blurred Background */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4">
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
                            {isEditing ? "Edit Car" : "Add Car"}
                        </h2>
                    </div>

                    {/* Label Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="car-label"
                            className="block text-sm font-medium mb-2 text-gray-700"
                        >
                            Label
                        </label>
                        <input
                            id="car-label"
                            type="text"
                            value={carLabel}
                            onChange={(e) => setCarLabel(e.target.value)}
                            placeholder="Enter car label (e.g., My Tesla)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-2 transition-colors"
                            style={{ focusBorderColor: "oklch(77.7% 0.152 181.912)" }}
                            disabled={isLoading}
                            autoFocus
                        />
                    </div>

                    {/* Action Buttons */}
                    <button
                        onClick={onSave}
                        className="w-full px-4 py-3 rounded-xl text-white font-semibold transition-all"
                        style={{
                            backgroundColor: isLabelEmpty
                                ? "oklch(80% 0 0)"
                                : "oklch(39.1% 0.09 240.876)",
                            cursor: isLabelEmpty ? "not-allowed" : "pointer",
                            opacity: isLabelEmpty ? 0.5 : 1,
                        }}
                        disabled={isLabelEmpty || isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </>
    );
}
