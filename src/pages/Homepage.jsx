import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/common/Footer';

const Homepage = () => {
  // No theme switching - homepage stays in dark mode
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Homepage;