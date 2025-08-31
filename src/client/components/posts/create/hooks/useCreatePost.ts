import { KEYS } from '@/src/client/config/swr';
import { PostSchemaType } from '@/src/types';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

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
        handleError(error)
      },
      throwOnError: false,
    }
  );

  return {
    createPost: trigger,
    isSubmiting: isMutating,
    error,
    data,
  };
};