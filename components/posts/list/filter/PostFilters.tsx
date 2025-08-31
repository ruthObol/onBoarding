import { useState, useEffect } from "react";
import { 
  Group, 
  TextInput, 
  Select, 
  MultiSelect,
  ActionIcon
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { BuildDifficulty, Category } from "@prisma/client";
import useSWR from "swr";
import classes from "./PostFilters.module.css";
import { KEYS } from "@/client/config/swr";

interface PostFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

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
//const

export const PostFilters = ({ onFiltersChange }: PostFiltersProps) => {
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
  }, [filters, onFiltersChange]);
  //TODO: call it in handlers

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleCategoriesChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, categories: value }));
  };

  const handleDifficultyChange = (value: BuildDifficulty | null) => {
    setFilters(prev => ({ ...prev, difficulty: value }));
  };

  return (
    <div className={classes.filtersContainer}>
      <TextInput
        placeholder="Search by title..."
        value={filters.search}
        onChange={(event) => handleSearchChange(event.currentTarget.value)}
        leftSection={<IconSearch size={16} />}
        className={classes.searchInput}
      />

      <MultiSelect
        placeholder="Categories..."
        data={categoryOptions}
        value={filters.categories}
        onChange={handleCategoriesChange}
        searchable
        className={classes.categoriesSelect}
      />

      <div className={classes.difficultyContainer}>
        <Select
          placeholder="Difficulty..."
          data={difficultyOptions}
          value={filters.difficulty}
          onChange={handleDifficultyChange}//TODO
          
          className={classes.difficultySelect}
        />
        {filters.difficulty && (
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={() => handleDifficultyChange(null)}
            className={classes.clearButton}
          >
            <IconX size={14} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
