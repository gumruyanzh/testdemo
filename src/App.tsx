import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useOfflineStore } from './store/offlineStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const isOnline = useOnlineStatus();
  const { pendingSync, todos, markAsSynced, removeFromPendingSync } = useOfflineStore();

  // Simulate syncing pending items when coming back online
  useEffect(() => {
    if (isOnline && pendingSync.length > 0) {
      // In a real app, this would sync with a server
      console.log('Syncing pending items:', pendingSync);

      // Simulate async sync operation
      const syncTimer = setTimeout(() => {
        pendingSync.forEach((id) => {
          const todo = todos.find((t) => t.id === id);
          if (todo) {
            markAsSynced(id);
            removeFromPendingSync(id);
          }
        });
      }, 2000);

      return () => clearTimeout(syncTimer);
    }
  }, [isOnline, pendingSync, todos, markAsSynced, removeFromPendingSync]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <OfflineIndicator />
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Offline Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Works seamlessly even without internet connection
          </p>
        </header>
        <main>
          <AddTodoForm />
          <TodoList />
        </main>
        {pendingSync.length > 0 && isOnline && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Syncing {pendingSync.length} item(s) to server...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
