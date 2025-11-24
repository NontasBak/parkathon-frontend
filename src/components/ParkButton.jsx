import { useState, useEffect } from "react";
import { CircleParking, ChevronUp, ChevronDown, MapPin, Car, CircleParkingOff } from "lucide-react";
import { useNavigate } from "react-router";
import SelectCarModal from "./SelectCarModal";
import { getCars } from "../api/cars";
import { getParkingLocations, addParkingLocation, removeParkingLocation } from "../api/parkingLocations";

export default function ParkButton({ onShowToast }) {
  const navigate = useNavigate();
  const [showCarModal, setShowCarModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: Replace with actual user ID from authentication context
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

  // Fetch cars when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch parking locations when panel is expanded
  useEffect(() => {
    if (isExpanded) {
      fetchParkingLocations();
    }
  }, [isExpanded]);

  const fetchCars = async () => {
    try {
      const carsData = await getCars(userId);
      setCars(Array.isArray(carsData) ? carsData : []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setCars([]);
    }
  };

  const fetchParkingLocations = async () => {
    try {
      // Fetch both active and past parking locations
      const [activeLocations, pastLocations] = await Promise.all([
        getParkingLocations(userId, true),
        getParkingLocations(userId, false),
      ]);

      // Sort active locations by timestamp (newest first)
      const sortedActive = (Array.isArray(activeLocations) ? activeLocations : []).sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      );

      // Sort inactive locations by timestamp (newest first)
      const sortedInactive = (Array.isArray(pastLocations) ? pastLocations : []).sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      );

      // Combine with active locations first, then inactive
      const allLocations = [...sortedActive, ...sortedInactive];

      setParkingLocations(allLocations);
    } catch (error) {
      console.error("Failed to fetch parking locations:", error);
      setParkingLocations([]);
    }
  };

  const handleParkClick = () => {
    // Check if user has any cars
    if (!cars || cars.length === 0) {
      if (onShowToast) onShowToast("Please add a car first");
      // TODO: Navigate to add car page
      return;
    }

    // Open car selection modal
    setShowCarModal(true);

    // Pre-select first available (not parked) car
    const availableCar = cars.find((car) => !car.is_parked);
    if (availableCar) {
      setSelectedCarId(availableCar.car_id);
    }
  };

  const handleCarSelect = (carId) => {
    setSelectedCarId(carId);
  };

  const handleAddCar = () => {
    // TODO: Navigate to add car page or show add car modal
    console.log("Add car clicked");
    if (onShowToast) onShowToast("Add car functionality coming soon");
  };

  const handleConfirmPark = async () => {
    if (!selectedCarId) {
      return;
    }

    setLoading(true);
    setShowCarModal(false);

    try {
      // Mock parking location
      const mockCoordinates = { lat: 40.6328568, lng: 22.9495878 };
      const mockAddress = "Egnatia 130";

      await addParkingLocation(userId, {
        car_id: selectedCarId,
        coordinates: {
          latitude: mockCoordinates.lat,
          longitude: mockCoordinates.lng,
        },
        address: mockAddress,
      });

      if (onShowToast) onShowToast("Parked successfully");

      // Refresh cars list and parking locations
      await Promise.all([fetchCars(), isExpanded && fetchParkingLocations()]);
    } catch (error) {
      console.error("Failed to park:", error);
      if (onShowToast) onShowToast(error.response?.data?.message || "Failed to park. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnpark = async (parkingId) => {
    if (!parkingId) return;

    setLoading(true);

    try {
      await removeParkingLocation(userId, parkingId);
      if (onShowToast) onShowToast("Unparked successfully");

      // Refresh parking locations and cars
      await Promise.all([fetchParkingLocations(), fetchCars()]);
    } catch (error) {
      console.error("Failed to unpark:", error);
      if (onShowToast) onShowToast(error.response?.data?.message || "Failed to unpark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = () => {
    setShowCarModal(false);
    setSelectedCarId(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[800] max-w-md w-full">
        {/* Chevron toggle button - always at the top */}
        <div className="relative">
          <button
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
            onClick={handleToggleExpand}
          >
            <div className="bg-white rounded-t-xl w-10 h-6 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </button>
        </div>

        <div className="bg-white rounded-t-2xl shadow-lg">
          {/* History Panel - Shows when expanded */}
          {isExpanded && parkingLocations.length > 0 && (
            <div className="max-h-[50vh] overflow-y-auto divide-y divide-gray-200 border-b border-gray-200 pt-3">
              {parkingLocations.map((location) => (
                <div
                  key={location.parking_id}
                  className={`px-4 py-3 hover:bg-gray-50 transition-colors ${location.active ? "bg-blue-50 bg-opacity-30" : ""
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* First row: Address with map pin icon */}
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin
                          className={`w-5 h-5 flex-shrink-0 ${location.active ? "text-gray-500" : "text-gray-400"
                            }`}
                        />
                        <p
                          className={`text-sm font-medium truncate ${location.active ? "text-gray-800" : "text-gray-500"
                            }`}
                        >
                          {location.address}
                        </p>
                      </div>

                      {/* Second row: Car details */}
                      <div
                        className={`flex items-center gap-2 text-xs ${location.active ? "text-gray-500" : "text-gray-400"
                          }`}
                      >
                        <Car className="w-4 h-4" />
                        <span>{location.car_summary?.label || `Car ${location.car_summary?.label}`}</span>
                        <span className="mx-1">|</span>
                        <span>{formatDate(location.timestamp)}</span>
                      </div>
                    </div>

                    {/* Unpark button - only for active parking locations */}
                    {location.active && (
                      <button
                        onClick={() => handleUnpark(location.parking_id)}
                        className="ml-3 p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors flex-shrink-0"
                        title="Unpark this car"
                        disabled={loading}
                      >
                        <CircleParkingOff className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Park Button Section */}
          <div className="py-4 relative flex justify-center w-full">
            {/* Park Button */}
            <button
              className={`bg-[#1B4965] hover:bg-[#234a61] text-white font-semibold py-1 px-24 rounded-lg flex items-center justify-center gap-2 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handleParkClick}
              disabled={loading}
            >
              <CircleParking />
              <span className="text-lg">Park</span>
            </button>
          </div>
        </div>
      </div>

      {/* Car Selection Modal */}
      <SelectCarModal
        isOpen={showCarModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPark}
        cars={cars}
        selectedCarId={selectedCarId}
        onCarSelect={handleCarSelect}
        onAddCar={handleAddCar}
        navigate={navigate}
      />
    </>
  );
}
