import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-yellow-500 text-gray-900'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-white' : 'bg-gray-900'
          }`}
        />
        <span className="text-sm font-medium">
          {isOnline ? 'Online' : 'Offline - Limited Functionality'}
        </span>
      </div>
    </div>
  );
}
