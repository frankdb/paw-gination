import { Breed } from '../types';

const BREEDS_PER_PAGE = 15;
const API_BREEDS_PER_PAGE = 7;

export const getBreeds = async (page: number): Promise<Breed[]> => {
  try {
    const breeds: Breed[] = [];
    const apiCallsNeeded = Math.ceil(BREEDS_PER_PAGE / API_BREEDS_PER_PAGE);
    const startApiPage =
      Math.floor((page - 1) * (BREEDS_PER_PAGE / API_BREEDS_PER_PAGE)) + 1;

    for (let i = 0; i < apiCallsNeeded; i++) {
      const apiPage = startApiPage + i;
      console.log(`Fetching breeds for API page ${apiPage}`);
      const response = await fetch(
        `http://127.0.0.1:5000/api/dogs?page=${apiPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Breed[] = await response.json();
      breeds.push(...data);
    }

    const startIndex = ((page - 1) * BREEDS_PER_PAGE) % API_BREEDS_PER_PAGE;
    const endIndex = startIndex + BREEDS_PER_PAGE;

    console.log(`Received ${breeds.length} breeds for page ${page}`);
    return breeds.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};
