import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaGasPump, 
  FaUsers, 
  FaCog,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaWifi,
  FaSnowflake,
  FaMusic,
  FaCar,
  FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Mock car data (will come from API)
const MOCK_CARS = {
  1: {
    id: 1,
    name: 'Mercedes Benz C-Class',
    brand: 'Mercedes',
    mainImage: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
    images: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    pricePerDay: 250,
    originalPrice: 300,
    location: 'Airport Residential, Accra',
    rating: 4.8,
    reviews: 124,
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Petrol',
    year: 2023,
    featured: true,
    description: 'Experience the perfect blend of luxury and performance with the Mercedes Benz C-Class. This premium sedan offers exceptional comfort, advanced technology, and a smooth driving experience. Perfect for business trips, airport transfers, or special occasions.',
    features: [
      'Leather Seats',
      'Apple CarPlay',
      'Android Auto',
      'Bluetooth',
      'Backup Camera',
      'Parking Sensors',
      'Sunroof',
      'Heated Seats',
      'Keyless Entry',
      'Premium Sound System'
    ],
    vendor: {
      name: 'Eliaan Motors',
      rating: 4.9,
      reviews: 342,
      joined: '2020',
      phone: '+233 24 123 4567',
      email: 'info@eliaanmotors.com',
      address: 'Ashaley Botwe, Accra'
    },
    insurance: {
      included: true,
      details: 'Comprehensive insurance coverage with zero excess'
    },
    mileage: 'Unlimited'
  },
  2: {
    id: 2,
    name: 'BMW X5',
    brand: 'BMW',
    mainImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ],
    pricePerDay: 350,
    originalPrice: 400,
    location: 'Cantonments, Accra',
    rating: 4.9,
    reviews: 56,
    transmission: 'Automatic',
    seats: 7,
    fuelType: 'Diesel',
    year: 2023,
    featured: true,
    description: 'The BMW X5 combines luxury, versatility, and powerful performance. This premium SUV offers spacious interior, advanced safety features, and exceptional handling. Ideal for family trips, group travel, or when you need extra space.',
    features: [
      'Leather Seats',
      'Apple CarPlay',
      'Panoramic Roof',
      '3-Zone Climate Control',
      'Parking Assistant',
      'Head-Up Display',
      'Harman Kardon Sound',
      'Wireless Charging',
      'Adaptive Suspension',
      'All-Wheel Drive'
    ],
    vendor: {
      name: 'Eliaan Motors',
      rating: 4.9,
      reviews: 342,
      joined: '2020',
      phone: '+233 24 123 4567',
      email: 'info@eliaanmotors.com',
      address: 'Ashaley Botwe, Accra'
    },
    insurance: {
      included: true,
      details: 'Comprehensive insurance coverage'
    },
    mileage: 'Unlimited'
  }
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car details from API
    setLoading(true);
    setTimeout(() => {
      setCar(MOCK_CARS[id]);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <p className="text-gray-400 mb-8">The car you're looking for doesn't exist.</p>
          <Link to="/listings" className="px-6 py-3 bg-primary text-black rounded-lg hover:bg-primary-dark transition">
            Browse Cars
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      
      <div className="container-custom py-24">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <FaChevronLeft />
          <span>Back to Listings</span>
        </button>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <img 
                src={car.images[selectedImage] || car.mainImage} 
                alt={car.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {car.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Car Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500" />
                    <span className={`ml-1 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.rating}</span>
                    <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>({car.reviews} reviews)</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-primary text-xs" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{car.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                )}
              </button>
            </div>
            
            {/* Price */}
            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">${car.pricePerDay}</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>/day</span>
                {car.originalPrice > car.pricePerDay && (
                  <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>${car.originalPrice}</span>
                )}
              </div>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>+ insurance and taxes</p>
            </div>
            
            {/* Specs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className={`text-center p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <FaCog className="text-primary text-xl mx-auto mb-1" />
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.transmission}</p>
              </div>
              <div className={`text-center p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <FaUsers className="text-primary text-xl mx-auto mb-1" />
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.seats} Seats</p>
              </div>
              <div className={`text-center p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <FaGasPump className="text-primary text-xl mx-auto mb-1" />
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.fuelType}</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Description</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{car.description}</p>
            </div>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaShieldAlt className="text-primary text-xs" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Insurance & Mileage */}
            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Insurance</span>
                <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>Included</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mileage</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.mileage}</span>
              </div>
            </div>
            
            {/* Vendor Info */}
            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Rented by {car.vendor.name}</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>⭐ {car.vendor.rating} ({car.vendor.reviews} reviews)</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Member since {car.vendor.joined}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                to={`/booking/${car.id}`}
                className="flex-1 px-6 py-3 bg-black text-primary border border-gray-700 rounded-xl hover:bg-gray-900 hover:border-primary transition-all duration-300 font-bold flex items-center justify-center gap-2"
              >
                Rent Now
                <FaArrowRight />
              </Link>
              <button
                className="px-6 py-3 bg-black text-primary border border-gray-700 rounded-xl hover:bg-gray-900 hover:border-primary transition-all duration-300 font-bold"
              >
                Contact Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetails;