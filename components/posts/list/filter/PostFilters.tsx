import { 
  Group, 
  TextInput, 
  Select, 
  MultiSelect,
  ActionIcon
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import classes from "./PostFilters.module.css";
import { usePostFilters, FilterState } from "./usePostFilters";

interface PostFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export type { FilterState };

export const PostFilters = ({ onFiltersChange }: PostFiltersProps) => {
  const {
    filters,
    categoryOptions,
    difficultyOptions,
    handleSearchChange,
    handleCategoriesChange,
    handleDifficultyChange,
  } = usePostFilters(onFiltersChange);

  return (
    <Group className={classes.filtersContainer}>
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

      <Group className={classes.difficultyContainer}>
        <Select
          placeholder="Difficulty..."
          data={difficultyOptions}
          value={filters.difficulty}
          onChange={handleDifficultyChange}
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
      </Group>
    </Group>
  );
};
