import apiClient from "./client";

/**
 * Get all cars for a user
 * @param {string} userId - The UUID of the user
 * @returns {Promise<Array>} Array of car objects
 */
export const getCars = async (userId) => {
  try {
    const response = await apiClient.get(`/user/${userId}/car`);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

/**
 * Add a new car for a user
 * @param {string} userId - The UUID of the user
 * @param {Object} carData - The car data
 * @param {string} carData.label - The label/name for the car
 * @returns {Promise<Object>} Response object
 */
export const addCar = async (userId, carData) => {
  try {
    const response = await apiClient.post(`/user/${userId}/car`, {
      user_id: userId,
      label: carData.label,
    });
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};
