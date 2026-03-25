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
  FaCar,
  FaArrowRight,
  FaSpinner,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUserCircle,
  FaStore
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isAuthenticated, isVendor, user } = useAuth();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '09:00',
    returnTime: '17:00'
  });

  useEffect(() => {
    fetchCarDetails();
    if (isAuthenticated && !isVendor) {
      checkFavorite();
    }
  }, [id]);

  const fetchCarDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/cars/${id}`);
      setCar(response.data);
      const today = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);
      setBookingData({
        ...bookingData,
        pickupDate: today.toISOString().split('T')[0],
        returnDate: threeDaysLater.toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await api.get(`/favorites/check/${id}`);
      setIsFavorite(response.data.isFavorited);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isVendor) {
      alert('Vendors cannot save favorites. Create a user account to save favorites.');
      return;
    }
    
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await api.post('/favorites', { carId: id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isVendor) {
      alert('Vendors cannot book cars. Please create a user account to rent cars.');
      return;
    }
    
    try {
      const response = await api.post('/bookings', {
        carId: id,
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        pickupTime: bookingData.pickupTime,
        returnTime: bookingData.returnTime,
        pickupLocation: car.location,
        returnLocation: car.location
      });
      
      navigate(`/payment/${response.data._id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.message || 'Failed to create booking');
    }
  };

  const calculateTotal = () => {
    if (!car || !bookingData.pickupDate || !bookingData.returnDate) return 0;
    const pickup = new Date(bookingData.pickupDate);
    const returnD = new Date(bookingData.returnDate);
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    return days * car.pricePerDay;
  };

  const isCarOwner = isVendor && car?.vendorId?._id === user?._id;

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-4xl text-primary" />
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

  const vendor = car.vendorId || {};
  const totalAmount = calculateTotal();
  const days = bookingData.pickupDate && bookingData.returnDate 
    ? Math.ceil((new Date(bookingData.returnDate) - new Date(bookingData.pickupDate)) / (1000 * 60 * 60 * 24))
    : 0;

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
                src={car.images?.[selectedImage] || car.mainImage} 
                alt={car.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {car.images && car.images.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${car.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Car Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500" />
                    <span className={`ml-1 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.rating || 0}</span>
                    <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>({car.reviews || 0} reviews)</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-primary text-xs" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{car.location}</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{car.year}</span>
                </div>
              </div>
              {!isVendor && (
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  )}
                </button>
              )}
            </div>
            
            {/* Price */}
            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">₵{car.pricePerDay}</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>/day</span>
                {car.originalPrice > car.pricePerDay && (
                  <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>₵{car.originalPrice}</span>
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
            {car.features && car.features.length > 0 && (
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
            )}
            
            {/* Booking Section - Only for users, not vendors */}
            {!isVendor ? (
              <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Book This Car</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pickup Date</label>
                    <input
                      type="date"
                      value={bookingData.pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingData({...bookingData, pickupDate: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-primary ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Return Date</label>
                    <input
                      type="date"
                      value={bookingData.returnDate}
                      min={bookingData.pickupDate}
                      onChange={(e) => setBookingData({...bookingData, returnDate: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-primary ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {days} day{days !== 1 ? 's' : ''} rental
                  </span>
                  <span className="text-xl font-bold text-primary">₵{totalAmount}</span>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full py-3 bg-primary text-black rounded-xl hover:bg-primary-dark transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <span>Book Now</span>
                  <FaArrowRight size={14} />
                </button>
              </div>
            ) : isCarOwner ? (
              // Show owner message if vendor owns this car
              <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-primary/10' : 'bg-primary/5'} border border-primary`}>
                <div className="flex items-center gap-3">
                  <FaStore className="text-primary text-xl" />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      This is your car!
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      You can manage this car from your 
                      <Link to="/vendor" className="text-primary ml-1 hover:underline">
                        Vendor Dashboard
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Show message for vendors viewing other vendors' cars
              <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <FaStore className="text-primary text-xl" />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Vendor Preview Mode
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      As a vendor, you can view cars but cannot book them. 
                      <Link to="/vendor" className="text-primary ml-1 hover:underline">
                        Go to your dashboard
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vendor Information Section */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <FaBuilding className="text-primary" />
                About the Vendor
              </h3>
              
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  {vendor.profileImage ? (
                    <img src={vendor.profileImage} alt={vendor.businessName || vendor.fullName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className={`text-2xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {vendor.businessName || vendor.fullName || 'Eliaan Motors'}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {vendor.rating || '4.8'} • {vendor.reviews || '100+'} bookings
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                {vendor.businessAddress && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary text-xs" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {vendor.businessAddress}
                    </span>
                  </div>
                )}
                {vendor.email && (
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-primary text-xs" />
                    <a href={`mailto:${vendor.email}`} className={isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'}>
                      {vendor.email}
                    </a>
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-primary text-xs" />
                    <a href={`tel:${vendor.phone}`} className={isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'}>
                      {vendor.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Member since {vendor.createdAt ? new Date(vendor.createdAt).getFullYear() : '2024'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetails;