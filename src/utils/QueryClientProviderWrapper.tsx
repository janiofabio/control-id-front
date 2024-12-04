// QueryClientProviderWrapper.tsx
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@utils/queryClientSetup';

const QueryClientProviderWrapper: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientProviderWrapper;
