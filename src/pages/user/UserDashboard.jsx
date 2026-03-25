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
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaCalendarCheck,
  FaCamera,
  FaCheckCircle,
  FaEdit
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('bookings');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);

  // Sample booking data matching your design
  const bookings = [
    {
      id: 1,
      carName: 'Jaguar XEL P250 2019',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400',
      pickupDate: '2025-02-15',
      pickupTime: '09:00 AM',
      returnDate: '2025-03-15',
      returnTime: '07:00 PM',
      location: 'Ashaley Botwe, Accra, Ghana',
      totalCost: 4000,
      status: 'confirmed',
      paidInFull: true,
      paymentMethod: 'Credit Card',
      bookingDate: '2025-01-15'
    },
    {
      id: 2,
      carName: 'Hyundai Elantra 2020',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      pickupDate: '2026-04-02',
      pickupTime: '04:30 PM',
      returnDate: '2026-04-04',
      returnTime: '09:00 AM',
      location: 'Ashaley Botwe, Accra, Ghana',
      totalCost: 2000,
      status: 'confirmed',
      paidInFull: true,
      paymentMethod: 'Mobile Money',
      bookingDate: '2026-03-20'
    },
    {
      id: 3,
      carName: '2017 Alfa Romeo Giulia Quadrifoglio',
      image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400',
      pickupDate: '2026-04-22',
      pickupTime: '06:30 PM',
      returnDate: '2026-04-24',
      returnTime: '09:00 AM',
      location: 'Ashaley Botwe, Accra, Ghana',
      totalCost: 5000,
      status: 'confirmed',
      paidInFull: true,
      paymentMethod: 'Credit Card',
      bookingDate: '2026-04-01'
    }
  ];

  const menuItems = [
    { id: 'bookings', label: 'My Bookings', icon: FaCalendarAlt },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        console.log('Profile image uploaded:', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
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
                {/* User Profile Section */}
                <div className="text-center pb-6 border-b border-gray-700">
                  <div className="relative inline-block">
                    <div className={`w-24 h-24 mx-auto rounded-full overflow-hidden flex items-center justify-center ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                    {user?.fullName || 'John Doe'}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'john@example.com'}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    Active Member
                  </span>
                </div>

                {/* Navigation Menu */}
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
                  
                  {/* Logout Button */}
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
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      My Bookings
                    </h2>
                    <Link 
                      to="/listings" 
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        isDark 
                          ? 'bg-primary text-black hover:bg-primary-dark'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                    >
                      Book New Car
                    </Link>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className={`rounded-2xl overflow-hidden transition-all ${
                        isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                      }`}>
                        <div className="flex flex-col md:flex-row">
                          {/* Car Image */}
                          <div className="md:w-72 h-48 md:h-auto">
                            <img 
                              src={booking.image} 
                              alt={booking.carName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Booking Details */}
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {booking.carName}
                                </h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                  {booking.status.toUpperCase()}
                                </span>
                              </div>
                              {booking.paidInFull && (
                                <div className="flex items-center text-green-500">
                                  <FaCheckCircle className="mr-1" />
                                  <span className="text-sm font-medium">Paid in full</span>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {/* Pick Up Info */}
                              <div className="flex items-start space-x-3">
                                <FaCalendarCheck className="text-primary mt-1" />
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pick Up</p>
                                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {new Date(booking.pickupDate).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </p>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.pickupTime}</p>
                                </div>
                              </div>

                              {/* Return Info */}
                              <div className="flex items-start space-x-3">
                                <FaCalendarCheck className="text-primary mt-1" />
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Return</p>
                                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {new Date(booking.returnDate).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </p>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.returnTime}</p>
                                </div>
                              </div>

                              {/* Location */}
                              <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{booking.location}</p>
                                </div>
                              </div>

                              {/* Total Cost */}
                              <div className="flex items-start space-x-3">
                                <FaCreditCard className="text-primary mt-1" />
                                <div>
                                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Cost</p>
                                  <p className="text-2xl font-bold text-primary">${booking.totalCost.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
                              <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                isDark 
                                  ? 'bg-black text-primary border border-gray-700 hover:bg-gray-800 hover:border-primary'
                                  : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                              }`}>
                                View Rental Deals
                              </button>
                              <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                isDark 
                                  ? 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'
                                  : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                              }`}>
                                Contact Host
                              </button>
                              <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                isDark 
                                  ? 'border border-gray-700 text-gray-300 hover:border-primary hover:text-primary'
                                  : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                              }`}>
                                Manage Booking
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Profile Information
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Profile Image Section */}
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
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Picture</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload a new profile picture</p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>JPG, PNG or GIF. Max size 2MB</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          defaultValue={user?.fullName || 'John Doe'}
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
                          defaultValue={user?.email || 'john@example.com'}
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
                          defaultValue={user?.phone || '+233 24 123 4567'}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Date of Birth
                        </label>
                        <input 
                          type="date" 
                          defaultValue="1990-01-01"
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Address
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
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-700">
                      <button className="px-6 py-2 bg-primary text-black rounded-xl hover:bg-primary-dark transition-colors font-semibold">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Payment History
                  </h2>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className={`flex justify-between items-center p-4 rounded-xl border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <img src={booking.image} alt={booking.carName} className="w-16 h-16 object-cover rounded-xl" />
                          <div>
                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {booking.carName}
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {booking.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">${booking.totalCost.toLocaleString()}</p>
                          <span className="text-sm text-green-500">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Email Notifications</span>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>SMS Alerts</span>
                          <input type="checkbox" className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Booking Reminders</span>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded focus:ring-primary" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700">
                      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Change Password
                      </h3>
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

export default UserDashboard;