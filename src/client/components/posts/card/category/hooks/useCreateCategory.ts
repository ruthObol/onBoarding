import { KEYS } from '@/src/client/config/swr';
import { mutate } from 'swr';
import { notifications } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';

interface Category {
  id: number;
  name: string;
}

const fetcher = async (_url: string, { arg }: { arg: Partial<Category> }) => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  return response.json()
};

export function useCreateCategory() {
  const { trigger, isMutating } = useSWRMutation(
    KEYS.CATEGORIES,
    fetcher,
    {
      onSuccess: async () => {
        await mutate((key) => typeof key === 'string' && key.startsWith(KEYS.CATEGORIES));
      },
      onError: (error: Error) => {
        notifications.show({
          title: 'Error',
          message: error.message,
          color: 'red',
        });
      },
      throwOnError: false,
    }
  );

  return {
    createCategory: trigger,
    isCreating: isMutating,
  };
}
