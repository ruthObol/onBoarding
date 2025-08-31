import { useState } from 'react';
import { MultiSelect, TextInput, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useGetCategories } from './hooks/useGetCategories';
import { useCreateCategory } from './hooks/useCreateCategory';

interface CategorySelectorProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { categories, isLoading: categoriesLoading } = useGetCategories();
  const { createCategory, isCreating: isCreatingCategory } = useCreateCategory();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      const newCategory = await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      
      const currentCategoryIds = value;
      onChange([...currentCategoryIds, newCategory.id]);
      
      notifications.show({
        title: 'Category Created! ✅',
        message: `Category "${newCategory.name}" has been created successfully!`,
        color: 'green',
        autoClose: 3000,
      });
    } catch (error) {
      notifications.show({
        title: 'Error! ❌',
        message: error instanceof Error ? error.message : 'Failed to create category',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <MultiSelect
        label="Categories"
        placeholder="Select categories"
        data={categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))}
        value={value.map(id => id.toString())}
        onChange={(selectedValues) => onChange(selectedValues.map(v => parseInt(v)))}
        searchable
        disabled={categoriesLoading}
      />

      <Group gap="xs">
        <TextInput
          placeholder="Quick add new category"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.currentTarget.value)}
          style={{ flex: 1 }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleCreateCategory();
            }
          }}
        />
        <Button
          size="sm"
          onClick={handleCreateCategory}
          loading={isCreatingCategory}
          disabled={!newCategoryName.trim()}
        >
          Add Category
        </Button>
      </Group>
    </>
  );
}
