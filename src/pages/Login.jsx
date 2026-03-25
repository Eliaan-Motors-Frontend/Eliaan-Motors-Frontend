import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaCar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
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
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success(`Welcome back, ${result.user.fullName || result.user.businessName || 'User'}! 🎉`);
      if (result.user.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/dashboard');
      }
    } else {
      const errorMessage = result.error || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${apiUrl}/auth/google`;
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
                  onClick={handleGoogleLogin}
                  className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl transition-colors ${
                    isDark 
                      ? 'bg-black border border-gray-700 hover:bg-gray-900' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
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