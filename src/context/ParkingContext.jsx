import { createContext, useContext, useState, useEffect } from "react";
import { getParkingSpots } from "../api/parkingSpots";
import { getUser } from "../api/user";
import { MOCK_USER_ID } from "../api/parkingSpots";

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
  const [defaultRadius, setDefaultRadius] = useState(100); // User's persistent default radius
  const [searchRadius, setSearchRadius] = useState(100); // Current active radius (can be temporary)
  const [destination, setDestination] = useState(null); // Destination with address and coordinates
  const [parkingSpots, setParkingSpots] = useState(null); // Parking spots near destination
  const [loadingSpots, setLoadingSpots] = useState(false); // Loading state for parking spots

  // Load user's search radius from backend on mount
  useEffect(() => {
    const loadUserRadius = async () => {
      try {
        const user = await getUser(MOCK_USER_ID);
        if (user && user.searchRadius) {
          setDefaultRadius(user.searchRadius);
          setSearchRadius(user.searchRadius);
        }
      } catch (error) {
        console.error("Failed to load user radius:", error);
      }
    };

    loadUserRadius();
  }, []);

  // Fetch parking spots when destination changes - reset to default radius
  useEffect(() => {
    if (destination && destination.address) {
      setSearchRadius(defaultRadius);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, defaultRadius]);

  // Fetch parking spots when destination or searchRadius changes
  useEffect(() => {
    const fetchParkingSpots = async () => {
      if (destination && destination.address) {
        setLoadingSpots(true);
        try {
          // Fetch parking spots with current searchRadius
          // The API uses the backend-stored destination coordinates
          const spots = await getParkingSpots(undefined, searchRadius, false);
          setParkingSpots(spots);
          console.log("Fetched parking spots for destination:", destination.address, "with radius:", searchRadius, spots);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, searchRadius]);  // You can add computed values or helper functions here
  const clearSearch = () => {
    setMarker(null);
    setParkingLocations(null);
    setDestination(null);
    setParkingSpots(null);
  };

  // Update search radius temporarily (not saved to backend)
  const updateSearchRadius = (newRadius) => {
    setSearchRadius(newRadius);
    console.log("Temporarily set search radius to:", newRadius);
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
    updateSearchRadius,
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
