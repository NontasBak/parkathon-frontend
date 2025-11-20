import apiClient from "./client";

/**
 * Destination API Service
 * Handles all destination-related API calls
 */

// Static mock user ID for development/testing
export const MOCK_USER_ID = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

/**
 * Returns mock coordinates for Egnatia 125
 * @returns {Object} Object with latitude and longitude
 */
const getMockCoordinates = () => {
  // Mock coordinates for Egnatia 125, Thessaloniki
  return {
    latitude: 40.63298,
    longitude: 22.94762,
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
    const requestBody = {};

    // Add address if provided
    if (address) {
      requestBody.address = address;
    }

    // Add coordinates if provided
    if (coordinates) {
      requestBody.coordinates = coordinates;
    }

    const response = await apiClient.put(`/user/${MOCK_USER_ID}/destination`, requestBody);

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
    // Always use mock coordinates for Egnatia 125
    const requestBody = {
      address: "Current Location",
      coordinates: getMockCoordinates(),
    };

    const response = await apiClient.put(`/user/${MOCK_USER_ID}/destination`, requestBody);

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
    // Always use mock coordinates for Egnatia 125
    const requestBody = {
      address: address,
      coordinates: getMockCoordinates(),
    };

    const response = await apiClient.put(`/user/${MOCK_USER_ID}/destination`, requestBody);

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
