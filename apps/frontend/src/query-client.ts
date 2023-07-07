import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      staleTime: 60 * 1000 * 5,
    },
  },
});

export default queryClient;
