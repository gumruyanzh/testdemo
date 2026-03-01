import { useOfflineStore } from '../store/offlineStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useOfflineStore((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No tasks yet. Add one to get started!
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tasks
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {completedCount} of {totalCount} completed
        </span>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
