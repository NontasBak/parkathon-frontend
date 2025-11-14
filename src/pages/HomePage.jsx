import Map from "../components/Map";
import SearchBar from "../components/SearchBar";
import FrequentLocationBar from "../components/FrequentLocationBar";
import { useParkingContext } from "../context/ParkingContext";

export default function HomePage() {
  const { currentLocation, cameraLocation, marker, parkingLocations } = useParkingContext();

  const handleSearch = (searchText) => {
    console.log('Searching for:', searchText);
    // TODO: Implement search functionality
  };

  const handleMicrophoneClick = () => {
    console.log('Microphone clicked');
    // TODO: Implement voice search functionality
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // TODO: Implement profile navigation
  };

  const handleLocationClick = (locationId) => {
    console.log('Location clicked:', locationId);
    // TODO: Implement location navigation
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Map component - positioned as background */}
      <div className="absolute inset-0">
        <Map
          currentLocation={currentLocation}
          cameraLocation={cameraLocation}
          marker={marker}
          parkingLocations={parkingLocations}
        />
      </div>

      {/* Search Bar and Frequent Locations positioned above the map with high z-index */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none">
        <div className="pointer-events-auto">
          <SearchBar
            onSearch={handleSearch}
            onMicrophoneClick={handleMicrophoneClick}
            onProfileClick={handleProfileClick}
          />
          <FrequentLocationBar
            onLocationClick={handleLocationClick}
          />
        </div>
      </div>
    </div>
  );
}
