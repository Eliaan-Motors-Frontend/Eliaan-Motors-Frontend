import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaStore, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from '../../assets/images/logos/logo1.png';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user, isAuthenticated, isVendor, isAdmin, logout } = useAuth();
  
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
    if (!isHomePage) return isDark ? 'bg-gray-900 shadow-xl' : 'bg-white shadow-lg';
    if (isScrolled) return isDark ? 'bg-gray-900 shadow-xl' : 'bg-white shadow-lg';
    return 'bg-transparent';
  };

  const getTextColor = () => {
    if (!isHomePage) return isDark ? 'text-gray-100' : 'text-gray-800';
    if (isScrolled) return isDark ? 'text-gray-100' : 'text-gray-800';
    return 'text-white';
  };

  const getBorderColor = () => {
    return isDark ? 'border-gray-700' : 'border-gray-200';
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const getDashboardLink = () => {
    if (isVendor) return '/vendor';
    if (isAdmin) return '/admin';
    return '/dashboard';
  };

  const getDashboardIcon = () => {
    if (isVendor) return <FaStore className="mr-2" />;
    if (isAdmin) return <FaShieldAlt className="mr-2" />;
    return <FaUser className="mr-2" />;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const name = user.fullName || user.businessName || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
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

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                {/* User Avatar with Initials Only */}
                <Link
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-primary/20 text-primary group-hover:bg-primary/30' 
                      : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }`}>
                    <span className="text-sm font-bold">{getUserInitials()}</span>
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className={`px-3 py-2 ${getTextColor()} hover:text-red-500 transition-colors font-medium flex items-center gap-1`}
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button - Themed like Register button but with red */}
                <Link
                  to="/login"
                  className={`px-5 py-2 font-medium transition-all duration-300 rounded-lg ${
                    isDark 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 hover:border-red-500' 
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  Login
                </Link>
                
                {/* Register Button - Primary Color with Theming */}
                <Link
                  to="/signup"
                  className={`px-6 py-2 font-semibold transition-all duration-300 rounded-lg ${
                    isDark 
                      ? 'bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:border-primary' 
                      : 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle + Hamburger Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated && (
              <Link to={getDashboardLink()} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="text-sm font-bold">{getUserInitials()}</span>
                </div>
              </Link>
            )}
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
          <div className={`md:hidden py-4 ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-lg mt-2 shadow-xl border ${getBorderColor()}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 transition-colors ${isActive(link.path) ? 'text-primary' : (isDark ? 'text-gray-100 hover:text-primary' : 'text-gray-800 hover:text-primary')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className={`pt-4 space-y-2 px-4 border-t ${getBorderColor()} mt-2`}>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                    }`}>
                      <span className="text-sm font-bold">{getUserInitials()}</span>
                    </div>
                    <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>
                      {user?.fullName || user?.businessName || 'Account'}
                    </span>
                  </div>
                  <Link
                    to={getDashboardLink()}
                    className={`flex items-center gap-2 w-full text-center px-4 py-2 transition-colors rounded-lg ${
                      isDark 
                        ? 'text-gray-100 hover:text-primary border border-gray-700' 
                        : 'text-gray-800 hover:text-primary border border-gray-200'
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
                    className={`flex items-center gap-2 w-full text-center px-4 py-2 transition-colors rounded-lg ${
                      isDark 
                        ? 'text-red-400 hover:text-red-300 border border-gray-700' 
                        : 'text-red-600 hover:text-red-500 border border-gray-200'
                    }`}
                  >
                    <FaSignOutAlt size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block w-full text-center px-4 py-2 transition-colors rounded-lg font-medium ${
                      isDark 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`block w-full text-center px-4 py-2 rounded-lg transition-all font-semibold ${
                      isDark 
                        ? 'bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30' 
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
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