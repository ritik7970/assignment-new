import { useNotifications } from "../../contexts/NotificationContext";
import { useEffect } from "react";

const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotifications();

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  const typeColors = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border p-4 rounded shadow ${typeColors[n.type] || typeColors.info}`}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm">{n.message}</p>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-sm font-bold ml-4 text-gray-500 hover:text-black"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
