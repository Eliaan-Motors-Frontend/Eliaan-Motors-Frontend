import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import HomeBackground from '../../assets/images/Homepage/Home2.png';

const HeroSection = () => {
  const { isDark } = useTheme();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${HomeBackground})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dynamic Overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'bg-black/80' : 'bg-black/40'}`}></div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 md:py-40">
        {/* Main Heading with Red Text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-4xl mx-auto animate-fade-in-up">
          Find, book and{' '}
          <span className="text-red-500">
            rent a car
          </span>
          {' '}
          <span className="text-primary"> Easily</span>
        </h1>
        
        {/* Animated Subheading */}
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Buy and sell reputable cars. Renting a car is easy and fast with Eliaan Motors.
        </p>
        
        {/* Stats with Stagger Animation */}
        <div className="flex justify-center gap-12 mb-10">
          <div className="animate-fade-in-up animation-delay-400">
            <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
            <p className="text-gray-200 text-sm md:text-base">Car Models</p>
          </div>
          <div className="animate-fade-in-up animation-delay-500">
            <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
            <p className="text-gray-200 text-sm md:text-base">Happy Clients</p>
          </div>
        </div>

        {/* Location Badge with Animation */}
        <div className="flex items-center justify-center gap-2 text-gray-200 mb-10 animate-fade-in-up animation-delay-600">
          <FaMapMarkerAlt className="text-primary" />
          <span>Ashaley Botwe, Accra</span>
        </div>

        {/* Get Started Button with Bouncing Animation */}
        <div className="animate-bounce-slow">
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-black font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Get Started</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;