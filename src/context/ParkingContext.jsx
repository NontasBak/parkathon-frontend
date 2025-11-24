import { createContext, useContext, useState, useEffect } from "react";
import { getParkingSpots } from "../api/parkingSpots";

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
  const [destination, setDestination] = useState(null); // Destination with address and coordinates
  const [parkingSpots, setParkingSpots] = useState(null); // Parking spots near destination
  const [loadingSpots, setLoadingSpots] = useState(false); // Loading state for parking spots

  // Fetch parking spots when destination is set
  useEffect(() => {
    const fetchParkingSpots = async () => {
      if (destination && destination.address) {
        setLoadingSpots(true);
        try {
          // Fetch parking spots with default radius of 100m
          // The API uses the backend-stored destination coordinates
          const spots = await getParkingSpots(undefined, 100, false);
          setParkingSpots(spots);
          console.log("Fetched parking spots for destination:", destination.address, spots);
        } catch (error) {
          console.error("Failed to fetch parking spots:", error);
          setParkingSpots(null);
        } finally {
          setLoadingSpots(false);
        }
      } else {
        // Clear parking spots if no destination
        setParkingSpots(null);
      }
    };

    fetchParkingSpots();
  }, [destination]);

  // You can add computed values or helper functions here
  const clearSearch = () => {
    setMarker(null);
    setParkingLocations(null);
    setDestination(null);
    setParkingSpots(null);
  };

  const value = {
    // State
    currentLocation,
    cameraLocation,
    marker,
    parkingLocations,
    searchRadius,
    destination,
    parkingSpots,
    loadingSpots,
    // Setters
    setCurrentLocation,
    setCameraLocation,
    setMarker,
    setParkingLocations,
    setSearchRadius,
    setDestination,
    setParkingSpots,
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
