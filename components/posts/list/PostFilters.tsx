import { useState, useEffect } from "react";
import { 
  Group, 
  TextInput, 
  Select, 
  MultiSelect,
  ActionIcon
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { BuildDifficulty } from "@prisma/client";
import { Category } from "@/types";
import useSWR from "swr";
import styles from "./PostFilters.module.css";
import { KEYS } from "@/client/config/swr";

interface PostFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  categories: string[];
  difficulty: string | null;
}

const difficultyOptions = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
  { value: "EXPERT", label: "Expert" },
];

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

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleCategoriesChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, categories: value }));
  };

  const handleDifficultyChange = (value: string | null) => {
    setFilters(prev => ({ ...prev, difficulty: value }));
  };

  return (
    <div className={styles.filtersContainer}>
      <TextInput
        placeholder="Search by title..."
        value={filters.search}
        onChange={(event) => handleSearchChange(event.currentTarget.value)}
        leftSection={<IconSearch size={16} />}
        className={styles.searchInput}
      />

      <MultiSelect
        placeholder="Categories..."
        data={categoryOptions}
        value={filters.categories}
        onChange={handleCategoriesChange}
        searchable
        className={styles.categoriesSelect}
      />

      <div className={styles.difficultyContainer}>
        <Select
          placeholder="Difficulty..."
          data={difficultyOptions}
          value={filters.difficulty}
          onChange={handleDifficultyChange}
          className={styles.difficultySelect}
        />
        {filters.difficulty && (
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={() => handleDifficultyChange(null)}
            className={styles.clearButton}
          >
            <IconX size={14} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
