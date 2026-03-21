import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Logo from '../../assets/images/logos/logo1.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Listings', path: '/listings' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name on Left */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/50">
              <img src={Logo} alt="Eliaan Motors" className="w-10 h-10 md:w-12 md:h-12 object-contain p-1" />
            </div>
            <span className="font-bold text-xl md:text-2xl text-white">
              Eliaan <span className="text-primary">Motors</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-primary transition-colors duration-200 font-medium text-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 text-white hover:text-primary transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-md"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-black/80 backdrop-blur-md rounded-lg mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 px-4 text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 px-4">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-white hover:text-primary transition-colors border border-white rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
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