import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Breeds } from './Breeds';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Breed } from './types';

// Mock the useQuery hook
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

// Mock the getBreeds function
vi.mock('./api/breeds', () => ({
  getBreeds: vi.fn(),
}));

describe('Breeds Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.mocked(useQuery).mockClear();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Breeds />
      </QueryClientProvider>
    );
  };

  it('renders loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      isPlaceholderData: false,
      isFetching: false,
      refetch: vi.fn(),
    } as any);

    renderComponent();
    expect(screen.getByText('Loading breeds...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      isPlaceholderData: false,
      isFetching: false,
      refetch: vi.fn(),
    } as any);

    renderComponent();
    expect(
      screen.getByText('Error fetching data. Please try again later.')
    ).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('renders breed list', () => {
    const mockData = [
      { breed: 'Labrador', image: 'labrador.jpg' },
      { breed: 'Poodle', image: 'poodle.jpg' },
    ];

    vi.mocked(useQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
      isPlaceholderData: false,
      isFetching: false,
      refetch: vi.fn(),
    } as any);

    renderComponent();
    expect(screen.getByText('Labrador')).toBeInTheDocument();
    expect(screen.getByText('Poodle')).toBeInTheDocument();
  });
});
