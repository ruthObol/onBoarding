import { Post } from "@/types";
import { FilterState } from "../filter/PostFilters";
import useSWR from "swr";
import { KEYS } from "@/client/config/swr";

export const useGetPosts = (filters?: FilterState) => {
    const searchParams = new URLSearchParams();
    
    if (filters?.search) {
        searchParams.append('search', filters.search);
    }
    
    if (filters?.categories && filters.categories.length > 0) {
        filters.categories.forEach(categoryId => {
            searchParams.append('categories', categoryId);
        });
    }
    
    if (filters?.difficulty) {
        searchParams.append('difficulty', filters.difficulty);
    }
    
    const url = `${KEYS.POSTS}?${searchParams.toString()}`;
    
    const { data: posts, error, isLoading } = useSWR<Post[]>(url, {
        fallbackData: [], 
        refreshInterval: 60000, 
    });

    return { posts, error, isLoading };
};