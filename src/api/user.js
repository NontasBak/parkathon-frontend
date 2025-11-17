import apiClient from "./client";

/**
 * User API endpoints
 */

/**
 * Get user information by ID
 * @param {string} userId - The UUID of the user
 * @returns {Promise<Object>} User data object
 */
export const getUser = async (userId) => {
    try {
        const response = await apiClient.get(`/user/${userId}`);
        // API returns { success, message, data } structure
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

/**
 * Update user information
 * @param {string} userId - The UUID of the user
 * @param {Object} userData - User data to update (name, email, accessibility, searchRadius)
 * @returns {Promise<Object>} Updated user data
 */
export const updateUser = async (userId, userData) => {
    try {
        const response = await apiClient.put(`/user/${userId}`, userData);
        // API returns { success, message, data } structure
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const userService = {
    getUser,
    updateUser,
};

export default userService;
