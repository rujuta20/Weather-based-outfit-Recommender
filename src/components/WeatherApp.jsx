import { useWeather } from "./hooks/useWeather";
import { mockWeatherAPI } from "./services/weatherAPI";
import { ThemeToggle } from "./common/ThemeToggle";
import { SearchInput } from "./search/SearchInput";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { WeatherCard } from "./weather/WeatherCard";
import { SearchHistory } from "./search/SearchHistory";
import { Cloud } from "lucide-react";

export const WeatherApp = () => {
  const { 
    currentWeather, 
    setCurrentWeather, 
    addToHistory, 
    loading, 
    setLoading, 
    error, 
    setError,
    darkMode 
  } = useWeather();

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await mockWeatherAPI(city);
      setCurrentWeather(weatherData);
      addToHistory(weatherData.city);
    } catch (err) {
      setError(`Unable to find weather data for "${city}". Please try another city.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className={`text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Weather Outfit Guide
            </h1>
            <ThemeToggle />
          </div>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get weather updates and perfect outfit recommendations
          </p>
        </div>

        <div className="mb-8">
          <SearchInput onSearch={handleSearch} />
        </div>

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {currentWeather && !loading && (
              <WeatherCard weather={currentWeather} />
            )}
          </div>
          <div>
            <SearchHistory />
          </div>
        </div>

        {!currentWeather && !loading && !error && (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Cloud className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Search for a city to get started!</p>
          </div>
        )}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Animation Classes */
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .transition-colors {
          transition: color 0.2s ease, background-color 0.2s ease;
        }

        .duration-200 { transition-duration: 0.2s; }
        .duration-300 { transition-duration: 0.3s; }
        .duration-500 { transition-duration: 0.5s; }

        /* Hover Effects */
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:bg-gray-50:hover {
          background-color: #f9fafb;
        }

        .hover\\:bg-gray-200:hover {
          background-color: #e5e7eb;
        }

        .hover\\:bg-gray-600:hover {
          background-color: #4b5563;
        }

        .hover\\:bg-gray-700:hover {
          background-color: #374151;
        }

        .hover\\:bg-yellow-300:hover {
          background-color: #fcd34d;
        }

        .hover\\:from-blue-600:hover {
          --tw-gradient-from: #2563eb;
        }

        .hover\\:to-purple-700:hover {
          --tw-gradient-to: #7c3aed;
        }

        /* Focus States */
        .focus\\:outline-none:focus {
          outline: none;
        }

        .focus\\:border-blue-400:focus {
          border-color: #60a5fa;
        }

        .focus\\:border-blue-500:focus {
          border-color: #3b82f6;
        }

        /* Disabled States */
        .disabled\\:opacity-50:disabled {
          opacity: 0.5;
        }

        .disabled\\:cursor-not-allowed:disabled {
          cursor: not-allowed;
        }

        /* Layout Classes */
        .min-h-screen { min-height: 100vh; }
        .max-w-4xl { max-width: 56rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .container { width: 100%; }

        /* Spacing */
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .p-12 { padding: 3rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .pl-12 { padding-left: 3rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mr-2 { margin-right: 0.5rem; }

        /* Flexbox & Grid */
        .flex { display: flex; }
        .grid { display: grid; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

        /* Responsive Grid */
        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\\:col-span-2 { grid-column: span 2 / span 2; }
        }

        /* Positioning */
        .relative { position: relative; }
        .absolute { position: absolute; }
        .top-full { top: 100%; }
        .top-1\\/2 { top: 50%; }
        .left-0 { left: 0; }
        .left-4 { left: 1rem; }
        .right-0 { right: 0; }
        .right-2 { right: 0.5rem; }
        .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .-translate-y-1\\/2 { --tw-translate-y: -50%; }
        .z-10 { z-index: 10; }

        /* Typography */
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .capitalize { text-transform: capitalize; }

        /* Colors */
        .text-white { color: #ffffff; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-900 { color: #111827; }
        .text-blue-500 { color: #3b82f6; }
        .text-blue-600 { color: #2563eb; }
        .text-green-600 { color: #16a34a; }
        .text-yellow-400 { color: #facc15; }
        .text-yellow-500 { color: #eab308; }
        .text-yellow-600 { color: #ca8a04; }
        .text-red-300 { color: #fca5a5; }
        .text-red-600 { color: #dc2626; }
        .text-red-700 { color: #b91c1c; }
        .text-purple-500 { color: #8b5cf6; }
        .text-purple-600 { color: #7c3aed; }

        /* Background Colors */
        .bg-white { background-color: #ffffff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-600 { background-color: #4b5563; }
        .bg-gray-700 { background-color: #374151; }
        .bg-gray-800 { background-color: #1f2937; }
        .bg-gray-900 { background-color: #111827; }
        .bg-blue-50 { background-color: #eff6ff; }
        .bg-red-50 { background-color: #fef2f2; }
        .bg-yellow-400 { background-color: #facc15; }

        /* Background Gradients */
        .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
        }
        .bg-gradient-to-r {
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
        }
        .from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
        .from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
        .from-gray-800 { --tw-gradient-from: #1f2937; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(31, 41, 55, 0)); }
        .from-gray-900 { --tw-gradient-from: #111827; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(17, 24, 39, 0)); }
        .from-white { --tw-gradient-from: #ffffff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0)); }
        .via-gray-800 { --tw-gradient-stops: var(--tw-gradient-from), #1f2937, var(--tw-gradient-to, rgba(31, 41, 55, 0)); }
        .via-white { --tw-gradient-stops: var(--tw-gradient-from), #ffffff, var(--tw-gradient-to, rgba(255, 255, 255, 0)); }
        .to-gray-50 { --tw-gradient-to: #f9fafb; }
        .to-gray-900 { --tw-gradient-to: #111827; }
        .to-purple-50 { --tw-gradient-to: #faf5ff; }
        .to-purple-600 { --tw-gradient-to: #7c3aed; }

        /* Borders */
        .border { border-width: 1px; }
        .border-2 { border-width: 2px; }
        .border-l-4 { border-left-width: 4px; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-600 { border-color: #4b5563; }
        .border-red-500 { border-color: #ef4444; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .rounded-full { border-radius: 9999px; }
        .rounded-t-xl { border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; }
        .rounded-b-xl { border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; }

        /* Width & Height */
        .w-full { width: 100%; }
        .w-2 { width: 0.5rem; }
        .w-3 { width: 0.75rem; }
        .w-4 { width: 1rem; }
        .w-5 { width: 1.25rem; }
        .w-6 { width: 1.5rem; }
        .w-8 { width: 2rem; }
        .w-12 { width: 3rem; }
        .w-16 { width: 4rem; }
        .h-2 { height: 0.5rem; }
        .h-3 { height: 0.75rem; }
        .h-4 { height: 1rem; }
        .h-5 { height: 1.25rem; }
        .h-6 { height: 1.5rem; }
        .h-8 { height: 2rem; }
        .h-12 { height: 3rem; }
        .h-16 { height: 4rem; }

        /* Display & Visibility */
        .inline { display: inline; }
        .block { display: block; }
        .hidden { display: none; }
        .opacity-50 { opacity: 0.5; }
        .opacity-60 { opacity: 0.6; }

        /* Shadows */
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .shadow-xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Special Effects */
        .backdrop-blur { backdrop-filter: blur(8px); }
        .cursor-not-allowed { cursor: not-allowed; }

        /* Dark Mode Variants */
        .dark\\:bg-gray-700\\/30 { background-color: rgba(55, 65, 81, 0.3); }
        .dark\\:bg-gray-700\\/50 { background-color: rgba(55, 65, 81, 0.5); }
        .dark\\:bg-red-900\\/20 { background-color: rgba(127, 29, 29, 0.2); }

        /* Custom Backgrounds */
        .bg-gray-700\\/30 { background-color: rgba(55, 65, 81, 0.3); }
        .bg-gray-700\\/50 { background-color: rgba(55, 65, 81, 0.5); }
        .bg-red-900\\/20 { background-color: rgba(127, 29, 29, 0.2); }

        /* Space utilities */
        .space-y-2 > * + * { margin-top: 0.5rem; }

        /* Keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .container {
            padding: 0 0.5rem;
          }
          
          .text-4xl {
            font-size: 2rem;
            line-height: 2.25rem;
          }
          
          .grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};