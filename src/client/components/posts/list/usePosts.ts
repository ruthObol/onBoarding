import { useUserStore } from "@/src/client/stores/user-store";
import { useCallback, useState } from "react";
import { FilterState } from "./filter/usePostFilters";
import { useGetPosts } from "./hooks/useGetPosts";

export const usePosts = () => {
    const [filters, setFilters] = useState<FilterState>({
      search: '',
      categories: [],
      difficulty: null,
    });
  
    const { posts = [], error, isLoading } = useGetPosts(filters);
  
    const handleFiltersChange = useCallback((newFilters: FilterState) => {
      setFilters(newFilters);
    }, []);

    return {
        posts, error, isLoading, handleFiltersChange
    }
}