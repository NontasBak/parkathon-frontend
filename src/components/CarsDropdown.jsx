import { useState } from "react";
import { ChevronDown, CarFront, Edit2, Trash2 } from "lucide-react";
import { addCar, editCar, deleteCar } from "../api/cars";
import Toast from "./Toast";
import AddCarPopUp from "./AddCarPopUp";

export default function CarsDropdown({ isOpen, onToggle, userId, cars, onCarsUpdated, showAddModal, setShowAddModal }) {
    const [localShowAddModal, setLocalShowAddModal] = useState(false);
    const [editingCarId, setEditingCarId] = useState(null);
    const [carLabel, setCarLabel] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use either the prop or local state (for backward compatibility)
    const actualShowAddModal = showAddModal !== undefined ? showAddModal : localShowAddModal;
    const setActualShowAddModal = setShowAddModal || setLocalShowAddModal;

    const handleAddCar = async () => {
        if (!carLabel.trim()) {
            setToastMessage("Please enter a car label");
            setToastVisible(true);
            return;
        }

        try {
            setIsLoading(true);
            await addCar(userId, { label: carLabel });
            setToastMessage("Cars Updated");
            setToastVisible(true);
            setCarLabel("");
            setActualShowAddModal(false);
            onCarsUpdated(); // Refresh the cars list
        } catch (err) {
            console.error("Error adding car:", err);
            const errorMsg = err.response?.data?.message || "Failed to add car";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCar = async () => {
        if (!carLabel.trim()) {
            setToastMessage("Please enter a car label");
            setToastVisible(true);
            return;
        }

        try {
            setIsLoading(true);
            await editCar(userId, editingCarId, { label: carLabel });
            setToastMessage("Cars Updated");
            setToastVisible(true);
            setCarLabel("");
            setEditingCarId(null);
            setActualShowAddModal(false);
            onCarsUpdated(); // Refresh the cars list
        } catch (err) {
            console.error("Error editing car:", err);
            const errorMsg = err.response?.data?.message || "Failed to edit car";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCar = async (carId) => {
        try {
            setIsLoading(true);
            await deleteCar(userId, carId);
            setToastMessage("Cars Updated");
            setToastVisible(true);
            onCarsUpdated(); // Refresh the cars list
        } catch (err) {
            console.error("Error deleting car:", err);
            const errorMsg = err.response?.data?.message || "Failed to delete car";
            setToastMessage(errorMsg);
            setToastVisible(true);
        } finally {
            setIsLoading(false);
        }
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
                aria-label="Toggle Cars dropdown"
            >
                <span
                    className="text-lg font-semibold text-center flex-1"
                    style={{ color: "oklch(39.1% 0.09 240.876)" }}
                >
                    Cars
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
                    {/* Add New Car Button */}
                    <div>
                        <button
                            onClick={() => {
                                setActualShowAddModal(true);
                                setCarLabel("");
                            }}
                            disabled={cars && cars.length >= 3}
                            className="w-full py-3 rounded-xl text-white font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: cars && cars.length >= 3 ? "oklch(80% 0 0)" : "oklch(39.1% 0.09 240.876)",
                            }}
                        >
                            + Add New
                        </button>
                        {cars && cars.length >= 3 && (
                            <p className="text-sm italic text-center mt-2" style={{ color: "oklch(39.1% 0.09 240.876)" }}>
                                Maximum number of cars reached
                            </p>
                        )}
                    </div>

                    {/* Cars List */}
                    <div className="space-y-2">
                        {cars && cars.length > 0 ? (
                            cars.map((car) => (
                                <div
                                    key={car._id || car.car_id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <CarFront
                                            className="w-5 h-5"
                                            style={{ color: "oklch(77.7% 0.152 181.912)" }}
                                        />
                                        <span className="font-medium text-gray-800">
                                            {car.label}
                                        </span>
                                    </div>

                                    {/* Edit and Delete Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingCarId(car._id || car.car_id);
                                                setCarLabel(car.label);
                                                setActualShowAddModal(true);
                                            }}
                                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                                            style={{ backgroundColor: "oklch(60.9% 0.126 221.723)" }}
                                            aria-label="Edit car"
                                        >
                                            <Edit2
                                                className="w-4 h-4"
                                                style={{ color: "white" }}
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCar(car._id || car.car_id)}
                                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                                            style={{ backgroundColor: "oklch(71.2% 0.194 13.428)" }}
                                            aria-label="Delete car"
                                        >
                                            <Trash2
                                                className="w-4 h-4"
                                                style={{ color: "white" }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-2">
                                No cars added yet
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Add Car PopUp Modal */}
            <AddCarPopUp
                isOpen={actualShowAddModal}
                onClose={() => {
                    setActualShowAddModal(false);
                    setCarLabel("");
                    setEditingCarId(null);
                }}
                carLabel={carLabel}
                setCarLabel={setCarLabel}
                onSave={editingCarId ? handleEditCar : handleAddCar}
                isLoading={isLoading}
                isEditing={!!editingCarId}
            />
        </div>
    );
}
