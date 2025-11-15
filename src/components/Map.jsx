import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom component to handle map center updates
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 17);
    }
  }, [center, map]);
  return null;
}

function Map({ currentLocation, cameraLocation, marker, parkingLocations, destination }) {
  const initialCenter = { lat: 40.6401, lng: 22.9444 };
  const markerLocation = marker === "parking" ? currentLocation : cameraLocation;

  // Debug logging
  console.log("Map component - destination prop:", destination);

  // Determine camera center: prioritize destination, then markerLocation, then initial
  const centerLocation = destination
    ? { lat: destination.coordinates.latitude, lng: destination.coordinates.longitude }
    : markerLocation || initialCenter;

  console.log("Map component - centerLocation:", centerLocation);

  const parkingIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const destinationIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      className="absolute inset-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapUpdater center={centerLocation} />

      {markerLocation && <Marker position={markerLocation} />}

      {/* Red marker for destination */}
      {destination && destination.coordinates && (
        <Marker
          position={{ lat: destination.coordinates.latitude, lng: destination.coordinates.longitude }}
          icon={destinationIcon}
        />
      )}

      {marker === "destination" &&
        parkingLocations &&
        parkingLocations.map((location, index) => (
          <Marker key={index} position={location} icon={parkingIcon} />
        ))}
    </MapContainer>
  );
}

export default Map;
