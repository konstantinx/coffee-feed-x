import './assets/styles/app.pcss';

import { QueryClientProvider } from 'react-query';
import * as ReactDOM from 'react-dom/client';

import queryClient from './query-client';
import CoffeeFeed from './components/coffee-feed';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <CoffeeFeed />
  </QueryClientProvider>
);
