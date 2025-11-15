import { X, Car } from "lucide-react";

/**
 * SelectCarModal component - Modal for selecting a car when parking
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal is closed
 * @param {function} onConfirm - Callback when car is selected and confirmed
 * @param {Array} cars - Array of available cars
 * @param {string} selectedCarId - Currently selected car ID
 * @param {function} onCarSelect - Callback when a car is selected
 * @param {function} onAddCar - Callback when "Add car" button is clicked
 */
export default function SelectCarModal({
  isOpen,
  onClose,
  onConfirm,
  cars = [],
  selectedCarId,
  onCarSelect,
  onAddCar,
}) {
  if (!isOpen) return null;

  const maxCars = 3;
  const showAddCarButton = cars.length < maxCars;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">Select car</h2>

        {/* Car selection grid */}
        <div className="flex justify-center gap-4 mb-6">
          {cars.map((car, index) => (
            <button
              key={car.car_id}
              onClick={() => onCarSelect(car.car_id)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 transition-all ${
                selectedCarId === car.car_id
                  ? "border-[#1B4965] bg-[#1B4965] bg-opacity-10"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Car
                className={`w-8 h-8 mb-1 ${
                  selectedCarId === car.car_id ? "text-[#1B4965]" : "text-gray-600"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  selectedCarId === car.car_id ? "text-[#1B4965]" : "text-gray-600"
                }`}
              >
                Car {index + 1}
              </span>
            </button>
          ))}

          {/* Add car button */}
          {showAddCarButton && (
            <button
              onClick={onAddCar}
              className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all"
            >
              <div className="text-3xl text-gray-400 mb-1">+</div>
              <span className="text-xs font-medium text-gray-600">Add car</span>
            </button>
          )}
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          disabled={!selectedCarId}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            selectedCarId
              ? "bg-[#1B4965] hover:bg-[#234a61] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
