import Map from "../components/Map";
import { useParkingContext } from "../context/ParkingContext";

export default function HomePage() {
  const { currentLocation, cameraLocation, marker, parkingLocations } = useParkingContext();

  return (
    <Map
      currentLocation={currentLocation}
      cameraLocation={cameraLocation}
      marker={marker}
      parkingLocations={parkingLocations}
    />
  );
}
