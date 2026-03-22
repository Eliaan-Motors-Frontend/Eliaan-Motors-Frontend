import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaStore, FaUserCircle, FaCamera, FaCar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../contexts/AuthContext';
import SignupBackground from '../assets/images/homepage/Home12.png';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
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
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, GIF, and WEBP files are allowed');
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    if (role === 'vendor') {
      if (!formData.businessName) {
        alert("Please enter your business name");
        return;
      }
      if (!formData.businessAddress) {
        alert("Please enter your business address");
        return;
      }
    }
    
    const userData = new FormData();
    userData.append('fullName', formData.fullName);
    userData.append('email', formData.email);
    userData.append('phone', formData.phone);
    userData.append('password', formData.password);
    userData.append('role', role);
    userData.append('agreeToTerms', formData.agreeToTerms);
    
    if (profileImage) {
      userData.append('profileImage', profileImage);
    }
    
    if (role === 'vendor') {
      userData.append('businessName', formData.businessName);
      userData.append('businessAddress', formData.businessAddress);
      userData.append('businessLicense', formData.businessLicense);
      userData.append('taxId', formData.taxId);
    }
    
    console.log('Signup data:', Object.fromEntries(userData));
    
    try {
      const mockUser = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: role,
        profileImage: profileImagePreview,
        ...(role === 'vendor' && {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress
        })
      };
      
      const mockToken = 'mock-jwt-token';
      login(mockUser, mockToken);
      
      if (role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Background Image - Fixed, never changes */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url(${SignupBackground})`,
        }}
      ></div>
      
      {/* Dark Overlay - Fixed, never changes */}
      <div className="fixed inset-0 z-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 md:py-24">
        <div className="container-custom mx-auto">
          <div className="max-w-2xl mx-auto">
            {/* Form Container - Changes with theme */}
            <div className={`rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-500 ${
              isDark 
                ? 'bg-gray-900/95 backdrop-blur-sm border border-gray-800' 
                : 'bg-white/95 backdrop-blur-sm border border-gray-200'
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
                }`}>
                  Create Account
                </h2>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Join Eliaan Motors today
                </p>
              </div>

              {/* Profile Picture Upload */}
              <div className={`mb-6 pb-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
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
                    {profileImagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImage(null);
                          setProfileImagePreview(null);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 mt-1"
                      >
                        Remove
                      </button>
                    )}
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
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Rent cars
                    </span>
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
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      List cars for rent
                    </span>
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
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                      className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="Enter your business address"
                          required
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Business License (Optional)
                        </label>
                        <input
                          type="text"
                          name="businessLicense"
                          value={formData.businessLicense}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="Enter your business license number"
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Tax ID (Optional)
                        </label>
                        <input
                          type="text"
                          name="taxId"
                          value={formData.taxId}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                            isDark 
                              ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          placeholder="Enter your tax ID"
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
                      className={`w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
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
                      className={`w-full pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
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
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-black text-primary border border-gray-700 hover:bg-gray-900 hover:border-primary' 
                      : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                  }`}
                >
                  Create Account
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
                  className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <FaApple size={20} className={isDark ? 'text-white' : 'text-gray-800'} />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Continue with Apple ID
                  </span>
                </button>
                
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <FaGoogle size={20} className="text-red-500" />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Continue with Google
                  </span>
                </button>
              </div>

              {/* Login Link */}
              <p className={`text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
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

export default Signup;