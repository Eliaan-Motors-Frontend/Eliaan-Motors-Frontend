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
  FaEdit,
  FaCheckCircle
} from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
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
        // Here you would upload to your backend
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
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-10">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                {/* User Profile Section */}
                <div className="text-center pb-6 border-b">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className="text-4xl text-gray-400" />
                      )}
                    </div>
                    <button
                      onClick={triggerFileUpload}
                      className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors shadow-lg"
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
                  <h3 className="text-xl font-bold text-gray-900 mt-3">{user?.fullName || 'John Doe'}</h3>
                  <p className="text-gray-500 text-sm mt-1">{user?.email || 'john@example.com'}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
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
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary text-white'
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
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
                  >
                    <FaSignOutAlt size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content - My Bookings */}
            <div className="flex-1">
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                    <Link 
                      to="/cars" 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Book New Car
                    </Link>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.carName}</h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                                  {booking.status.toUpperCase()}
                                </span>
                              </div>
                              {booking.paidInFull && (
                                <div className="flex items-center text-green-600">
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
                                  <p className="text-sm text-gray-500">Pick Up</p>
                                  <p className="font-semibold text-gray-900">
                                    {new Date(booking.pickupDate).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </p>
                                  <p className="text-sm text-gray-600">{booking.pickupTime}</p>
                                </div>
                              </div>

                              {/* Return Info */}
                              <div className="flex items-start space-x-3">
                                <FaCalendarCheck className="text-primary mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">Return</p>
                                  <p className="font-semibold text-gray-900">
                                    {new Date(booking.returnDate).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </p>
                                  <p className="text-sm text-gray-600">{booking.returnTime}</p>
                                </div>
                              </div>

                              {/* Location */}
                              <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">Location</p>
                                  <p className="text-gray-900">{booking.location}</p>
                                </div>
                              </div>

                              {/* Total Cost */}
                              <div className="flex items-start space-x-3">
                                <FaCreditCard className="text-primary mt-1" />
                                <div>
                                  <p className="text-sm text-gray-500">Total Cost</p>
                                  <p className="text-2xl font-bold text-primary">€{booking.totalCost.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t">
                              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                                View Rental Deals
                              </button>
                              <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium">
                                Contact Host
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
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
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex items-center space-x-6 pb-6 border-b">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaUser className="text-4xl text-gray-400" />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={triggerFileUpload}
                          className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
                        >
                          <FaCamera size={12} />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                        <p className="text-sm text-gray-500">Upload a new profile picture</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max size 2MB</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.fullName || 'John Doe'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue={user?.email || 'john@example.com'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          defaultValue={user?.phone || '+233 24 123 4567'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input 
                          type="date" 
                          defaultValue="1990-01-01"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input 
                          type="text" 
                          defaultValue="Ashaley Botwe, Accra, Ghana"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                      <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img src={booking.image} alt={booking.carName} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{booking.carName}</h4>
                            <p className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{booking.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">€{booking.totalCost.toLocaleString()}</p>
                          <span className="text-sm text-green-600">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Email Notifications</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">SMS Alerts</span>
                          <input type="checkbox" className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Booking Reminders</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="w-full px-4 py-2 border rounded-lg" />
                        <input type="password" placeholder="New Password" className="w-full px-4 py-2 border rounded-lg" />
                        <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 border rounded-lg" />
                        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
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
    </div>
  );
};

export default UserDashboard;