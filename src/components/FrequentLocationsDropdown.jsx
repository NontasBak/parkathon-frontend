import { useState } from "react";
import { ChevronDown, MapPin, Edit2, Trash2, Home, Briefcase, GraduationCap, TreePine, Dumbbell, ShoppingCart } from "lucide-react";
import { addFrequentLocation, editFrequentLocation, deleteFrequentLocation } from "../api/frequentLocations";
import Toast from "./Toast";
import AddFrequentLocationPopUp from "./AddFrequentLocationPopUp";

const ICON_MAP = {
    Home: Home,
    Work: Briefcase,
    University: GraduationCap,
    DogPark: TreePine,
    Gym: Dumbbell,
    Supermarket: ShoppingCart,
};

export default function FrequentLocationsDropdown({
    isOpen,
    onToggle,
    userId,
    frequentLocations,
    onLocationsUpdated,
    showAddModal,
    setShowAddModal
}) {
    const [localShowAddModal, setLocalShowAddModal] = useState(false);
    const [editingLocationId, setEditingLocationId] = useState(null);
    const [address, setAddress] = useState("");
    const [label, setLabel] = useState("");
    const [icon, setIcon] = useState("Home");
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use either the prop or local state (for backward compatibility)
    const actualShowAddModal = showAddModal !== undefined ? showAddModal : localShowAddModal;
    const setActualShowAddModal = setShowAddModal || setLocalShowAddModal;

    const handleAddLocation = async () => {
        if (!address.trim() || !label.trim()) {
            setToastMessage("Please fill in all required fields");
            setToastVisible(true);
            return;
        }

        try {
            setIsLoading(true);
            await addFrequentLocation(userId, {
                address: address.trim(),
                label: label.trim(),
                icon: icon
            });
            setToastMessage("Frequent locations updated");
            setToastVisible(true);
            setAddress("");
            setLabel("");
            setIcon("Home");
            setActualShowAddModal(false);
            onLocationsUpdated(); // Refresh the locations list
        } catch (err) {
            console.error("Error adding frequent location:", err);
            const errorMsg = err.response?.data?.message || "Failed to add location";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditLocation = async () => {
        if (!address.trim() || !label.trim()) {
            setToastMessage("Please fill in all required fields");
            setToastVisible(true);
            return;
        }

        try {
            setIsLoading(true);
            await editFrequentLocation(userId, editingLocationId, {
                address: address.trim(),
                label: label.trim(),
                icon: icon
            });
            setToastMessage("Frequent locations updated");
            setToastVisible(true);
            setAddress("");
            setLabel("");
            setIcon("Home");
            setEditingLocationId(null);
            setActualShowAddModal(false);
            onLocationsUpdated(); // Refresh the locations list
        } catch (err) {
            console.error("Error editing frequent location:", err);
            const errorMsg = err.response?.data?.message || "Failed to edit location";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteLocation = async (locationId) => {
        try {
            setIsLoading(true);
            await deleteFrequentLocation(userId, locationId);
            setToastMessage("Frequent locations updated");
            setToastVisible(true);
            onLocationsUpdated(); // Refresh the locations list
        } catch (err) {
            console.error("Error deleting frequent location:", err);
            const errorMsg = err.response?.data?.message || "Failed to delete location";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getIconComponent = (iconName) => {
        return ICON_MAP[iconName] || MapPin;
    };

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
                aria-label="Toggle Frequent Locations dropdown"
            >
                <span
                    className="text-lg font-semibold text-center flex-1"
                    style={{ color: "oklch(39.1% 0.09 240.876)" }}
                >
                    Frequent Locations
                </span>
                <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
                        }`}
                    style={{ color: "oklch(39.1% 0.09 240.876)" }}
                />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="mt-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-3">
                    {/* Add New Location Button */}
                    <button
                        onClick={() => {
                            setActualShowAddModal(true);
                            setAddress("");
                            setLabel("");
                            setIcon("Home");
                        }}
                        className="w-full py-3 rounded-xl text-white font-semibold transition-opacity"
                        style={{
                            backgroundColor: "oklch(39.1% 0.09 240.876)",
                        }}
                    >
                        Add new
                    </button>

                    {/* Locations List */}
                    <div className="space-y-2">
                        {frequentLocations && frequentLocations.length > 0 ? (
                            frequentLocations.map((location) => {
                                const IconComponent = getIconComponent(location.icon);
                                return (
                                    <div
                                        key={location._id || location.location_id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <IconComponent
                                                className="w-5 h-5 flex-shrink-0"
                                                style={{ color: "oklch(77.7% 0.152 181.912)" }}
                                            />
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="font-medium text-gray-800">
                                                    {location.label}
                                                </span>
                                                <span className="text-sm text-gray-500 truncate">
                                                    {location.address}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Edit and Delete Buttons */}
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => {
                                                    setEditingLocationId(location._id || location.location_id);
                                                    setAddress(location.address);
                                                    setLabel(location.label);
                                                    setIcon(location.icon || "Home");
                                                    setActualShowAddModal(true);
                                                }}
                                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                                                style={{ backgroundColor: "oklch(60.9% 0.126 221.723)" }}
                                                aria-label="Edit location"
                                            >
                                                <Edit2
                                                    className="w-4 h-4"
                                                    style={{ color: "white" }}
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLocation(location._id || location.location_id)}
                                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                                                style={{ backgroundColor: "oklch(71.2% 0.194 13.428)" }}
                                                aria-label="Delete location"
                                            >
                                                <Trash2
                                                    className="w-4 h-4"
                                                    style={{ color: "white" }}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-2">
                                No frequent locations added yet
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Add/Edit Location PopUp Modal */}
            <AddFrequentLocationPopUp
                isOpen={actualShowAddModal}
                onClose={() => {
                    setActualShowAddModal(false);
                    setAddress("");
                    setLabel("");
                    setIcon("Home");
                    setEditingLocationId(null);
                }}
                address={address}
                setAddress={setAddress}
                label={label}
                setLabel={setLabel}
                icon={icon}
                setIcon={setIcon}
                onSave={editingLocationId ? handleEditLocation : handleAddLocation}
                isLoading={isLoading}
                isEditing={!!editingLocationId}
            />
        </div>
    );
}
