import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../contexts/AuthContext';

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
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <Navbar />
      
      <div className="flex items-center justify-center px-4 py-20 md:py-24">
        <div className="w-full max-w-md">
          {/* Form Container - Always Dark */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-800">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <FaCar className="text-3xl text-primary" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400">
                Ready to hit the road.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Email/Phone Number
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-500 transition-all"
                  placeholder="Enter your email or phone number"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hint: Use email with "vendor" to login as vendor
                </p>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-500 pr-12 transition-all"
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary bg-gray-800 border-gray-700 rounded focus:ring-primary"
                  />
                  <span className="text-gray-400 text-sm">Remember Me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary-light text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-primary border border-gray-700 font-bold py-3 rounded-xl hover:bg-gray-900 hover:border-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-500">Or</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-gray-700 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <FaApple size={20} className="text-white" />
                <span className="font-medium text-white">Continue with Apple ID</span>
              </button>
              
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-gray-700 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <FaGoogle size={20} className="text-red-500" />
                <span className="font-medium text-white">Continue with Google</span>
              </button>
            </div>

            <p className="text-center mt-8 text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary-light font-semibold transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;