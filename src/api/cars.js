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

/**
 * Edit a car for a user
 * @param {string} userId - The UUID of the user
 * @param {string} carId - The UUID of the car
 * @param {Object} carData - The car data to update
 * @param {string} carData.label - The new label/name for the car
 * @returns {Promise<Object>} Updated car object
 */
export const editCar = async (userId, carId, carData) => {
  try {
    const response = await apiClient.put(`/user/${userId}/car/${carId}`, {
      label: carData.label,
    });
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error editing car:", error);
    throw error;
  }
};

/**
 * Delete a car for a user
 * @param {string} userId - The UUID of the user
 * @param {string} carId - The UUID of the car to delete
 * @returns {Promise<Object>} Response object
 */
export const deleteCar = async (userId, carId) => {
  try {
    const response = await apiClient.delete(`/user/${userId}/car/${carId}`);
    // API returns { success, message, data } structure
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};
