import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Breeds } from './Breeds';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">Paw-gination</h1>
        <Breeds />
      </div>
    </QueryClientProvider>
  );
};

export default App;
