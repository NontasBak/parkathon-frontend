import apiClient from "./client";

/**
 * Get all frequent locations for a user
 * @param {string} userId - The UUID of the user
 * @returns {Promise<Array>} Array of frequent location objects
 */
export const getFrequentLocations = async (userId) => {
  try {
    const response = await apiClient.get(`/user/${userId}/frequent-location`);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching frequent locations:", error);
    throw error;
  }
};

/**
 * Add a new frequent location for a user
 * @param {string} userId - The UUID of the user
 * @param {Object} locationData - The frequent location data
 * @param {string} locationData.label - The label/name for the location
 * @param {string} locationData.address - The street address
 * @param {string} [locationData.icon] - The icon type (Home, Work, University, DogPark, Gym, Supermarket)
 * @param {Object} [locationData.coordinates] - The coordinates object
 * @param {number} [locationData.coordinates.latitude] - The latitude
 * @param {number} [locationData.coordinates.longitude] - The longitude
 * @returns {Promise<Object>} Response object
 */
export const addFrequentLocation = async (userId, locationData) => {
  try {
    const payload = {
      user_id: userId,
      label: locationData.label,
      address: locationData.address,
    };

    // Add optional fields if provided
    if (locationData.icon) {
      payload.icon = locationData.icon;
    }
    if (locationData.coordinates) {
      payload.coordinates = locationData.coordinates;
    }

    const response = await apiClient.post(`/user/${userId}/frequent-location`, payload);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding frequent location:", error);
    throw error;
  }
};

/**
 * Edit a frequent location for a user
 * @param {string} userId - The UUID of the user
 * @param {string} locationId - The UUID of the frequent location
 * @param {Object} locationData - The frequent location data to update
 * @param {string} locationData.label - The new label/name for the location
 * @param {string} locationData.address - The new street address
 * @param {string} [locationData.icon] - The new icon type
 * @param {Object} [locationData.coordinates] - The new coordinates object
 * @returns {Promise<Object>} Updated frequent location object
 */
export const editFrequentLocation = async (userId, locationId, locationData) => {
  try {
    const payload = {
      user_id: userId,
      location_id: locationId,
      label: locationData.label,
      address: locationData.address,
    };

    // Add optional fields if provided
    if (locationData.icon) {
      payload.icon = locationData.icon;
    }
    if (locationData.coordinates) {
      payload.coordinates = locationData.coordinates;
    }

    const response = await apiClient.put(`/user/${userId}/frequent-location/${locationId}`, payload);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error editing frequent location:", error);
    throw error;
  }
};

/**
 * Delete a frequent location for a user
 * @param {string} userId - The UUID of the user
 * @param {string} locationId - The UUID of the frequent location to delete
 * @returns {Promise<Object>} Response object
 */
export const deleteFrequentLocation = async (userId, locationId) => {
  try {
    const response = await apiClient.delete(`/user/${userId}/frequent-location/${locationId}`);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error deleting frequent location:", error);
    throw error;
  }
};
