import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainDrawerNavigator from './src/navigation/MainDrawerNavigator';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MainDrawerNavigator />
    </QueryClientProvider>
  );
}
export default App;
