import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCamera,
  FaUpload
} from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import { useAuth } from '../../contexts/AuthContext';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const fileInputRef = useRef(null);
  const [carImages, setCarImages] = useState([]);
  const [carImagePreviews, setCarImagePreviews] = useState([]);

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
      year: 2023,
      description: 'Luxury sedan with premium features, perfect for business trips.'
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
      year: 2022,
      description: 'Reliable and fuel-efficient sedan, ideal for city driving.'
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
      year: 2023,
      description: 'Luxury SUV with spacious interior and advanced safety features.'
    },
    {
      id: 4,
      name: 'Honda CR-V',
      image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400',
      price: 180,
      location: 'Tema',
      status: 'maintenance',
      bookings: 3,
      rating: 4.5,
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
      year: 2021,
      description: 'Compact SUV with great fuel economy and reliability.'
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
      customerPhone: '+233 24 123 4567',
      pickupDate: '2024-03-25',
      pickupTime: '09:00 AM',
      returnDate: '2024-03-28',
      returnTime: '07:00 PM',
      totalAmount: 750,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2024-03-20'
    },
    {
      id: 2,
      carName: 'Toyota Camry',
      carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+233 24 765 4321',
      pickupDate: '2024-04-10',
      pickupTime: '10:00 AM',
      returnDate: '2024-04-15',
      returnTime: '06:00 PM',
      totalAmount: 750,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: '2024-04-01'
    },
    {
      id: 3,
      carName: 'BMW X5',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      customerName: 'Michael Johnson',
      customerEmail: 'michael@example.com',
      customerPhone: '+233 24 987 6543',
      pickupDate: '2024-04-05',
      pickupTime: '02:00 PM',
      returnDate: '2024-04-08',
      returnTime: '11:00 AM',
      totalAmount: 1050,
      status: 'completed',
      paymentStatus: 'paid',
      bookingDate: '2024-03-28'
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
    { label: 'Total Cars', value: cars.length, icon: FaCar, color: 'blue', change: '+2' },
    { label: 'Active Bookings', value: bookings.filter(b => b.status === 'confirmed').length, icon: FaCalendarAlt, color: 'green', change: '+3' },
    { label: 'Total Earnings', value: 'GH¢4,250', icon: FaDollarSign, color: 'purple', change: '+15%' },
    { label: 'Average Rating', value: '4.8', icon: FaStar, color: 'orange', change: '+0.2' },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...carImages, ...files];
    setCarImages(newImages);
    
    const newPreviews = [...carImagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        setCarImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = carImages.filter((_, i) => i !== index);
    const newPreviews = carImagePreviews.filter((_, i) => i !== index);
    setCarImages(newImages);
    setCarImagePreviews(newPreviews);
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setCarImages([]);
    setCarImagePreviews([]);
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

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    // Update booking status logic here
    console.log(`Booking ${bookingId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'rented':
        return 'bg-blue-100 text-blue-700';
      case 'maintenance':
        return 'bg-orange-100 text-orange-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
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
                <div className="text-center pb-6 border-b">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Vendor" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <FaUser className="text-4xl text-primary" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{user?.businessName || 'Eliaan Motors'}</h3>
                  <p className="text-gray-500 text-sm mt-1">{user?.email || 'vendor@eliaan.com'}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
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

            {/* Main Content */}
            <div className="flex-1">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.businessName?.split(' ')[0] || 'Vendor'}!</h2>
                    <p className="text-white/90">Manage your fleet, track bookings, and grow your business.</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                              <Icon className={`text-${stat.color}-600 text-xl`} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Cars */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Recent Cars</h3>
                      <button
                        onClick={handleAddCar}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <FaPlus size={14} />
                        <span>Add New Car</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cars.slice(0, 4).map((car) => (
                        <div key={car.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <img src={car.image} alt={car.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{car.name}</h4>
                            <p className="text-sm text-gray-500">{car.location}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-lg font-bold text-primary">${car.price}/day</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditCar(car)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => handleDeleteCar(car.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
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
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">My Cars</h3>
                    <button
                      onClick={handleAddCar}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <FaPlus size={14} />
                      <span>Add New Car</span>
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
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
                          <tr key={car.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <img src={car.image} alt={car.name} className="w-12 h-12 object-cover rounded" />
                                <span className="font-medium">{car.name}</span>
                              </div>
                            </td>
                            <td className="py-4">{car.location}</td>
                            <td className="py-4">${car.price}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </td>
                            <td className="py-4">{car.bookings}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span>{car.rating}</span>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleEditCar(car)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCar(car.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors"
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
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Requests</h3>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img src={booking.carImage} alt={booking.carName} className="w-24 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-lg">{booking.carName}</h4>
                                <p className="text-gray-600">{booking.customerName}</p>
                                <p className="text-sm text-gray-500">{booking.customerEmail} | {booking.customerPhone}</p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.toUpperCase()}
                                </span>
                                <p className="text-lg font-bold text-primary mt-2">${booking.totalAmount}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                  {booking.paymentStatus}
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                              <div>
                                <p className="text-gray-500">Pickup</p>
                                <p className="font-medium">{booking.pickupDate} at {booking.pickupTime}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Return</p>
                                <p className="font-medium">{booking.returnDate} at {booking.returnTime}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Booking Date</p>
                                <p className="font-medium">{booking.bookingDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Duration</p>
                                <p className="font-medium">
                                  {Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24))} days
                                </p>
                              </div>
                            </div>
                            
                            {booking.status === 'pending' && (
                              <div className="flex gap-3 mt-4 pt-4 border-t">
                                <button 
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                  Accept Booking
                                </button>
                                <button 
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                            
                            {booking.status === 'confirmed' && (
                              <div className="mt-4 pt-4 border-t">
                                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                                  Mark as Completed
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
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Earnings Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-gray-600 mb-2">This Month</p>
                        <p className="text-3xl font-bold text-primary">GH¢1,250</p>
                        <p className="text-sm text-green-600 mt-2">↑ 15% from last month</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-gray-600 mb-2">Last Month</p>
                        <p className="text-3xl font-bold text-gray-900">GH¢980</p>
                        <p className="text-sm text-gray-500 mt-2">↓ 5% from target</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-gray-600 mb-2">Total Earnings</p>
                        <p className="text-3xl font-bold text-gray-900">GH¢4,250</p>
                        <p className="text-sm text-green-600 mt-2">↑ 25% overall</p>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-4">Transaction History</h4>
                    <div className="space-y-3">
                      {bookings.filter(b => b.paymentStatus === 'paid').map((booking) => (
                        <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <img src={booking.carImage} alt={booking.carName} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <p className="font-semibold">{booking.carName}</p>
                              <p className="text-sm text-gray-500">{booking.customerName}</p>
                              <p className="text-xs text-gray-400">{booking.bookingDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">+${booking.totalAmount}</p>
                            <span className="text-xs text-green-600">Completed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Business Profile</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6 pb-6 border-b">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                          {user?.profileImage ? (
                            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaUser className="text-4xl text-gray-400" />
                            </div>
                          )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark">
                          <FaCamera size={12} />
                        </button>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Logo</h4>
                        <p className="text-sm text-gray-500">Upload your business logo</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input type="text" defaultValue={user?.businessName || 'Eliaan Motors'} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" defaultValue={user?.email || 'vendor@eliaan.com'} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" defaultValue="+233 24 123 4567" className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                        <input type="text" defaultValue="Ashaley Botwe, Accra, Ghana" className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                        <textarea rows="4" defaultValue="Leading car rental service in Accra, offering premium vehicles at affordable rates." className="w-full px-4 py-2 border rounded-lg"></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                      <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Email Notifications</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">SMS Alerts for Bookings</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Payment Notifications</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
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

      {/* Add/Edit Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingCar ? 'Edit Car' : 'Add New Car'}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
                <input type="text" defaultValue={editingCar?.name} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input type="text" defaultValue={editingCar?.brand} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Year</label>
                  <input type="text" defaultValue={editingCar?.year} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day ($)</label>
                  <input type="number" defaultValue={editingCar?.price} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" defaultValue={editingCar?.location} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                  <input type="number" defaultValue={editingCar?.seats || 5} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows="3" defaultValue={editingCar?.description} className="w-full px-4 py-2 border rounded-lg"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                  <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload car images</p>
                  <button type="button" onClick={() => fileInputRef.current.click()} className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Select Images
                  </button>
                </div>
                {carImagePreviews.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {carImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img src={preview} alt={`Car ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowAddCarModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                {editingCar ? 'Update Car' : 'Add Car'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;