import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {/* Icons Background - Fixed positioning */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <FaSun className={`text-xs transition-all duration-300 ${
          isDark ? 'text-yellow-400 opacity-50' : 'text-yellow-500 opacity-100 scale-110'
        }`} />
        <FaMoon className={`text-xs transition-all duration-300 ${
          isDark ? 'text-blue-300 opacity-100 scale-110' : 'text-gray-400 opacity-50'
        }`} />
      </div>
      
      {/* Moving Circle */}
      <div
        className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-500 ease-out flex items-center justify-center ${
          isDark ? 'left-1 bg-primary' : 'right-1 bg-white'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 0 8px rgba(0,255,0,0.5)'
            : '0 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        {isDark ? (
          <FaMoon className="text-black text-[10px]" />
        ) : (
          <FaSun className="text-yellow-500 text-[10px]" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;