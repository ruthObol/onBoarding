import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { BuildDifficulty } from '@prisma/client';

import { useUserStore } from '@/src/client/stores/user-store';
import { PostSchema } from '@/src/schemas/post-schema';
import { PostSchemaType } from '@/src/types';

import { CategorySelector } from '../card/category/CategorySelector';

import { useCreatePost } from './hooks/useCreatePost';

interface NewPostFormProps {
  opened: boolean;
  onClose: () => void;
}

const buildDifficultyOptions = [
  { value: BuildDifficulty.EASY, label: 'Easy' },
  { value: BuildDifficulty.MEDIUM, label: 'Medium' },
  { value: BuildDifficulty.HARD, label: 'Hard' },
  { value: BuildDifficulty.EXPERT, label: 'Expert' },
];

export function NewPostForm({ opened, onClose }: NewPostFormProps) {
  const userName = useUserStore(state => state.userName);

  const form = useForm<PostSchemaType>({
    initialValues: {
      title: '',
      content: '',
      legoModelNumber: '',
      pieces: null,
      imageUrl: '',
      contactPhone: '',
      buildDifficulty: BuildDifficulty.MEDIUM,
      publisher: userName!,
      categoryIds: [],
    },
    validate: zodResolver(PostSchema),
  });

  const handleSuccess = () => {
    notifications.show({
      title: 'Success! 🎉',
      message: 'Your Lego post has been created successfully!',
      color: 'green',
      autoClose: 5000,
    });

    form.reset();
    onClose();
  };

  const handleError = (error: Error) => {
    notifications.show({
      title: 'Error! ❌',
      message: error.message || 'Failed to create post',
      color: 'red',
      autoClose: 7000,
    });
  };

  const { createPost, isSubmiting: isCreating } = useCreatePost(
    handleSuccess,
    handleError
  );

  const handleSubmit = async (values: PostSchemaType) => {
    const transformedData = {
      ...values,
    };

    await createPost(transformedData);
  };

  const handleFormSubmit = form.onSubmit(handleSubmit);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={2}>Add New Lego Post</Title>}
      size='lg'
      centered
    >
      <form onSubmit={handleFormSubmit}>
        <Stack gap='md'>
          <TextInput
            label='Author'
            value={userName || 'Not logged in'}
            disabled
            styles={{
              input: {
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
              },
            }}
          />

          <TextInput
            label='Title'
            placeholder='Enter post title'
            {...form.getInputProps('title')}
            required
          />

          <Textarea
            label='Content'
            placeholder='Describe your Lego build...'
            {...form.getInputProps('content')}
            minRows={4}
            required
          />

          <Group grow>
            <TextInput
              label='Lego Model Number'
              placeholder='e.g., 42100'
              {...form.getInputProps('legoModelNumber')}
              required
            />

            <NumberInput
              label='Number of Pieces'
              placeholder='e.g., 1000'
              {...form.getInputProps('pieces')}
            />
          </Group>

          <TextInput
            label='Contact Phone'
            placeholder='Your phone number'
            {...form.getInputProps('contactPhone')}
            required
          />

          <Select
            label='Build Difficulty'
            data={buildDifficultyOptions}
            {...form.getInputProps('buildDifficulty')}
            required
          />

          <CategorySelector
            value={form.values.categoryIds || []}
            onChange={value => form.setFieldValue('categoryIds', value)}
          />

          <TextInput
            label='Image URL'
            placeholder='https://example.com/image.jpg'
            {...form.getInputProps('imageUrl')}
          />

          <Group justify='flex-end' mt='md'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' loading={isCreating}>
              Create Post
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
