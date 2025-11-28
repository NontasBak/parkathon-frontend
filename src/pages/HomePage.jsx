import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Map from "../components/Map";
import ParkButton from "../components/ParkButton";
import SearchBar from "../components/SearchBar";
import FrequentLocationBar from "../components/FrequentLocationBar";
import Toast from "../components/Toast";
import EditRadius from "../components/EditRadius";
import { useParkingContext } from "../context/ParkingContext";
import { setDestination as setDestinationAPI } from "../api/destination";

export default function HomePage() {
  const navigate = useNavigate();
  const {
    currentLocation,
    cameraLocation,
    marker,
    parkingLocations,
    destination,
    setDestination,
    parkingSpots,
    searchRadius,
    updateSearchRadius,
    refetchParkingSpots,
  } = useParkingContext();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Refetch parking spots when returning to the homepage
  useEffect(() => {
    if (destination && destination.address) {
      refetchParkingSpots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    navigate("/profile");
  };

  const handleLocationClick = async (location) => {
    console.log("Location clicked:", location);

    // If it's the "nearby" location, set destination with coordinates only
    if (location.id === "nearby") {
      try {
        console.log("Searching for nearby parking");

        // Mock coordinates for Egnatia 125, Thessaloniki
        const mockCoordinates = {
          latitude: 40.63298,
          longitude: 22.94762,
        };

        // Call the API with coordinates only (no address)
        const response = await setDestinationAPI(null, mockCoordinates);

        console.log("Nearby destination set via API:", response);

        // Update local state with the destination from API response
        if (response && response.destination) {
          setDestination(response.destination);
          setToastMessage("Displaying nearby parking spots");
          setShowToast(true);
        }
      } catch (err) {
        console.error("Failed to set nearby destination:", err);
        setToastMessage("Failed to search nearby");
        setShowToast(true);
      }
      return;
    }

    // For frequent locations, set as destination via API
    if (location.address) {
      try {
        // Call the API to set the destination on the backend
        // This will trigger the ParkingContext to fetch parking spots
        const response = await setDestinationAPI(location.address, location.coordinates);

        console.log("Destination set via API:", response);

        // Update local state with the destination from API response
        if (response && response.destination) {
          setDestination(response.destination);
          setToastMessage(`Destination set to ${location.label}`);
          setShowToast(true);
        }
      } catch (err) {
        console.error("Failed to set destination:", err);
        setToastMessage("Failed to set destination");
        setShowToast(true);
      }
    }
  };

  const handleSearchError = (errorMessage) => {
    setToastMessage(errorMessage);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
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

        {/* EditRadius button positioned in bottom-right corner */}
        <div className="absolute bottom-6 right-6 z-[1000] pointer-events-none">
          <div className="pointer-events-auto">
            <EditRadius
              currentRadius={searchRadius}
              onRadiusChange={updateSearchRadius}
              minRadius={10}
              maxRadius={1000}
            />
          </div>
        </div>
      </div>
      <ParkButton onShowToast={handleShowToast} />

      {/* Toast notification */}
      <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} duration={3000} />
    </div>
  );
}
