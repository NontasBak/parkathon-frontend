import apiClient from "./client";

/**
 * Get parking locations for a user
 * @param {string} userId - The UUID of the user
 * @param {boolean} active - Filter by active status (true for active, false for history)
 * @returns {Promise<Array>} Array of parking location objects
 */
export const getParkingLocations = async (userId, active = true) => {
  try {
    const response = await apiClient.get(`/users/${userId}/parking-locations`, {
      params: { active },
    });
    // API returns { success, message, data } structure
    console.log(response.data?.data);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching parking locations:", error);
    throw error;
  }
};

/**
 * Add a new parking location
 * @param {string} userId - The UUID of the user
 * @param {Object} parkingData - The parking location data
 * @param {string} parkingData.car_id - The UUID of the car being parked
 * @param {Object} parkingData.coordinates - The GPS coordinates
 * @param {number} parkingData.coordinates.latitude - Latitude
 * @param {number} parkingData.coordinates.longitude - Longitude
 * @param {string} parkingData.address - Street address of the parking location
 * @returns {Promise<Object>} Response object with confirmation message
 */
export const addParkingLocation = async (userId, parkingData) => {
  try {
    const response = await apiClient.post(`/users/${userId}/parking-locations`, {
      car_summary: {
        car_id: parkingData.car_id,
      },
      user_id: userId,
      coordinates: parkingData.coordinates,
      address: parkingData.address,
    });
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding parking location:", error);
    throw error;
  }
};

/**
 * Remove/unpark a parking location (mark as inactive)
 * @param {string} userId - The UUID of the user
 * @param {string} parkingId - The UUID of the parking location
 * @returns {Promise<Object>} Response object with confirmation message
 */
export const removeParkingLocation = async (userId, parkingId) => {
  try {
    const response = await apiClient.put(`/users/${userId}/parking-locations/${parkingId}`);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error removing parking location:", error);
    throw error;
  }
};
