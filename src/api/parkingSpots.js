import apiClient from "./client";

/**
 * Parking Spots API Service
 * Handles all parking spots-related API calls
 */

// Static mock user ID for development/testing
export const MOCK_USER_ID = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

/**
 * Get parking spots near user's destination
 * @param {string} userId - The user ID (defaults to MOCK_USER_ID)
 * @param {number} radius - Search radius in meters (defaults to 100)
 * @param {boolean} accessibility - Filter only accessible spots (defaults to false)
 * @returns {Promise} API response with parking spots array
 */
export const getParkingSpots = async (userId = MOCK_USER_ID, radius = 10000, accessibility = false) => {
  try {
    const params = {
      radius,
      accessibility,
    };

    const response = await apiClient.get(`/user/${userId}/destination/parking-spot`, { params });

    // API returns { success, message, data: [] }
    // Extract the data array which contains parking spots
    // Each spot has: spot_id, coordinates, availability, accessibility
    return response.data.data;
  } catch (error) {
    console.error("Error fetching parking spots:", error);
    throw error;
  }
};

/**
 * Get color for parking spot marker based on availability
 * @param {number} availability - Availability number between 0-1
 * @returns {string} Color name for the marker
 */
export const getParkingSpotColor = (availability) => {
  if (availability < 0.3) {
    return "red";
  } else if (availability >= 0.3 && availability <= 0.7) {
    return "orange";
  } else {
    return "green";
  }
};

/**
 * Get parking spot marker icon URL based on availability
 * @param {number} availability - Availability number between 0-1
 * @returns {string} URL for the marker icon
 */
export const getParkingSpotIconUrl = (availability) => {
  const color = getParkingSpotColor(availability);
  return `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`;
};

const parkingSpotsService = {
  getParkingSpots,
  getParkingSpotColor,
  getParkingSpotIconUrl,
  MOCK_USER_ID,
};

export default parkingSpotsService;
