import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import HomeBackground from '../../assets/images/Homepage/Home2.png';

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${HomeBackground})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 md:py-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-4xl mx-auto">
          Find, book and rent a car
          <span className="text-primary"> Easily</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Buy and sell reputable cars. Renting a car is easy and fast with Eliaan Motors.
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-12 mb-10">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
            <p className="text-white text-sm md:text-base">Car Models</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
            <p className="text-white text-sm md:text-base">Happy Clients</p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="flex items-center justify-center gap-2 text-white mb-8">
          <FaMapMarkerAlt className="text-primary" />
          <span>Ashaley Botwe, Accra</span>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pickup date"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                defaultValue="Tue 15 Feb, 09:00"
              />
            </div>
            <button className="bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-semibold">
              <FaSearch />
              Search Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;