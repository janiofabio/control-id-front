// queryClientSetup.ts
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error: any) => {
        console.error('Mutation error:', error);
        // talvez trate o erro
      },
    },
  },
});

export { queryClient, QueryClientProvider };
