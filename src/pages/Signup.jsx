import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaStore, FaUserCircle, FaCamera, FaCar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../contexts/AuthContext';
import SignupBackground from '../assets/images/Homepage/home12.png';

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    businessName: '',
    businessAddress: '',
    businessLicense: '',
    taxId: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, GIF, and WEBP files are allowed');
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success('Profile image selected!');
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords don't match!";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long!";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }
    
    if (!formData.agreeToTerms) {
      const errorMsg = "Please agree to the Terms and Conditions";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    if (role === 'vendor') {
      if (!formData.businessName) {
        const errorMsg = "Please enter your business name";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }
      if (!formData.businessAddress) {
        const errorMsg = "Please enter your business address";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }
    }
    
    // Prepare data for registration
    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: role,
    };
    
    // Add vendor fields if needed
    if (role === 'vendor') {
      userData.businessName = formData.businessName;
      userData.businessAddress = formData.businessAddress;
      userData.businessLicense = formData.businessLicense;
      userData.taxId = formData.taxId;
    }
    
    console.log('Submitting registration:', userData);
    
    try {
      const result = await register(userData);
      console.log('Registration result:', result);
      
      if (result.success) {
        // Show success toast with welcome message
        toast.success(`Welcome to Eliaan Motors, ${result.user.fullName}! 🚗`);
        
        // Registration successful, redirect based on role
        if (result.user.role === 'vendor') {
          navigate('/vendor');
        } else {
          navigate('/dashboard');
        }
      } else {
        const errorMsg = result.error || 'Registration failed. Please try again.';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMsg = 'Registration failed. Please check your connection and try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${SignupBackground})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-16 md:py-20">
        <div className="container-custom mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-2xl shadow-2xl p-6 md:p-8 ${
              isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
            }`}>
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-primary/20' : 'bg-primary/10'
                }`}>
                  <FaCar className="text-3xl text-primary" />
                </div>
              </div>
              
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Create Account</h2>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Join Eliaan Motors today</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Profile Picture Upload */}
              <div className="mb-6 pb-4 border-b border-gray-800">
                <label className={`block font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 ${
                      isDark ? 'bg-gray-800 border-primary/20' : 'bg-gray-100 border-gray-200'
                    }`}>
                      {profileImagePreview ? (
                        <img src={profileImagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : (
                        <FaUser className={`text-4xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <button
                      type="button"
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
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Upload a profile picture
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className={`block font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  I want to join as:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('user')}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      role === 'user'
                        ? 'border-primary bg-primary/10'
                        : isDark 
                          ? 'border-gray-700 bg-gray-800 hover:border-primary/50'
                          : 'border-gray-200 bg-gray-50 hover:border-primary/50'
                    }`}
                  >
                    <FaUserCircle className={`text-3xl mb-2 ${role === 'user' ? 'text-primary' : (isDark ? 'text-gray-500' : 'text-gray-400')}`} />
                    <span className={`font-semibold ${role === 'user' ? 'text-primary' : (isDark ? 'text-white' : 'text-gray-700')}`}>
                      User
                    </span>
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Rent cars</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleRoleChange('vendor')}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                      role === 'vendor'
                        ? 'border-primary bg-primary/10'
                        : isDark 
                          ? 'border-gray-700 bg-gray-800 hover:border-primary/50'
                          : 'border-gray-200 bg-gray-50 hover:border-primary/50'
                    }`}
                  >
                    <FaStore className={`text-3xl mb-2 ${role === 'vendor' ? 'text-primary' : (isDark ? 'text-gray-500' : 'text-gray-400')}`} />
                    <span className={`font-semibold ${role === 'vendor' ? 'text-primary' : (isDark ? 'text-white' : 'text-gray-700')}`}>
                      Vendor
                    </span>
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>List cars for rent</span>
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Common Fields */}
                <div>
                  <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Vendor Specific Fields */}
                {role === 'vendor' && (
                  <div className={`pt-4 ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Business Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Name *
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="Enter your business name"
                          required
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business Address *
                        </label>
                        <input
                          type="text"
                          name="businessAddress"
                          value={formData.businessAddress}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="Enter your business address"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password *
                  </label>
                  <div className="relative">
                    <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Create a password (min. 6 characters)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary rounded focus:ring-primary mt-1"
                    required
                  />
                  <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary-dark font-medium">
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary-dark font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-black text-primary border border-gray-700 hover:bg-gray-900 hover:border-primary' 
                      : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${isDark ? 'bg-gray-900 text-gray-500' : 'bg-white text-gray-500'}`}>
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`}
                  className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Continue with Google</span>
                </button>
              </div>

              {/* Login Link */}
              <p className={`text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ IMPORTANT: Make sure this default export is present
export default Signup;