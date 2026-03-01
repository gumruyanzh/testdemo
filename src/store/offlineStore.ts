import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  syncedToServer: boolean;
}

interface OfflineState {
  todos: TodoItem[];
  pendingSync: string[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  markAsSynced: (id: string) => void;
  addToPendingSync: (id: string) => void;
  removeFromPendingSync: (id: string) => void;
}

export const useOfflineStore = create<OfflineState>()(
  persist(
    (set) => ({
      todos: [],
      pendingSync: [],

      addTodo: (title: string) => {
        const newTodo: TodoItem = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: Date.now(),
          syncedToServer: false,
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
          pendingSync: [...state.pendingSync, newTodo.id],
        }));
      },

      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, syncedToServer: false }
              : todo
          ),
          pendingSync: state.pendingSync.includes(id)
            ? state.pendingSync
            : [...state.pendingSync, id],
        })),

      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          pendingSync: state.pendingSync.filter((syncId) => syncId !== id),
        })),

      markAsSynced: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, syncedToServer: true } : todo
          ),
        })),

      addToPendingSync: (id: string) =>
        set((state) => ({
          pendingSync: state.pendingSync.includes(id)
            ? state.pendingSync
            : [...state.pendingSync, id],
        })),

      removeFromPendingSync: (id: string) =>
        set((state) => ({
          pendingSync: state.pendingSync.filter((syncId) => syncId !== id),
        })),
    }),
    {
      name: 'offline-storage',
    }
  )
);
