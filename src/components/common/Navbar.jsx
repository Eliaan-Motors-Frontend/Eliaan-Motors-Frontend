import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaStore } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from '../../assets/images/logos/logo1.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user, isAuthenticated, isVendor, logout } = useAuth();
  
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

  const getNavbarBg = () => {
    if (!isHomePage) return isDark ? 'bg-black shadow-xl' : 'bg-white shadow-lg';
    if (isScrolled) return isDark ? 'bg-black shadow-xl' : 'bg-white shadow-lg';
    return 'bg-transparent';
  };

  const getTextColor = () => {
    if (!isHomePage) return isDark ? 'text-white' : 'text-gray-900';
    if (isScrolled) return isDark ? 'text-white' : 'text-gray-900';
    return 'text-white';
  };

  const getBorderColor = () => {
    return isDark ? 'border-gray-800' : 'border-gray-200';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (isVendor) {
      return '/vendor';
    }
    return '/dashboard';
  };

  // Get dashboard icon based on user role
  const getDashboardIcon = () => {
    if (isVendor) {
      return <FaStore className="mr-2" />;
    }
    return <FaUser className="mr-2" />;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm flex items-center justify-center overflow-hidden`}>
              <img src={Logo} alt="Eliaan Motors" className="w-8 h-8 md:w-10 md:h-10 object-contain p-1" />
            </div>
            <span className={`font-bold text-lg md:text-xl ${getTextColor()} group-hover:text-primary transition-colors`}>
              Eliaan <span className="text-primary">Motors</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative ${getTextColor()} hover:text-primary transition-colors duration-200 font-medium group`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              // Show Dashboard and Logout when logged in
              <>
                <Link
                  to={getDashboardLink()}
                  className={`px-5 py-2 ${getTextColor()} hover:text-primary transition-colors font-medium flex items-center`}
                >
                  {getDashboardIcon()}
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-5 py-2 ${getTextColor()} hover:text-red-500 transition-colors font-medium`}
                >
                  Logout
                </button>
              </>
            ) : (
              // Show Login and Register when logged out
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2 ${getTextColor()} hover:text-primary transition-colors font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-2 ${isDark ? 'bg-black' : 'bg-white'} text-primary border ${getBorderColor()} rounded-lg hover:border-primary transition-all duration-300 font-semibold`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle + Hamburger Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              className={`text-2xl ${getTextColor()}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 ${isDark ? 'bg-black' : 'bg-white'} rounded-lg mt-2 shadow-xl border ${getBorderColor()}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 transition-colors ${isActive(link.path) ? 'text-primary' : (isDark ? 'text-white hover:text-primary' : 'text-gray-900 hover:text-primary')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className={`pt-4 space-y-2 px-4 border-t ${getBorderColor()} mt-2`}>
              {isAuthenticated ? (
                // Mobile: Dashboard and Logout when logged in
                <>
                  <Link
                    to={getDashboardLink()}
                    className={`flex items-center justify-center w-full text-center px-4 py-2 transition-colors rounded-lg ${
                      isDark 
                        ? 'text-white hover:text-primary border border-gray-800' 
                        : 'text-gray-900 hover:text-primary border border-gray-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getDashboardIcon()}
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-center w-full text-center px-4 py-2 transition-colors rounded-lg ${
                      isDark 
                        ? 'text-red-400 hover:text-red-300 border border-gray-800' 
                        : 'text-red-600 hover:text-red-500 border border-gray-200'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Mobile: Login and Register when logged out
                <>
                  <Link
                    to="/login"
                    className={`block w-full text-center px-4 py-2 transition-colors border rounded-lg ${
                      isDark ? 'text-white hover:text-primary border-gray-800' : 'text-gray-900 hover:text-primary border-gray-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;