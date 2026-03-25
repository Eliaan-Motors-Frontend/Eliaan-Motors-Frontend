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
  FaStar,
  FaMapMarkerAlt,
  FaCamera,
  FaSpinner,
  FaTimes,
  FaUpload
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: '',
    location: '',
    transmission: 'Automatic',
    seats: 4,
    fuelType: 'Petrol',
    description: '',
    mainImage: '',
    images: []
  });
  const fileInputRef = useRef(null);
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const carsRes = await api.get('/cars/vendor/my-cars');
      setCars(carsRes.data);
      
      const bookingsRes = await api.get('/bookings/vendor-bookings');
      setBookings(bookingsRes.data);
      
      const statsRes = await api.get('/dashboard/vendor');
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const res = await api.post('/users/upload-profile-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProfileImage(res.data.profileImage);
        updateUser({ ...user, profileImage: res.data.profileImage });
        toast.success('Profile image updated successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload profile image');
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and WEBP images are allowed');
      return;
    }
    
    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    try {
      const res = await api.post('/users/upload-car-image', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({...formData, mainImage: res.data.imageUrl});
      toast.success('Main image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAdditionalImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploadingImage(true);
    const uploadedImages = [];
    let uploadCount = 0;
    
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`Image ${file.name} is too large. Max 5MB`);
        continue;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Image ${file.name} is not a supported format`);
        continue;
      }
      
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      
      try {
        const res = await api.post('/users/upload-car-image', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedImages.push(res.data.imageUrl);
        uploadCount++;
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    setFormData({
      ...formData,
      images: [...formData.images, ...uploadedImages]
    });
    setUploadingImage(false);
    
    if (uploadCount > 0) {
      toast.success(`${uploadCount} image(s) uploaded successfully!`);
    }
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setFormData({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      pricePerDay: '',
      location: '',
      transmission: 'Automatic',
      seats: 4,
      fuelType: 'Petrol',
      description: '',
      mainImage: '',
      images: []
    });
    setShowAddCarModal(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      location: car.location,
      transmission: car.transmission,
      seats: car.seats,
      fuelType: car.fuelType,
      description: car.description,
      mainImage: car.mainImage,
      images: car.images || []
    });
    setShowAddCarModal(true);
  };

  const handleSaveCar = async (e) => {
    e.preventDefault();
    
    if (!formData.mainImage) {
      toast.error('Please upload a main image for the car');
      return;
    }
    
    setLoading(true);
    
    try {
      if (editingCar) {
        await api.put(`/cars/${editingCar._id}`, formData);
        toast.success('Car updated successfully! 🚗');
      } else {
        await api.post('/cars', formData);
        toast.success('Car added successfully! 🚗');
      }
      setShowAddCarModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error(error.response?.data?.message || 'Failed to save car');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setLoading(true);
      try {
        await api.delete(`/cars/${carId}`);
        toast.success('Car deleted successfully!');
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting car:', error);
        toast.error('Failed to delete car');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    setLoading(true);
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      toast.success(`Booking ${status === 'confirmed' ? 'accepted' : 'declined'}!`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const profileData = {
      businessName: form.businessName.value,
      businessAddress: form.businessAddress.value,
      phone: form.phone.value,
      email: form.email.value
    };
    
    try {
      const res = await api.put('/users/vendor/profile', profileData);
      updateUser({ ...user, ...res.data });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await api.put('/users/change-password', { currentPassword, newPassword });
      toast.success('Password updated successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
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
      case 'completed':
        return 'bg-blue-500/20 text-blue-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'cars', label: 'My Cars', icon: FaCar },
    { id: 'bookings', label: 'Bookings', icon: FaCalendarAlt },
    { id: 'earnings', label: 'Earnings', icon: FaCreditCard },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const dashboardStats = stats?.stats || {
    totalCars: cars.length,
    availableCars: cars.filter(c => c.available).length,
    rentedCars: cars.filter(c => !c.available).length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalEarnings: 0,
    averageRating: 4.8
  };

  if (loading && !cars.length) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      </div>
    );
  }

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
                    onClick={() => {
                      logout();
                      toast.success('Logged out successfully!');
                    }}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stats cards */}
                    <div className={`rounded-2xl p-6 transition-all ${
                      isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <FaCar className="text-primary text-xl" />
                        </div>
                      </div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{dashboardStats.totalCars}</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Cars</p>
                    </div>

                    <div className={`rounded-2xl p-6 transition-all ${
                      isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <FaCalendarAlt className="text-primary text-xl" />
                        </div>
                      </div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{dashboardStats.activeBookings}</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Bookings</p>
                    </div>

                    <div className={`rounded-2xl p-6 transition-all ${
                      isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <FaCreditCard className="text-primary text-xl" />
                        </div>
                      </div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GH₵ {dashboardStats.totalEarnings.toLocaleString()}</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
                    </div>

                    <div className={`rounded-2xl p-6 transition-all ${
                      isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <FaStar className="text-primary text-xl" />
                        </div>
                      </div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{dashboardStats.averageRating}</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Average Rating</p>
                    </div>
                  </div>

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
                        <div key={car._id} className={`flex items-center space-x-4 p-4 rounded-xl border ${
                          isDark ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                          <img src={car.mainImage || 'https://via.placeholder.com/80'} alt={car.name} className="w-20 h-20 object-cover rounded-xl" />
                          <div className="flex-1">
                            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <FaMapMarkerAlt className="text-primary" size={12} />
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{car.location}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-primary">GH₵ {car.pricePerDay}/day</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(car.available ? 'available' : 'rented')}`}>
                                {car.available ? 'available' : 'rented'}
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
                              onClick={() => handleDeleteCar(car._id)}
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
                          <tr key={car._id} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} last:border-0`}>
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <img src={car.mainImage || 'https://via.placeholder.com/48'} alt={car.name} className="w-12 h-12 object-cover rounded-lg" />
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</span>
                              </div>
                            </td>
                            <td className={`py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.location}</td>
                            <td className="py-4 text-primary font-semibold">GH₵ {car.pricePerDay}</td>
                            <td className="py-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(car.available ? 'available' : 'rented')}`}>
                                {car.available ? 'available' : 'rented'}
                              </span>
                            </td>
                            <td className={`py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.bookings || 0}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <FaStar className="text-yellow-500 mr-1" />
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>{car.rating || 0}</span>
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
                                  onClick={() => handleDeleteCar(car._id)}
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
                      <div key={booking._id} className={`p-4 rounded-xl border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex flex-col md:flex-row gap-4">
                          <img src={booking.carId?.mainImage || 'https://via.placeholder.com/96'} alt={booking.carId?.name} className="w-24 h-24 object-cover rounded-xl" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {booking.carId?.name}
                                </h4>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {booking.userId?.fullName} • {booking.userId?.email}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.toUpperCase()}
                                </span>
                                <p className="text-lg font-bold text-primary mt-2">GH₵ {booking.totalAmount}</p>
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
                                  {new Date(booking.pickupDate).toLocaleDateString()} at {booking.pickupTime}
                                </p>
                              </div>
                              <div>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Return</p>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {new Date(booking.returnDate).toLocaleDateString()} at {booking.returnTime}
                                </p>
                              </div>
                            </div>
                            
                            {booking.status === 'pending' && (
                              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700">
                                <button 
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                  Accept Booking
                                </button>
                                <button 
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
                                >
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
                      <p className="text-3xl font-bold text-primary">GH₵ {dashboardStats.totalEarnings?.toLocaleString() || 0}</p>
                    </div>
                    <div className={`text-center p-4 rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Bookings</p>
                      <p className="text-3xl font-bold text-primary">{dashboardStats.totalBookings || 0}</p>
                    </div>
                    <div className={`text-center p-4 rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
                      <p className="text-3xl font-bold text-primary">GH₵ {dashboardStats.totalEarnings?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  
                  <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Transaction History</h4>
                  <div className="space-y-3">
                    {bookings.filter(b => b.paymentStatus === 'paid').map((booking) => (
                      <div key={booking._id} className={`flex justify-between items-center p-4 rounded-xl border ${
                        isDark ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <img src={booking.carId?.mainImage || 'https://via.placeholder.com/48'} alt={booking.carId?.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.carId?.name}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.userId?.fullName}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {new Date(booking.pickupDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">+GH₵ {booking.totalAmount}</p>
                          <span className="text-xs text-green-500">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className={`rounded-2xl p-6 ${
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
                          type="button"
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
                          name="businessName"
                          defaultValue={user?.businessName || ''}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          defaultValue={user?.email || ''}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          defaultValue={user?.phone || ''}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Address
                        </label>
                        <input 
                          type="text" 
                          name="businessAddress"
                          defaultValue={user?.businessAddress || ''}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Description
                        </label>
                        <textarea 
                          name="description"
                          rows="4" 
                          defaultValue={user?.businessDescription || 'Leading car rental service in Accra, offering premium vehicles at affordable rates.'}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900'
                          }`}
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-700">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-black rounded-xl hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50"
                      >
                        {loading ? <FaSpinner className="animate-spin" /> : 'Update Profile'}
                      </button>
                    </div>
                  </div>
                </form>
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

                    <form onSubmit={handleUpdatePassword} className="pt-6 border-t border-gray-700">
                      <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Change Password</h4>
                      <div className="space-y-4">
                        <input 
                          type="password" 
                          name="currentPassword"
                          placeholder="Current Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                        <input 
                          type="password" 
                          name="newPassword"
                          placeholder="New Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                        <input 
                          type="password" 
                          name="confirmPassword"
                          placeholder="Confirm New Password" 
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          required
                        />
                        <button 
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 bg-primary text-black rounded-xl hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50"
                        >
                          {loading ? <FaSpinner className="animate-spin" /> : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} sticky top-0 ${isDark ? 'bg-gray-900' : 'bg-white'} z-10`}>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingCar ? '✏️ Edit Car' : '🚗 Add New Car'}
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {editingCar ? 'Update your car details below' : 'Fill in the details to list your car for rent'}
              </p>
            </div>
            
            <form onSubmit={handleSaveCar} className="p-6 space-y-5">
              {/* Basic Information Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  📋 Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Car Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Mercedes Benz C-Class, Toyota Camry, BMW X5"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Brand *
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      placeholder="e.g., Mercedes, Toyota, BMW, Honda"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Model *
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      placeholder="e.g., C-Class, Camry, X5, CR-V"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Year *
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      placeholder="e.g., 2023"
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Specifications Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  ⚙️ Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Transmission *
                    </label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Automatic">⚙️ Automatic</option>
                      <option value="Manual">🔧 Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Seats *
                    </label>
                    <select
                      value={formData.seats}
                      onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="2">👥 2 Seats</option>
                      <option value="4">👥 4 Seats</option>
                      <option value="5">👥 5 Seats</option>
                      <option value="7">👥 7 Seats</option>
                      <option value="8">👥 8 Seats</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Fuel Type *
                    </label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="Petrol">⛽ Petrol</option>
                      <option value="Diesel">⛽ Diesel</option>
                      <option value="Electric">🔋 Electric</option>
                      <option value="Hybrid">🌿 Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Location Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  💰 Pricing & Location
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price Per Day (GH₵) *
                    </label>
                    <input
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData({...formData, pricePerDay: parseInt(e.target.value)})}
                      placeholder="e.g., 250"
                      min="0"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Airport Residential, Accra | East Legon, Accra"
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  📝 Description
                </h4>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Car Description *
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the car's features, condition, and any special details. e.g., 'Luxury sedan with premium leather seats, Apple CarPlay, backup camera, and excellent fuel economy. Perfect for business trips or family outings.'"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  🖼️ Car Images
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Main Image *
                    </label>
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      isDark ? 'border-gray-700 hover:border-primary' : 'border-gray-300 hover:border-primary'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="hidden"
                        id="mainImageUpload"
                        ref={mainImageInputRef}
                      />
                      <label 
                        htmlFor="mainImageUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        {uploadingImage ? (
                          <FaSpinner className="animate-spin text-3xl text-primary mb-2" />
                        ) : (
                          <FaUpload className="text-3xl text-gray-400 mb-2" />
                        )}
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Click to upload main car image
                        </span>
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          JPG, PNG, WEBP (Max 5MB)
                        </span>
                      </label>
                    </div>
                    {formData.mainImage && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img src={formData.mainImage} alt="Main Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-primary" />
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, mainImage: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Additional Images (Optional)
                    </label>
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      isDark ? 'border-gray-700 hover:border-primary' : 'border-gray-300 hover:border-primary'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesUpload}
                        className="hidden"
                        id="additionalImagesUpload"
                        ref={additionalImagesInputRef}
                      />
                      <label 
                        htmlFor="additionalImagesUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        {uploadingImage ? (
                          <FaSpinner className="animate-spin text-3xl text-primary mb-2" />
                        ) : (
                          <FaCamera className="text-3xl text-gray-400 mb-2" />
                        )}
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Click to upload additional images
                        </span>
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          You can select multiple images
                        </span>
                      </label>
                    </div>
                    {formData.images && formData.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={img} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...formData.images];
                                newImages.splice(idx, 1);
                                setFormData({...formData, images: newImages});
                                toast.success('Image removed');
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isDark 
                      ? 'bg-primary text-black hover:bg-primary-dark' 
                      : 'bg-primary text-white hover:bg-primary-dark'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>{editingCar ? 'Updating...' : 'Adding...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{editingCar ? '✓ Update Car' : '+ Add Car'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default VendorDashboard;