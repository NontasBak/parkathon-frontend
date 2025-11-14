import { createContext, useContext, useState } from "react";

/**
 * ParkingContext - Shared state for parking search and location data
 * This context provides parking-related state to all components in the app
 */
const ParkingContext = createContext();

/**
 * ParkingProvider - Context provider component
 * Wrap your app or router with this to provide parking state to all children
 */
export function ParkingProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cameraLocation, setCameraLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [parkingLocations, setParkingLocations] = useState(null);
  const [searchRadius, setSearchRadius] = useState(500); // Default 500m radius

  // You can add computed values or helper functions here
  const clearSearch = () => {
    setMarker(null);
    setParkingLocations(null);
  };

  const value = {
    // State
    currentLocation,
    cameraLocation,
    marker,
    parkingLocations,
    searchRadius,
    // Setters
    setCurrentLocation,
    setCameraLocation,
    setMarker,
    setParkingLocations,
    setSearchRadius,
    // Helper functions
    clearSearch,
  };

  return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
}

/**
 * useParkingContext - Custom hook to use the parking context
 * Use this in any component that needs access to parking state
 *
 * @example
 * const { currentLocation, setCurrentLocation } = useParkingContext();
 */
export function useParkingContext() {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParkingContext must be used within a ParkingProvider");
  }
  return context;
}
