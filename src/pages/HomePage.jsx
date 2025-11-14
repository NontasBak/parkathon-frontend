import Map from "../components/Map";
import ParkButton from "../components/ParkButton";
import { useParkingContext } from "../context/ParkingContext";

export default function HomePage() {
  const { currentLocation, cameraLocation, marker, parkingLocations } = useParkingContext();

  return (
    <div className="relative w-full h-screen">
      <Map
        currentLocation={currentLocation}
        cameraLocation={cameraLocation}
        marker={marker}
        parkingLocations={parkingLocations}
      />
      <ParkButton />
    </div>
  );
}
