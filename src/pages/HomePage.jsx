import { useState } from "react";
import Map from "../components/Map";
import ParkButton from "../components/ParkButton";
import SearchBar from "../components/SearchBar";
import FrequentLocationBar from "../components/FrequentLocationBar";
import Toast from "../components/Toast";
import { useParkingContext } from "../context/ParkingContext";

export default function HomePage() {
  const {
    currentLocation,
    cameraLocation,
    marker,
    parkingLocations,
    destination,
    setDestination,
    parkingSpots,
  } = useParkingContext();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSearch = (searchText, destination) => {
    console.log("Searching for:", searchText);
    console.log("Destination received:", destination);

    // Set destination from API response
    // destination is already the destination object: { address, coordinates }
    if (destination) {
      setDestination(destination);
    }
  };

  const handleMicrophoneClick = () => {
    console.log("Microphone clicked");
    // TODO: Implement voice search functionality
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // TODO: Implement profile navigation
  };

  const handleLocationClick = (locationId) => {
    console.log("Location clicked:", locationId);
    // TODO: Implement location navigation
  };

  const handleSearchError = (errorMessage) => {
    setToastMessage(errorMessage);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Map component - positioned as background */}
      <div className="absolute inset-0">
        <div className="relative w-full h-screen">
          <Map
            currentLocation={currentLocation}
            cameraLocation={cameraLocation}
            marker={marker}
            parkingLocations={parkingLocations}
            destination={destination}
            parkingSpots={parkingSpots}
          />
        </div>

        {/* Search Bar and Frequent Locations positioned above the map with high z-index */}
        <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none">
          <div className="pointer-events-auto">
            <SearchBar
              onSearch={handleSearch}
              onMicrophoneClick={handleMicrophoneClick}
              onProfileClick={handleProfileClick}
              onError={handleSearchError}
            />
            <FrequentLocationBar onLocationClick={handleLocationClick} />
          </div>
        </div>
      </div>
      <ParkButton />

      {/* Toast notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleToastClose}
        duration={3000}
        type="error"
      />
    </div>
  );
}
