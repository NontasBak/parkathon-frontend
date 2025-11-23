/**
 * Get address suggestions as user types (Autocomplete)
 * Uses OpenStreetMap Nominatim API
 * @param {string} query - Partial address or place name typed by user
 * @returns {Promise<Array>} Array of suggestion objects
 */
export const getAddressSuggestions = async (query) => {
  try {
    if (!query || query.length < 2) return [];

    const baseUrl = 'https://nominatim.openstreetmap.org/search';

    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: 1,
      limit: 10,              // Number of suggestions
      dedupe: 1,
    });

    const response = await fetch(`${baseUrl}?${params}`, {
      headers: {
        'User-Agent': 'Parkathon-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Suggestions API error: ${response.status}`);
    }

    const data = await response.json();

    // Map the results and filter out duplicates by displayName
    const suggestions = data.map(place => {
      // Extract address components
      const addressDetails = place.address || {};
      const road = addressDetails.road || addressDetails.street;
      const houseNumber = addressDetails.house_number;
      const city = addressDetails.city || addressDetails.town || addressDetails.village;
      const region = addressDetails.state || addressDetails.region;

      // Build simplified address: "Street Number, City"
      let simplifiedAddress = '';
      
      if (road) {
        simplifiedAddress = road;
        if (houseNumber) {
          simplifiedAddress += ` ${houseNumber}`;
        }
        if (city) {
          simplifiedAddress += `, ${city}`;
        } else if (region) {
          simplifiedAddress += `, ${region}`;
        }
      } else {
        simplifiedAddress = place.display_name;
      }

      return {
        displayName: simplifiedAddress,
        latitude: parseFloat(place.lat),
        longitude: parseFloat(place.lon),
        type: place.type,
        address: place.address
      };
    });

    // Remove duplicates based on displayName
    const uniqueSuggestions = [];
    const seenDisplayNames = new Set();

    for (const suggestion of suggestions) {
      if (!seenDisplayNames.has(suggestion.displayName)) {
        seenDisplayNames.add(suggestion.displayName);
        uniqueSuggestions.push(suggestion);
      }
    }

    return uniqueSuggestions;

  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
};
