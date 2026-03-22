import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../contexts/AuthContext';
import LoginBackground from '../assets/images/Homepage/Home10.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Login data:', formData);
      
      let mockUser;
      if (formData.email.includes('vendor')) {
        mockUser = {
          id: Date.now().toString(),
          fullName: 'Vendor Name',
          email: formData.email,
          role: 'vendor',
          businessName: 'Eliaan Motors',
          businessAddress: 'Ashaley Botwe, Accra'
        };
      } else {
        mockUser = {
          id: Date.now().toString(),
          fullName: formData.email.split('@')[0] || 'John Doe',
          email: formData.email,
          role: 'user',
          phone: '+233 24 123 4567'
        };
      }
      
      const mockToken = 'mock-jwt-token';
      login(mockUser, mockToken);
      
      if (mockUser.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Background Image - Fixed, never changes */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url(${LoginBackground})`,
        }}
      ></div>
      
      {/* Dark Overlay - Fixed, never changes */}
      <div className="fixed inset-0 z-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 md:py-24">
        <div className="container-custom mx-auto">
          {/* Changed from max-w-md to max-w-lg for larger container */}
          <div className="max-w-lg mx-auto w-full">
            {/* Form Container - Larger padding and wider */}
            <div className={`rounded-2xl shadow-2xl p-10 md:p-12 transition-all duration-500 ${
              isDark 
                ? 'bg-gray-900/95 backdrop-blur-sm border border-gray-800' 
                : 'bg-white/95 backdrop-blur-sm border border-gray-200'
            }`}>
              <div className="flex justify-center mb-8">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-primary/20' : 'bg-primary/10'
                }`}>
                  <FaCar className="text-4xl text-primary" />
                </div>
              </div>
              
              <div className="text-center mb-10">
                <h2 className={`text-4xl md:text-5xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Welcome Back
                </h2>
                <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ready to hit the road.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label className={`block font-medium mb-2 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email/Phone Number
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base ${
                      isDark 
                        ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter your email or phone number"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Hint: Use email with "vendor" to login as vendor
                  </p>
                </div>

                <div>
                  <label className={`block font-medium mb-2 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-12 transition-all text-base ${
                        isDark 
                          ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                    >
                      {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary rounded focus:ring-primary"
                    />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Remember Me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base ${
                    isDark 
                      ? 'bg-black text-primary border border-gray-700 hover:bg-gray-900 hover:border-primary' 
                      : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                  }`}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${isDark ? 'bg-gray-900 text-gray-500' : 'bg-white text-gray-500'}`}>
                    Or
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <FaApple size={22} className={isDark ? 'text-white' : 'text-gray-800'} />
                  <span className={`font-medium text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Continue with Apple ID
                  </span>
                </button>
                
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <FaGoogle size={22} className="text-red-500" />
                  <span className={`font-medium text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Continue with Google
                  </span>
                </button>
              </div>

              <p className={`text-center mt-10 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-base`}>
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;