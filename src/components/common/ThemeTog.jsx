import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full transition-all duration-500 focus:outline-none backdrop-blur-sm"
      style={{
        background: isDark 
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.05)',
        border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      {/* Background Glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(0,255,0,0.2), transparent)'
        }}
      />
      
      {/* Sliding Circle */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 ease-out flex items-center justify-center ${
          isDark ? 'left-1 bg-primary' : 'right-1 bg-white'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 0 12px rgba(0,255,0,0.6)'
            : '0 2px 8px rgba(0,0,0,0.1)',
          transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)'
        }}
      >
        {isDark ? (
          <FaMoon className="text-black text-xs" />
        ) : (
          <FaSun className="text-orange-500 text-xs" />
        )}
      </div>
      
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <FaSun className={`text-xs transition-all duration-300 ${isDark ? 'text-gray-500 opacity-50' : 'text-yellow-500 opacity-100 scale-110'}`} />
        <FaMoon className={`text-xs transition-all duration-300 ${isDark ? 'text-white opacity-100 scale-110' : 'text-gray-500 opacity-50'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;