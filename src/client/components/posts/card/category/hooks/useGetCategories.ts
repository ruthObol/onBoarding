import { KEYS } from '@/src/client/config/swr';
import useSWR from 'swr';

interface Category {
  id: number;
  name: string;
}

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
