// src/api.js

export const API_URL = 'https://api.sampleapis.com/coffee/hot';

/**
 * Fetches coffee menu from the public API.
 * @returns {Promise<Array>} Array of coffee items
 */
export const fetchCoffeeData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
