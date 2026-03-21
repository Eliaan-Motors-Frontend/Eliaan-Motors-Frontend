import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Logo from '../../assets/images/logos/logo1.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
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

  // Check if link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Determine navbar background
  const getNavbarBg = () => {
    if (!isHomePage) return 'bg-white shadow-md';
    if (isScrolled) return 'bg-white/95 backdrop-blur-sm shadow-md';
    return 'bg-transparent';
  };

  // Determine text color
  const getTextColor = () => {
    if (!isHomePage) return 'text-gray-800';
    if (isScrolled) return 'text-gray-800';
    return 'text-white';
  };

  const getButtonStyles = () => {
    if (!isHomePage) {
      return {
        login: 'text-gray-700 hover:text-primary',
        register: 'bg-primary text-white hover:bg-primary-dark'
      };
    }
    if (isScrolled) {
      return {
        login: 'text-gray-700 hover:text-primary',
        register: 'bg-primary text-white hover:bg-primary-dark'
      };
    }
    return {
      login: 'text-white hover:text-primary',
      register: 'bg-primary text-white hover:bg-primary-dark'
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name on Left */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-sm shadow-lg flex items-center justify-center overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 ${!isHomePage || isScrolled ? 'bg-white border-gray-200' : 'bg-white/90 border-white/50'}`}>
              <img src={Logo} alt="Eliaan Motors" className="w-10 h-10 md:w-12 md:h-12 object-contain p-1" />
            </div>
            <span className={`font-bold text-xl md:text-2xl transition-colors duration-300 ${getTextColor()} group-hover:text-primary`}>
              Eliaan <span className="text-primary">Motors</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative ${getTextColor()} hover:text-primary transition-colors duration-200 font-medium text-lg group`}
              >
                {link.name}
                {/* Underline effect on hover */}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`px-5 py-2 ${buttonStyles.login} transition-colors font-medium relative group`}
            >
              Login
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/signup"
              className={`px-6 py-2 ${buttonStyles.register} rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-2xl ${getTextColor()}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-lg mt-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'text-gray-800 hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 px-4">
              <Link
                to="/login"
                className={`block w-full text-center px-4 py-2 transition-colors border rounded-lg ${location.pathname === '/login' ? 'bg-primary text-white border-primary' : 'text-gray-700 hover:text-primary border-gray-300'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`block w-full text-center px-4 py-2 transition-colors rounded-lg ${location.pathname === '/signup' ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
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