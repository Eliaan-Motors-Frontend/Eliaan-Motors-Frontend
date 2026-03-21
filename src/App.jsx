import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './contexts/ThemeContext'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Listings from './pages/Listings'
import About from './pages/About'
import Contact from './pages/Contact'
import UserDashboard from './pages/user/UserDashboard'
import VendorDashboard from './pages/vendor/VendorDashboard'
import PrivateRoute from './routes/PrivateRoute'
import VendorRoute from './routes/VendorRoute'
import PageTransition from './components/common/PageTransition'
import './App.css'

function App() {
  const { isDark } = useTheme();
  const location = useLocation();

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/signup" element={
            <PageTransition>
              <Signup />
            </PageTransition>
          } />
          <Route path="/listings" element={
            <PageTransition>
              <Listings />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } />
          
          {/* User Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              </PageTransition>
            }
          />
          
          {/* Vendor Protected Routes */}
          <Route
            path="/vendor"
            element={
              <PageTransition>
                <VendorRoute>
                  <VendorDashboard />
                </VendorRoute>
              </PageTransition>
            }
          />
          <Route
            path="/vendor/*"
            element={
              <PageTransition>
                <VendorRoute>
                  <VendorDashboard />
                </VendorRoute>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App