import { useState } from 'react';

import { Button, MultiSelect, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import classes from './CategorySelector.module.css';
import { useCreateCategory } from './hooks/useCreateCategory';
import { useGetCategories } from './hooks/useGetCategories';

interface CategorySelectorProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { categories, isLoading: categoriesLoading } = useGetCategories();
  const { createCategory, isCreating: isCreatingCategory } =
    useCreateCategory();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

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
        message:
          error instanceof Error ? error.message : 'Failed to create category',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <section className={classes.container}>
      <MultiSelect
        label='Categories'
        placeholder='Select categories'
        data={categories.map(cat => ({
          value: cat.id.toString(),
          label: cat.name,
        }))}
        value={value.map(id => id.toString())}
        onChange={selectedValues =>
          onChange(selectedValues.map(v => parseInt(v)))
        }
        searchable
        disabled={categoriesLoading}
      />

      <fieldset className={classes.inputGroup}>
        <TextInput
          placeholder='Quick add new category'
          value={newCategoryName}
          onChange={event => setNewCategoryName(event.currentTarget.value)}
          className={classes.textInput}
        />
        <Button
          size='sm'
          onClick={handleCreateCategory}
          loading={isCreatingCategory}
          disabled={!newCategoryName.trim()}
          className={classes.addButton}
        >
          Add Category
        </Button>
      </fieldset>
    </section>
  );
}
