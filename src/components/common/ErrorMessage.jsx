import { useWeather } from "../hooks/useWeather";
export const ErrorMessage = ({ message }) => {
  const { darkMode } = useWeather();
  
  return (
    <div className={`rounded-xl p-4 border-l-4 border-red-500 ${
      darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'
    }`}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="font-medium">Error</span>
      </div>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};