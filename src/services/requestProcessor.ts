import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function RequestProcessor() {
  const queryClient = useQueryClient();

  // Custom query function
  function useQueryWrapper<T>(key: any, queryFunction: any, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  // Custom mutation function as a React Hook
  function useMutate(key: any, mutationFunction: any, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => {
        return queryClient.invalidateQueries(key)
      },
      ...options,
    });
  }

  return { useQueryWrapper, useMutate }; // Updated function name to useMutate
}
