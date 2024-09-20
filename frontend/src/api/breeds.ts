import { Breed } from '../types';

export const getBreeds = async (page: number): Promise<Breed[]> => {
  try {
    console.log(`Fetching breeds for page ${page}`);
    const response = await fetch(`http://127.0.0.1:5000/api/dogs?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};
