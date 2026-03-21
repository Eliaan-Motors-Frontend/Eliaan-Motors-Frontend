import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Logo from '../../assets/images/logos/logo1.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Listings', path: '/listings' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // On homepage, navbar always stays dark/transparent
  // On other pages, navbar adapts to theme but stays dark
  const getNavbarBg = () => {
    if (isHomePage) {
      if (isScrolled) return 'bg-black shadow-xl';
      return 'bg-transparent';
    }
    // For non-home pages, always black (dark theme)
    return 'bg-black shadow-xl';
  };

  const getTextColor = () => {
    // Always white text for consistency
    return 'text-white';
  };

  const getBorderColor = () => {
    return 'border-gray-800';
  };

  const getButtonBg = () => {
    return 'bg-black';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img src={Logo} alt="Eliaan Motors" className="w-8 h-8 md:w-10 md:h-10 object-contain p-1" />
            </div>
            <span className="font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors">
              Eliaan <span className="text-primary">Motors</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-white hover:text-primary transition-colors duration-200 font-medium group`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="px-5 py-2 text-white hover:text-primary transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-6 py-2 ${getButtonBg()} text-primary border ${getBorderColor()} rounded-lg hover:border-primary transition-all duration-300 font-semibold`}
            >
              Register
            </Link>
          </div>

          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 bg-black rounded-lg mt-2 shadow-xl border border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 transition-colors ${isActive(link.path) ? 'text-primary' : 'text-white hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 px-4 border-t border-gray-800 mt-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-white">Theme</span>
                <ThemeToggle />
              </div>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-white hover:text-primary transition-colors border border-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-black text-primary border border-gray-800 rounded-lg hover:border-primary transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;