import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { List } from './List';
import { ListItem } from './ListItem';
import { getBreeds } from './api/breeds';
import { Breed } from './types';
import { useState } from 'react';

const BREEDS_PER_PAGE = 15;

export const Breeds = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPlaceholderData } = useQuery<
    Breed[],
    Error
  >({
    queryKey: ['breeds', page],
    queryFn: () => getBreeds(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4">Loading breeds...</p>
      </div>
    );
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <List>
        {data?.map((item, index) => (
          <ListItem key={index} breed={item.breed} image={item.image} />
        ))}
      </List>

      <div className="flex flex-row items-center justify-center space-x-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <span>Current Page: {page}</span>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button if we're on the last page
          disabled={isPlaceholderData}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
