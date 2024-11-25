import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootStackNavigator from './src/navigation/RootStackNavigator';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootStackNavigator />
    </QueryClientProvider>
  );
}
export default App;
