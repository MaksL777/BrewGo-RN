export const API_URL = 'https://api.sampleapis.com/coffee/hot';

export const fetchCoffeeData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching coffee data:', error);
    throw error;
  }
};
