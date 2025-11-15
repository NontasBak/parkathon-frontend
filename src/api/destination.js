import apiClient from "./client";

/**
 * Destination API Service
 * Handles all destination-related API calls
 */

// Static mock user ID for development/testing
export const MOCK_USER_ID = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

/**
 * Generates random coordinates for mock data
 * @returns {Object} Object with latitude and longitude
 */
const generateRandomCoordinates = () => {
  // Generate coordinates around Thessaloniki, Greece area
  // Thessaloniki approximate bounds: lat 40.5-40.7, lon 22.8-23.1
  const latitude = 40.5 + Math.random() * 0.2; // Random between 40.5 and 40.7
  const longitude = 22.8 + Math.random() * 0.3; // Random between 22.8 and 23.1

  return {
    latitude: parseFloat(latitude.toFixed(6)),
    longitude: parseFloat(longitude.toFixed(6)),
  };
};

/**
 * Set user's destination
 * @param {string} address - The destination address (e.g., "Egnatia 125")
 * @param {Object} coordinates - Optional coordinates object with latitude and longitude
 * @returns {Promise} API response
 */
export const setDestination = async (address, coordinates = null) => {
  try {
    // Use provided coordinates or generate random ones for mock data
    const destinationCoordinates = coordinates || generateRandomCoordinates();

    const requestBody = {
      address: address,
      coordinates: destinationCoordinates,
    };

    const response = await apiClient.put(`/users/${MOCK_USER_ID}/destination`, requestBody);

    // API returns { success, message, data: { destination: {...} } }
    return response.data.data;
  } catch (error) {
    console.error("Error setting destination:", error);
    throw error;
  }
};

/**
 * Set destination using current location
 * @param {Object} coordinates - Coordinates object with latitude and longitude
 * @returns {Promise} API response
 */
export const setDestinationFromCurrentLocation = async (coordinates) => {
  try {
    const requestBody = {
      address: "Current Location",
      coordinates: coordinates,
    };

    const response = await apiClient.put(`/users/${MOCK_USER_ID}/destination`, requestBody);

    // API returns { success, message, data: { destination: {...} } }
    return response.data.data;
  } catch (error) {
    console.error("Error setting destination from current location:", error);
    throw error;
  }
};

/**
 * Set destination from a frequent location
 * @param {string} address - The frequent location address
 * @param {Object} coordinates - Coordinates object with latitude and longitude
 * @returns {Promise} API response
 */
export const setDestinationFromFrequentLocation = async (address, coordinates) => {
  try {
    const requestBody = {
      address: address,
      coordinates: coordinates,
    };

    const response = await apiClient.put(`/users/${MOCK_USER_ID}/destination`, requestBody);

    // API returns { success, message, data: { destination: {...} } }
    return response.data.data;
  } catch (error) {
    console.error("Error setting destination from frequent location:", error);
    throw error;
  }
};

const destinationService = {
  setDestination,
  setDestinationFromCurrentLocation,
  setDestinationFromFrequentLocation,
  MOCK_USER_ID,
};

export default destinationService;
