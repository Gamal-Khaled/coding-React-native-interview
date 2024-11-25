import { useInfiniteQuery } from '@tanstack/react-query';

import { defaultHeaders } from './defaults';
import Movie from '../types/Movie';

interface TrendingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const useSearchMoviesQuery = (searchQuery: string) => {
  const searchMovies = async ({ pageParam = 1 }): Promise<TrendingResponse> => {
    return fetch(
      `${process.env.BASE_URL}/search/movie?language=en-US&query=${searchQuery}&page=${pageParam}`,
      {
        headers: defaultHeaders,
      },
    ).then(res => res.json());
  };

  return useInfiniteQuery({
    queryKey: ['Search Movies', searchQuery],
    queryFn: searchMovies,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.total_pages > lastPage.page) return lastPage.page + 1;
    },
    initialData: {
      pages: [],
      pageParams: [],
    },
    select: data => ({
      pageParams: data.pageParams,
      pages: data.pages.map(page => page.results).flat(),
    }),
  });
};

export default useSearchMoviesQuery;
