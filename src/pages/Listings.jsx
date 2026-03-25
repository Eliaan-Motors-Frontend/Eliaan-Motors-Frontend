import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaStar, 
  FaGasPump, 
  FaUsers, 
  FaCog,
  FaFilter,
  FaTimes,
  FaHeart,
  FaRegHeart,
  FaSort,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCar,
  FaEye,
  FaSpinner
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import ListingsBackground from '../assets/images/Homepage/Home9.jpg';

// Import brand logos
import BmwLogo from '../assets/images/logos/bmw.avif';
import MercedesLogo from '../assets/images/logos/mercedez.jpg';
import AudiLogo from '../assets/images/logos/audi.jpg';
import ToyotaLogo from '../assets/images/logos/toyota.jpg';
import HondaLogo from '../assets/images/logos/honda.jpg';
import LandRoverLogo from '../assets/images/logos/land rover.jpg';
import HyundaiLogo from '../assets/images/logos/hyundai.jpg';
import KiaLogo from '../assets/images/logos/Kia.jpg';
import FordLogo from '../assets/images/logos/ford.jpg';
import NissanLogo from '../assets/images/logos/nissan.jpg';

// Car brand logos with actual images
const carBrands = [
  { name: 'BMW', logo: BmwLogo, color: '#1E88E5', bgColor: 'bg-blue-900/40', borderColor: 'border-blue-500/50' },
  { name: 'Mercedes', logo: MercedesLogo, color: '#00BFFF', bgColor: 'bg-cyan-900/40', borderColor: 'border-cyan-500/50' },
  { name: 'Audi', logo: AudiLogo, color: '#FF0000', bgColor: 'bg-red-900/40', borderColor: 'border-red-500/50' },
  { name: 'Toyota', logo: ToyotaLogo, color: '#DC143C', bgColor: 'bg-red-900/40', borderColor: 'border-red-500/50' },
  { name: 'Honda', logo: HondaLogo, color: '#FFA500', bgColor: 'bg-orange-900/40', borderColor: 'border-orange-500/50' },
  { name: 'Land Rover', logo: LandRoverLogo, color: '#228B22', bgColor: 'bg-green-900/40', borderColor: 'border-green-500/50' },
  { name: 'Hyundai', logo: HyundaiLogo, color: '#4B0082', bgColor: 'bg-purple-900/40', borderColor: 'border-purple-500/50' },
  { name: 'Kia', logo: KiaLogo, color: '#FFD700', bgColor: 'bg-yellow-900/40', borderColor: 'border-yellow-500/50' },
  { name: 'Ford', logo: FordLogo, color: '#4169E1', bgColor: 'bg-blue-900/40', borderColor: 'border-blue-500/50' },
  { name: 'Nissan', logo: NissanLogo, color: '#C0C0C0', bgColor: 'bg-gray-700/40', borderColor: 'border-gray-500/50' }
];

