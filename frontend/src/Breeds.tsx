import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { List } from './List';
import { ListItem } from './ListItem';
import { getBreeds } from './api/breeds';
import { Breed } from './types';
import { useState } from 'react';

const BREEDS_PER_PAGE = 15;

export const Breeds = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPlaceholderData, refetch, isFetching } =
    useQuery<Breed[], Error>({
      queryKey: ['breeds', page],
      queryFn: () => getBreeds(page),
      placeholderData: keepPreviousData,
      retry: 3,
      staleTime: Infinity,
    });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
        <p className="mt-4">Loading breeds...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">
          Error fetching data. Please try again later.
        </p>
        <button className="mt-4 btn btn-primary" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const isLastPage = data && data.length < BREEDS_PER_PAGE;

  return (
    <div>
      <List>
        {data?.map((item, index) => (
          <ListItem
            key={index}
            breed={item.breed}
            image={item.image}
            idx={index}
          />
        ))}
      </List>

      <div className="flex flex-row items-center justify-center mt-4 space-x-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Previous Page
        </button>

        {isFetching && !isLoading && (
          <span className="loading loading-dots loading-md"></span>
        )}

        {!isFetching && <span>Current Page: {page}</span>}

        <button
          className="btn btn-primary"
          onClick={() => {
            if (!isPlaceholderData && data && data.length === BREEDS_PER_PAGE) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || isLastPage || isFetching}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
