import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, updateUser, isAuthenticated } = useAuth();
  const hasProcessed = useRef(false); // Prevent multiple processing

  useEffect(() => {
    // Prevent infinite loop
    if (hasProcessed.current) return;
    
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    console.log('AuthSuccess - Processing...');
    console.log('Token:', token ? 'present' : 'missing');
    console.log('User param:', userParam ? 'present' : 'missing');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        console.log('Parsed user:', user);
        
        // Mark as processed
        hasProcessed.current = true;
        
        // Store token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update auth context
        updateUser(user);
        
        // Show success toast
        toast.success(`Welcome, ${user.fullName || user.businessName || 'User'}! 🎉`);
        
        // Redirect based on role
        if (user.role === 'vendor') {
          navigate('/vendor', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
        
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication failed');
        navigate('/login?error=auth_failed', { replace: true });
      }
    } else {
      console.error('Missing token or user param');
      navigate('/login?error=missing_auth_data', { replace: true });
    }
  }, [location, navigate, updateUser]); // Remove login and isAuthenticated from deps

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-white">Logging you in...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait, this will only take a moment</p>
      </div>
    </div>
  );
};

export default AuthSuccess;