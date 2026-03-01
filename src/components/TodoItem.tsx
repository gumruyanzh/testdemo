import { TodoItem as TodoItemType } from '../store/offlineStore';
import { useOfflineStore } from '../store/offlineStore';

interface TodoItemProps {
  todo: TodoItemType;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useOfflineStore((state) => state.toggleTodo);
  const deleteTodo = useOfflineStore((state) => state.deleteTodo);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200
                 ${todo.completed ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                 border-gray-200 dark:border-gray-700 hover:shadow-md`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500
                 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {todo.title}
      </span>
      {!todo.syncedToServer && (
        <span
          className="text-xs text-yellow-600 dark:text-yellow-400"
          title="Not synced to server"
        >
          ⏳ Pending
        </span>
      )}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm text-red-600 hover:text-red-700
                 hover:bg-red-50 dark:hover:bg-red-900/20 rounded
                 transition-colors duration-200"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </div>
  );
}
