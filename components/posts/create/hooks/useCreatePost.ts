import { KEYS } from '@/client/config/swr';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { PostSchemaType } from '../types';

const fetcher = async (_url: string, { arg }: { arg: Partial<PostSchemaType> }) => {
  const response = await fetch(KEYS.POSTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  return response.json()
};

export const useCreatePost = (handleSuccess: () => void, handleError: (error: Error) => void) => {
  const { trigger, isMutating, error, data, } = useSWRMutation(
    KEYS.POSTS, fetcher,
    {
      onSuccess: async () => {
        await mutate((key) => typeof key === 'string' && key.startsWith(KEYS.POSTS));
        handleSuccess()
      },
      onError: (error: Error) => {
        console.error(error)
        handleError(error)

      },
      throwOnError: false,
    }
  );

  return {
    createPost: trigger,
    isCreating: isMutating,
    error,
    data,
  };
};