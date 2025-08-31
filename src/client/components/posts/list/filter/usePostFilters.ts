import { useState, useEffect } from "react";
import { BuildDifficulty, Category } from "@prisma/client";
import useSWR from "swr";
import { KEYS } from "@/src/client/config/swr";

export interface FilterState {
  search: string;
  categories: string[];
  difficulty: BuildDifficulty | null;
}

const difficultyOptions = [
  { value: BuildDifficulty.EASY, label: "Easy" },
  { value: BuildDifficulty.MEDIUM, label: "Medium" },
  { value: BuildDifficulty.HARD, label: "Hard" },
  { value: BuildDifficulty.EXPERT, label: "Expert" },
];

export const usePostFilters = (onFiltersChange: (filters: FilterState) => void) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    difficulty: null,
  });

  const { data: categories = [] } = useSWR<Category[]>(KEYS.CATEGORIES);

  const categoryOptions = categories.map(category => ({
    value: category.id.toString(),
    label: category.name,
  }));

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleCategoriesChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, categories: value }));
  };

  const handleDifficultyChange = (value: string | null) => {
    const difficulty = value ? (Object.values(BuildDifficulty).includes(value as BuildDifficulty) ? value as BuildDifficulty : null) : null;
    setFilters(prev => ({ ...prev, difficulty }));
  };

  return {
    filters,
    categoryOptions,
    difficultyOptions,
    handleSearchChange,
    handleCategoriesChange,
    handleDifficultyChange,
  };
};
