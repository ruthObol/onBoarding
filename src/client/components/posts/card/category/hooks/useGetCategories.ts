import { KEYS } from '@/src/client/config/swr';
import { Category } from '@/src/types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGetCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    KEYS.CATEGORIES,
    fetcher
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
