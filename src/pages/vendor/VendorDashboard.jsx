import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaCar, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaUser, 
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
  FaMapMarkerAlt,
  FaCamera
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../contexts/AuthContext';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);

  // Sample cars data
  const [cars, setCars] = useState([
    {
      id: 1,
      name: 'Mercedes Benz C-Class',
      image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=400',
      price: 250,
      location: 'Airport Residential',
      status: 'available',
      bookings: 12,
      rating: 4.8,
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
      year: 2023
    },
    {
      id: 2,
      name: 'Toyota Camry',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      price: 150,
      location: 'East Legon',
      status: 'rented',
      bookings: 8,
      rating: 4.6,
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
      year: 2022
    },
    {
      id: 3,
      name: 'BMW X5',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      price: 350,
      location: 'Cantonments',
      status: 'available',
      bookings: 5,
      rating: 4.9,
      transmission: 'Automatic',
      seats: 7,
      fuelType: 'Diesel',
      year: 2023
    }
  ]);

  // Sample bookings data
  const bookings = [
    {
      id: 1,
      carName: 'Mercedes Benz C-Class',
      carImage: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=400',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      pickupDate: '2024-03-25',
      returnDate: '2024-03-28',
      totalAmount: 750,
      status: 'confirmed',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      carName: 'Toyota Camry',
      carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      pickupDate: '2024-04-10',
      returnDate: '2024-04-15',
      totalAmount: 750,
      status: 'pending',
      paymentStatus: 'pending'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'cars', label: 'My Cars', icon: FaCar },
    { id: 'bookings', label: 'Bookings', icon: FaCalendarAlt },
    { id: 'earnings', label: 'Earnings', icon: FaCreditCard },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const stats = [
    { label: 'Total Cars', value: cars.length, icon: FaCar, change: '+2' },
    { label: 'Active Bookings', value: bookings.filter(b => b.status === 'confirmed').length, icon: FaCalendarAlt, change: '+3' },
    { label: 'Total Earnings', value: '$4,250', icon: FaCreditCard, change: '+15%' },
    { label: 'Average Rating', value: '4.8', icon: FaStar, change: '+0.2' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setShowAddCarModal(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setShowAddCarModal(true);
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available':
        return 'bg-green-500/20 text-green-500';
      case 'rented':
        return 'bg-blue-500/20 text-blue-500';
      case 'maintenance':
        return 'bg-orange-500/20 text-orange-500';
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      
      <div className="pt-20 pb-10">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80">
              <div className={`sticky top-24 rounded-2xl p-6 border ${
                isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="text-center pb-6 border-b border-gray-700">
                  <div className="relative inline-block">
                    <div className={`w-24 h-24 mx-auto rounded-full overflow-hidden flex items-center justify-center ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {profileImage ? (
                        <img src={profileImage} alt="Vendor" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className={`text-4xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <button
                      onClick={triggerFileUpload}
                      className="absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full hover:bg-primary-dark transition-colors shadow-lg"
                    >
                      <FaCamera size={12} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.businessName || 'Eliaan Motors'}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'vendor@eliaan.com'}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    Vendor Account
                  </span>
                </div>

                <nav className="mt-6 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === item.id
                            ? 'bg-primary text-black font-semibold'
                            : isDark 
                              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={logout}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all mt-4 ${
                      isDark 
                        ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <FaSignOutAlt size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className={`rounded-2xl p-6 ${
                    isDark ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-primary/10 to-primary/5'
                  }`}>
                    <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Welcome back, {user?.businessName?.split(' ')[0] || 'Vendor'}!
                    </h2>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Manage your fleet, track bookings, and grow your business.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className={`rounded-2xl p-6 transition-all ${
                          isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isDark ? 'bg-gray-800' : 'bg-gray-100'
                            }`}>
                              <Icon className="text-primary text-xl" />
                            </div>
                            <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                          </div>
                          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Cars */}
                  <div className={`rounded-2xl p-6 ${
                    isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                  }`}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Cars</h3>
                      <button
                        onClick={handleAddCar}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          isDark 
                            ? 'bg-black text-primary border border-gray-700 hover:bg-gray-800 hover:border-primary'
                            : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                        }`}
                      >
                        <FaPlus className="inline mr-2" size={12} />
                        Add New Car
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cars.slice(0, 4).map((car) => (
                        <div key={car.id} className={`flex items-center space-x-4 p-4 rounded-xl border ${
                          isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          <img src={car.image} alt={car.name} className="w-20 h-20 object-cover rounded-xl" />
                          <div className="flex-1">
                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <FaMapMarkerAlt className="text-primary" size={12} />
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{car.location}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-primary">${car.price}/day</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditCar(car)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'
                              }`}
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => handleDeleteCar(car.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-600 hover:bg-gray-100'
                              }`}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Cars Management Tab */}
              {activeTab === 'cars' && (
                <div className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Cars</h3>
                    <button
                      onClick={handleAddCar}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        isDark 
                          ? 'bg-black text-primary border border-gray-700 hover:bg-gray-800 hover:border-primary'
                          : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                      }`}
                    >
                      <FaPlus className="inline mr-2" size={12} />
                      Add New Car
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                        <tr className="text-left">
                          <th className="pb-3">Car</th>
                          <th className="pb-3">Location</th>
                          <th className="pb-3">Price/Day</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Bookings</th>
                          <th className="pb-3">Rating</th>
                          <th className="pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car) => (
                          <tr key={car.id} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} last:border-0`}>
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <img src={car.image} alt={car.name} className="w-12 h-12 object-cover rounded-lg" />
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</span>
                              </div>
                            </td>
                            <td className={`py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.location}</td>
                            <td className="py-4 text-primary font-semibold">${car.price}</td>
                            <td className="py-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </td>
                            <td className={`py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.bookings}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500 mr-1" />
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{car.rating}</span>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleEditCar(car)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDark ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'
                                  }`}
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCar(car.id)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-600 hover:bg-gray-100'
                                  }`}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Booking Requests</h3>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className={`p-4 rounded-xl border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex flex-col md:flex-row gap-4">
                          <img src={booking.carImage} alt={booking.carName} className="w-24 h-24 object-cover rounded-xl" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {booking.carName}
                                </h4>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {booking.customerName} • {booking.customerEmail}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.toUpperCase()}
                                </span>
                                <p className="text-lg font-bold text-primary mt-2">${booking.totalAmount}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  booking.paymentStatus === 'paid' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                  {booking.paymentStatus}
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                              <div>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Pickup</p>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {new Date(booking.pickupDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Return</p>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {new Date(booking.returnDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            {booking.status === 'pending' && (
                              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium">
                                  Accept Booking
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium">
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earnings Tab */}
              {activeTab === 'earnings' && (
                <div className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Earnings Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`text-center p-4 rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>This Month</p>
                      <p className="text-3xl font-bold text-primary">$1,250</p>
                      <p className="text-sm text-green-500 mt-2">↑ 15% from last month</p>
                    </div>
                    <div className={`text-center p-4 rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Month</p>
                      <p className="text-3xl font-bold text-primary">$980</p>
                      <p className="text-sm text-gray-500 mt-2">↓ 5% from target</p>
                    </div>
                    <div className={`text-center p-4 rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
                      <p className="text-3xl font-bold text-primary">$4,250</p>
                      <p className="text-sm text-green-500 mt-2">↑ 25% overall</p>
                    </div>
                  </div>
                  
                  <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Transaction History</h4>
                  <div className="space-y-3">
                    {bookings.filter(b => b.paymentStatus === 'paid').map((booking) => (
                      <div key={booking.id} className={`flex justify-between items-center p-4 rounded-xl border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <img src={booking.carImage} alt={booking.carName} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.carName}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.customerName}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {new Date(booking.pickupDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">+${booking.totalAmount}</p>
                          <span className="text-xs text-green-500">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Business Profile</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6 pb-6 border-b border-gray-700">
                      <div className="relative">
                        <div className={`w-24 h-24 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaUser className={`text-4xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={triggerFileUpload}
                          className="absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full hover:bg-primary-dark transition-colors"
                        >
                          <FaCamera size={12} />
                        </button>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Business Logo</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload your business logo</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Name
                        </label>
                        <input 
                          type="text" 
                          defaultValue={user?.businessName || 'Eliaan Motors'}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          defaultValue={user?.email || 'vendor@eliaan.com'}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          defaultValue="+233 24 123 4567"
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Address
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Ashaley Botwe, Accra, Ghana"
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Description
                        </label>
                        <textarea 
                          rows="4" 
                          defaultValue="Leading car rental service in Accra, offering premium vehicles at affordable rates."
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-700">
                      <button className="px-6 py-2 bg-primary text-black rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className={`rounded-2xl p-6 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Email Notifications</span>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>SMS Alerts for Bookings</span>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Payment Notifications</span>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Change Password</h4>
                      <div className="space-y-4">
                        <input 
                          type="password" 
                          placeholder="Current Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                        <input 
                          type="password" 
                          placeholder="New Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                        <input 
                          type="password" 
                          placeholder="Confirm New Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                        <button className="px-6 py-2 bg-primary text-black rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VendorDashboard;