const Listings = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const { isAuthenticated, isVendor } = useAuth(); // Add role check
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    selectedBrands: [],
    transmission: [],
    seats: [],
    fuelType: [],
    sortBy: 'price_low'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    fetchCars();
  }, [filters, currentPage]);

  useEffect(() => {
    if (isAuthenticated && !isVendor) {
      fetchFavorites();
    }
  }, [isAuthenticated, isVendor]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.priceRange[1] < 500) {
        params.append('maxPrice', filters.priceRange[1]);
      }
      if (filters.transmission.length > 0) {
        params.append('transmission', filters.transmission.join(','));
      }
      if (filters.seats.length > 0) {
        params.append('seats', filters.seats.join(','));
      }
      if (filters.fuelType.length > 0) {
        params.append('fuelType', filters.fuelType.join(','));
      }
      
      let sortParam = '';
      switch(filters.sortBy) {
        case 'price_low':
          sortParam = 'price_asc';
          break;
        case 'price_high':
          sortParam = 'price_desc';
          break;
        case 'rating':
          sortParam = 'rating';
          break;
        default:
          sortParam = 'newest';
      }
      params.append('sort', sortParam);
      params.append('page', currentPage);
      params.append('limit', 9);
      
      const response = await api.get(`/cars?${params.toString()}`);
      
      let carsData = [];
      if (response.data.cars) {
        carsData = response.data.cars;
        setTotalPages(response.data.pages || 1);
        setTotalCars(response.data.total || 0);
      } else if (Array.isArray(response.data)) {
        carsData = response.data;
        setTotalPages(Math.ceil(carsData.length / 9));
        setTotalCars(carsData.length);
      }
      
      let filteredCars = carsData;
      if (filters.selectedBrands.length > 0) {
        filteredCars = carsData.filter(car => 
          filters.selectedBrands.includes(car.brand)
        );
      }
      
      setCars(filteredCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      const favoriteIds = response.data.map(fav => fav.carId?._id || fav.carId);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (carId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    if (isVendor) {
      alert('Vendors cannot save favorites. Create a user account to save favorites.');
      return;
    }
    
    try {
      if (favorites.includes(carId)) {
        await api.delete(`/favorites/${carId}`);
        setFavorites(favorites.filter(id => id !== carId));
      } else {
        await api.post('/favorites', { carId });
        setFavorites([...favorites, carId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleBrandFilter = (brand) => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
    setCurrentPage(1);
  };

  const transmissionOptions = ['Automatic', 'Manual'];
  const seatOptions = ['2', '4', '5', '7'];
  const fuelOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

  const itemsPerPage = 9;
  const paginatedCars = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPagesFiltered = Math.ceil(cars.length / itemsPerPage);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32"
        style={{ 
          backgroundImage: `url(${ListingsBackground})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'bg-gradient-to-b from-black/90 to-black/80' : 'bg-gradient-to-b from-black/80 to-black/70'}`}></div>
        
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full mb-6">
              <span className="text-white font-semibold text-sm">Premium Vehicle Rentals</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="text-white">Browse Our</span>{' '}
              <span className="text-primary">Premium Fleet</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Choose from a wide selection of luxury, economy, and SUV vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className={`${isDark ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white'} rounded-2xl shadow-2xl p-6 sticky top-24 border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                  <FaFilter className="text-primary" />
                  Filters
                </h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Car Brand Filters */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span>Car Brands</span>
                  <FaChevronDown className="text-gray-400 text-sm" />
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {carBrands.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => toggleBrandFilter(brand.name)}
                      className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 ${
                        filters.selectedBrands.includes(brand.name)
                          ? `${brand.bgColor} border ${brand.borderColor} shadow-lg transform scale-105`
                          : `${isDark ? 'bg-gray-800 border-gray-700 hover:border-primary/50' : 'bg-gray-50 border-gray-200 hover:border-primary/50'} border`
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
                      </div>
                      <span className={`text-sm font-medium ${filters.selectedBrands.includes(brand.name) ? 'text-primary' : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>
                        {brand.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Price Range (GHS)</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>₵0</span>
                    <span className="text-primary font-semibold">₵{filters.priceRange[1]}</span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>₵500+</span>
                  </div>
                </div>
              </div>
              
              {/* Transmission */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Transmission</h4>
                <div className="flex flex-wrap gap-2">
                  {transmissionOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          transmission: prev.transmission.includes(option)
                            ? prev.transmission.filter(t => t !== option)
                            : [...prev.transmission, option]
                        }));
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filters.transmission.includes(option)
                          ? 'bg-black text-white shadow-lg'
                          : `${isDark ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-200'} border`
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Seats */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Seats</h4>
                <div className="flex flex-wrap gap-2">
                  {seatOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          seats: prev.seats.includes(option)
                            ? prev.seats.filter(s => s !== option)
                            : [...prev.seats, option]
                        }));
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filters.seats.includes(option)
                          ? 'bg-black text-white shadow-lg'
                          : `${isDark ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-200'} border`
                      }`}
                    >
                      {option} Seats
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Fuel Type */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Fuel Type</h4>
                <div className="flex flex-wrap gap-2">
                  {fuelOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          fuelType: prev.fuelType.includes(option)
                            ? prev.fuelType.filter(f => f !== option)
                            : [...prev.fuelType, option]
                        }));
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filters.fuelType.includes(option)
                          ? 'bg-black text-white shadow-lg'
                          : `${isDark ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-200'} border`
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setFilters({
                    priceRange: [0, 500],
                    selectedBrands: [],
                    transmission: [],
                    seats: [],
                    fuelType: [],
                    sortBy: 'price_low'
                  });
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 rounded-xl transition-all font-medium bg-black text-white hover:bg-gray-800 border border-gray-700"
              >
                Clear All Filters
              </button>
            </div>
          </div>
          
          {/* Cars Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className={`${isDark ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white'} rounded-2xl shadow-xl p-4 mb-8 flex flex-wrap justify-between items-center gap-4 border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`lg:hidden flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'} border`}
                >
                  <FaFilter className="text-primary" />
                  <span className={isDark ? 'text-white' : 'text-gray-700'}>Filters</span>
                </button>
                <div className="flex items-center space-x-3">
                  <FaSort className="text-primary" />
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => {
                      setFilters({...filters, sortBy: e.target.value});
                      setCurrentPage(1);
                    }}
                    className={`rounded-xl px-4 py-2 focus:outline-none focus:border-primary cursor-pointer ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                  >
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-primary animate-pulse`}></div>
                <p className="text-primary font-semibold">{cars.length} cars found</p>
              </div>
            </div>
            
            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <FaSpinner className="animate-spin text-4xl text-primary" />
              </div>
            ) : paginatedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedCars.map((car) => (
                  <div key={car._id || car.id} className={`group ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border ${isDark ? 'border-gray-800 hover:border-primary/50' : 'border-gray-200 hover:border-primary/30'} transform hover:-translate-y-1`}>
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56">
                      <img 
                        src={car.mainImage || car.images?.[0] || 'https://via.placeholder.com/600x400'} 
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {!isVendor && (
                        <button 
                          onClick={() => toggleFavorite(car._id || car.id)}
                          className={`absolute top-4 right-4 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110`}
                        >
                          {favorites.includes(car._id || car.id) ? (
                            <FaHeart className="text-red-500 text-lg" />
                          ) : (
                            <FaRegHeart className={isDark ? 'text-white' : 'text-gray-700'} />
                          )}
                        </button>
                      )}
                      {car.featured && (
                        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className={`text-xl font-bold group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{car.brand} • {car.year}</p>
                        </div>
                        <div className={`flex items-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'} px-2 py-1 rounded-lg`}>
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className={`text-sm font-semibold ml-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.rating || 0}</span>
                          <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({car.reviews || 0})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm mb-4">
                        <FaCar className="text-primary text-xs mr-1" />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{car.location}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className={`flex items-center gap-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} px-3 py-1.5 rounded-lg`}>
                          <FaCog className="text-primary" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{car.transmission}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} px-3 py-1.5 rounded-lg`}>
                          <FaUsers className="text-primary" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{car.seats} Seats</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} px-3 py-1.5 rounded-lg`}>
                          <FaGasPump className="text-primary" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{car.fuelType}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#E5E7EB' }}>
                        <div>
                          <span className="text-2xl font-bold text-primary">₵{car.pricePerDay}</span>
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>/day</span>
                          {car.originalPrice > car.pricePerDay && (
                            <span className={`text-xs line-through ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>₵{car.originalPrice}</span>
                          )}
                        </div>
                        <Link 
                          to={`/car/${car._id || car.id}`}
                          className="px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 text-sm font-bold flex items-center gap-2"
                        >
                          <FaEye size={14} />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <FaCar className={`text-6xl mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No cars found matching your criteria</p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Try adjusting your filters</p>
                <button 
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 500],
                      selectedBrands: [],
                      transmission: [],
                      seats: [],
                      fuelType: [],
                      sortBy: 'price_low'
                    });
                    setCurrentPage(1);
                  }}
                  className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPagesFiltered > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'} border`}
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPagesFiltered)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-xl transition-all font-medium ${
                      currentPage === i + 1
                        ? 'bg-black text-white shadow-lg'
                        : `${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'} border`
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPagesFiltered, currentPage + 1))}
                  disabled={currentPage === totalPagesFiltered}
                  className={`p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'} border`}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Listings;