import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useTheme } from './contexts/ThemeContext'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Listings from './pages/Listings'
import CarDetails from './pages/CarDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import AuthSuccess from './pages/AuthSuccess'
import UserDashboard from './pages/user/UserDashboard'
import VendorDashboard from './pages/vendor/VendorDashboard'
import PrivateRoute from './routes/PrivateRoute'
import VendorRoute from './routes/VendorRoute'
import PageTransition from './components/common/PageTransition'
import './App.css'

function App() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#1f2937',
            border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/listings" element={<PageTransition><Listings /></PageTransition>} />
        <Route path="/car/:id" element={<PageTransition><CarDetails /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/auth-success" element={<PageTransition><AuthSuccess /></PageTransition>} />
        
        {/* User Protected Routes */}
        <Route path="/dashboard" element={<PageTransition><PrivateRoute><UserDashboard /></PrivateRoute></PageTransition>} />
        
        {/* Vendor Protected Routes */}
        <Route path="/vendor" element={<PageTransition><VendorRoute><VendorDashboard /></VendorRoute></PageTransition>} />
        <Route path="/vendor/*" element={<PageTransition><VendorRoute><VendorDashboard /></VendorRoute></PageTransition>} />
      </Routes>
    </div>
  )
}

export default App